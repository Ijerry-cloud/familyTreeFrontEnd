from django.shortcuts import get_object_or_404, render
from rest_framework import response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from core.authentication import CustomTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from core.core_helpers import check_date_chronology, validate_fields
from core.default_values import DEFAULT_EVENT_IMAGE_BASE_64
from core.pagination import CustomPagination
from django.http import HttpResponse
from events.serializers import EventSerializer
from .models import *
from rest_framework import generics
from .filters import EventFilter
from base64 import b64decode
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


# LIST CREATE EVENTS
class ListCreateApiView(generics.ListCreateAPIView):
    
    """
        api to get and create an event
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filterset_class = EventFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    
    def get(self, request, *args, **kwargs):
        events = self.paginate_queryset(self.filter_queryset(self.get_queryset()))
        serializer = EventSerializer(events, many=True)
        
        return self.get_paginated_response(serializer.data)

    
    def post(self, request, *args, **kwargs):
        
        response_data = dict()
        
        data = request.data.get("data")
        
        if not data:
            return Response({"message": "Payload with data keyword is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        ok, message = validate_fields(data, ["start_date", "end_date", "title"])
        
        if not ok:
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)
        
        # validate start and end date
        start_date_comes_before_end_date, start_date, end_date = check_date_chronology(data.get('start_date'), data.get('end_date'))
        
        if not start_date_comes_before_end_date:
            return Response({"message": "Start date cannot come before end date"},
                            status=status.HTTP_400_BAD_REQUEST)
            
        
        event = Event.objects.create(
            title=data.get("title", ""),
            description=data.get("description", ""),
            details=data.get("details"),
            cover_image=data.get("cover_image", DEFAULT_EVENT_IMAGE_BASE_64), # put a generic cover image here
            start_date=start_date,
            end_date=end_date,
            tags=data.get("tags"),
            created_by=str(request.user)
        )
        
        serializer = EventSerializer(event)
        
        response_data["message"] = "success"
        response_data["statusCode"] = 200
        response_data["data"] = serializer.data
        
        return Response(response_data, status=status.HTTP_201_CREATED)
    
    def get_queryset(self):
        return Event.objects.all()
    
            

class RetrieveUpdateDestroyEventApiView(generics.RetrieveUpdateDestroyAPIView):
    """
        api to get, update and delete an event
    """
    authentication_classes = [CustomTokenAuthentication]
    permission_classes = [IsAuthenticated]

    
    def get(self, request, *args, **kwargs):
        event = get_object_or_404(Event, pk=self.kwargs["id"])
        serializer = EventSerializer(event)
        
        response_data = dict()
        response_data["message"] = "success"
        response_data["statusCode"] = 200
        response_data["data"] = serializer.data
        
        return Response(response_data, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        event = get_object_or_404(Event, pk=self.kwargs["id"])

        data = request.data.get("data")
        
        if not data:
            return Response({"message": "Payload with data keyword is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        event.title = data.get("title", event.title)
        event.description = data.get("description", event.description)
        event.details = data.get("details", event.details)
        event.cover_image = data.get("cover_image", event.cover_image)
        event.tags = data.get("tags", event.tags)
        
        start_date_string = data.get("start_date") if data.get("start_date") else str(event.start_date)
        end_date_string = data.get("end_date") if data.get("end_date") else str(event.end_date)
        
        start_date_comes_before_end_date, start_date, end_date = check_date_chronology(start_date_string, end_date_string)
        
        if not start_date_comes_before_end_date:
            return Response({"message": "Start date cannot come before end date"},
                            status=status.HTTP_400_BAD_REQUEST)
        
        event.start_date = start_date
        event.end_date = end_date
        event.save()
        
        serializer = EventSerializer(event)
        
        response_data = dict()
        response_data["message"] = "success"
        response_data["statusCode"] = 200
        response_data["data"] = serializer.data
        
        return Response(response_data, status=status.HTTP_200_OK)
    
    
    def delete(self, request, *args, **kwargs):
        event = get_object_or_404(Event, pk=self.kwargs["id"])
        event.delete()
        
        response_data = dict()
        response_data["message"] = "success"
        response_data["statusCode"] = 200
        
        return Response(response_data, status=status.HTTP_204_NO_CONTENT)
    


class GetEventCoverImageView(generics.RetrieveAPIView):
    
    
    def get(self, request, *args, **kwargs):
        """
            endpoint to generate an image
            from the base 64 image  
        """
        
        event = get_object_or_404(Event, pk=self.kwargs["id"])
        cover_image = event.cover_image
        header, cover_image = cover_image.split(";base64,")
        cover_image = b64decode(cover_image + "=" * (-len(cover_image) % 4))
        return HttpResponse(cover_image, content_type="image/jpeg")