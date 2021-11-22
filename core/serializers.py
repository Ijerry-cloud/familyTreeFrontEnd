from rest_framework import serializers
from core.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    
    gender = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    
    class Meta:
        exclude = ["user"]
        model = Profile
        
    def get_gender(self, profile):
        if profile.gender:
            return profile.gender.capitalize()
        return ""
    
    def get_image(self, profile):
        pass
        
