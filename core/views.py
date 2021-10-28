from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from core.core_helpers import validate_fields, extract_user_info
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.authtoken.models import Token


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
        else:
            ok, message = False, "email does not exist"

        if not user.is_active:
            # if the user account is not active or is diabled
            ok, message = False, "account not activated"

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
