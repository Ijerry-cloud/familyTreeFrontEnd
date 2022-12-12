from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    
    cover_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = "__all__"

    def get_cover_image(self, event):
        return "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"