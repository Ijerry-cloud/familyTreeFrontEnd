from django.http import response
from django.shortcuts import get_object_or_404, render
from TreeBio.models import TreeBio2
from core.authentication import CustomTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from TreeBio.libs.tree_service import recursive_node_to_dict, treebio2_image_helper, treebio_helper
from django.http import HttpResponse
from base64 import b64decode

# Create your views here.
class GetFamilyTreeApiView(generics.ListAPIView):
    
    """
        api to get the family tree node
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        if self.kwargs.get("id"):            
            bio = generics.get_object_or_404(TreeBio2, pk=self.kwargs.get("id",))
        else:
            bio = TreeBio2.objects.first()
            
        if bio:
            data = recursive_node_to_dict(bio)
            
            response_data = dict()
            
            response_data["message"] = "success"
            response_data["data"] = {"root": data}
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({"message": "No Tree Found"}, status=status.HTTP_400_BAD_REQUEST)
            
        
        
class GetFamilyTreeDetailApiView(generics.RetrieveAPIView):
    
    """
        api to get the family tree node details
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):    
        bio = get_object_or_404(TreeBio2, pk=self.kwargs["id"])
        
        data = treebio_helper(bio)
        
        
        response_data = dict()
        response_data["message"] = "success"
        response_data["data"] = data
        
        return Response(response_data, status=status.HTTP_200_OK)



class GetFamilyTreeBio2ImageApiView(generics.ListAPIView):
    """
        returns an image from the url
    """   
    
    def get(self, request, *args, **kwargs):
        bio = get_object_or_404(TreeBio2, pk=self.kwargs["id"])

        profile_image = bio.image
        header, profile_image = profile_image.split(";base64,")
        profile_image = b64decode(profile_image + "=" * (-len(profile_image) % 4))
        return HttpResponse(profile_image, content_type="image/jpeg")