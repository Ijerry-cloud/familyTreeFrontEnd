from django.shortcuts import render
from core.authentication import CustomTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from projects.serializers import ProjectSerializer
from .models import *

class ListAllApiView(generics.ListAPIView):
    """endpoint to get recent and upcoming events 
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        projects = Project.objects.all()

        serializer = ProjectSerializer(projects, many=True)
        
        response_data = dict()
        response_data["message"] = "success"
        response_data["data"] = serializer.data

        return Response(response_data, status=status.HTTP_200_OK)
