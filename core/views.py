from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from core.core_helpers import validate_fields, extract_user_info
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.authtoken.models import Token
from .serializers import ProfileSerializer
# from rest_framework.authentication import TokenAuthentication
from core.authentication import CustomTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from base64 import b64decode
from rest_framework import generics

# Create your views here.
class SignupApiView(APIView):

    """
        {
            "first_name": "", *
            "last_name": "", *
            "middle_name": "",
            "password": "", *
            "email": "", *
            "date_of_birth": "", *
            "hobbies": "",
            "image": "",
            "gender": "", *
            "additional_data": {}
        }
    """
    
    def post(self, request, *args, **kwargs):
        
        # define required fields
        required_fields = ["first_name", "last_name", "email", "password", "date_of_birth", "gender"]

        ok, message = validate_fields(request.data, required_fields)

        if not ok:
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)

        
        # ensure email dont already exist in the db
        if User.objects.filter(email=request.data.get("email")):
            return Response({"message": "email already exist"}, status=status.HTTP_400_BAD_REQUEST)            

        # if the data is ok, create a user and profile object
        user = User.objects.create(
            username=request.data.get("email"),
            first_name=request.data.get("first_name"),
            last_name=request.data.get("last_name"),
            email=request.data.get("email"),
            is_active=True
        )

        # set password for the user
        user.set_password(request.data.get("password"))
        user.save()

        # create the profile model
        profile = Profile.objects.create(
            first_name=user.first_name,
            middle_name=request.data.get("middle_name"),
            last_name=user.last_name,
            date_of_birth=request.data.get("date_of_birth"),
            hobbies=request.data.get("hobbies"),
            user=user,
            image_64=request.data.get("image_64"),
            gender=request.data.get("gender"),
            additional_data=request.data.get("additional_data")
        )

        # generate a token for this user, so he can login 
        token, created = Token.objects.get_or_create(user=user)

        data = extract_user_info(user, token)

        response_data = dict()

        response_data["message"] = "success"
        response_data["statusCode"] = 200
        response_data["data"] = data

        return Response(response_data, status=status.HTTP_201_CREATED)


class LoginApiView(APIView):

    """
        {
            
            "password": "", 
            "email": "", 
        }
    """
    
    def post(self, request, *args, **kwargs):
        
        # define required fields
        required_fields = ["email", "password"]

        ok, message = validate_fields(request.data, required_fields)

        if not ok:
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)

        # perform a series of checks
        # first check if a user with that email exist
        # second check if the password is corect
        # third check if the user is active
        ok, message = False, ""
        user = User.objects.filter(email=request.data.get("email")).first()

        if user:
            if user.check_password(request.data.get("password")):
                ok, message = True, "success"
            else:
                ok, message = False, "invalid password"
                
            if not user.is_active:
                # if the user account is not active or is diabled
                ok, message = False, "account not activated"
        else:
            ok, message = False, "email does not exist"

        if not ok:
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)                

        # generate a token for this user, so he can login 
        token, created = Token.objects.get_or_create(user=user)

        data = extract_user_info(user, token)

        response_data = dict()

        response_data["message"] = "success"
        response_data["statusCode"] = 200
        response_data["data"] = data

        return Response(response_data, status=status.HTTP_201_CREATED)
    

class LogoutApiView(APIView):

    """
        destroys a users token
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
            
        tokens = Token.objects.filter(user=request.user)

        # delete the tokens
        tokens.delete()

        response_data = dict()

        response_data["message"] = "success"
        response_data["statusCode"] = 200

        return Response(response_data, status=status.HTTP_201_CREATED)


class ChangePasswordView(APIView):
    
    """
    
        api to reset a user password
        
        {
            "old_password" : "",
            "new_password" : ""
        }
    """
    
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        # define required fields
        required_fields = ["old_password", "new_password"]
        response_data = dict()

        ok, message = validate_fields(request.data, required_fields)

        if not ok:
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        
        if old_password == new_password :
            return Response({"message": "old password and new password cannot have the same value"}, status=status.HTTP_400_BAD_REQUEST)    
        
        user = request.user
        
        # if the old password is not correct
        # return an error
        if not user.check_password(old_password):
            ok, message = False, "Password is not correct"
            
        if not ok:
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)
            
        # other validations for passwords can go here
            
        user.set_password(new_password)
        user.save()
            
        response_data["message"] = "success"
        response_data["statusCode"] = 200

        return Response(response_data, status=status.HTTP_200_OK)
    
    
class GetUpdateUserProfileView(APIView):
    
    """
        api to get and edit a user profile
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        
        response_data = dict()

        
        user = request.user
        profile = Profile.objects.filter(user=user).first()
        
        # if profile is not found, return a not found 
        if not profile:
            return Response({"message": "profile not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        profile_serializer = ProfileSerializer(profile)

        print("#"*100)
        print(profile.image_64)       
        print("#"*100) 
        print(profile_serializer.data)
            
        response_data["message"] = "success"
        response_data["statusCode"] = 200
        response_data["data"] = profile_serializer.data

        return Response(response_data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        
        response_data = dict()

        
        user = request.user
        profile = Profile.objects.filter(user=user).first()
        
        # if profile is not found, return a not found 
        if not profile:
            return Response({"message": "profile not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        # update the user fields
        
        
        # update profile fields
        profile.first_name = request.data.get("first_name", profile.first_name)
        profile.middle_name = request.data.get("middle_name", profile.middle_name)
        profile.last_name = request.data.get("last_name", profile.last_name)
        profile.date_of_birth = request.data.get("date_of_birth", profile.date_of_birth)
        profile.hobbies = request.data.get("hobbies", profile.hobbies)
        profile.image_64 = request.data.get("image", profile.image_64)
        profile.gender = request.data.get("gender", profile.gender)
        
        # save the new data for both models
        profile.save()
        user.save()
        
        profile_serializer = ProfileSerializer(profile)

        response_data["message"] = "success"
        response_data["statusCode"] = 200
        response_data["data"] = profile_serializer.data

        return Response(response_data, status=status.HTTP_200_OK)

    
class GetProfileImageView(generics.RetrieveAPIView):
    
    
    def get(self, request, *args, **kwargs):
        """
            endpoint to generate an image
            from the base 64 image  
        """
        
        profile = get_object_or_404(Profile, pk=self.kwargs["id"])
        profile_image = profile.image_64
        header, profile_image = profile_image.split(";base64,")
        profile_image = b64decode(profile_image + "=" * (-len(profile_image) % 4))
        return HttpResponse(profile_image, content_type="image/jpeg")