from rest_framework import serializers
from core.models import Profile
from FamilyTreeApp.settings import UBASE_URL, env


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
        if profile.image_64:
            return "%s/core/user_profile/%s/image/" % (UBASE_URL[env], profile.id)
        return None
        
