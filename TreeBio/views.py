from django.http import response
from django.shortcuts import get_object_or_404, render
from TreeBio.models import TreeBio2
from core.authentication import CustomTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from TreeBio.libs.tree_service import recursive_node_to_dict

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
        bio = get_object_or_404(TreeBio2, pk=self.kwargs)
        
        data = {
            "id": str(bio.id),
            "first_name": bio.first_name,
            "last_name": bio.last_name,
            "gender": bio.gender,
            "marital_status": bio.marital_status,
            "dob": str(bio.dob)
        }
        
        response_data = dict()
        response_data["message"] = "success"
        response_data["data"] = data
        
        return Response(response_data, status=status.HTTP_200_OK)
    