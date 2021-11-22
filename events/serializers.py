from rest_framework import serializers
from .models import Event
from FamilyTreeApp.settings import UBASE_URL, env

class EventSerializer(serializers.ModelSerializer):
    
    cover_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = "__all__"

    def get_cover_image(self, event):
        return "%s/events/%s/cover_image/" % (UBASE_URL[env], event.id)
        
