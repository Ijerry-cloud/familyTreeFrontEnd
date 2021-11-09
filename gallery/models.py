from django.db import models
from events.models import Event

# Create your models here.
class Gallery(models.Model):
    
    title = models.CharField(max_length=1000)
    description = models.CharField(max_length=10000, null=True)
    type = models.CharField(max_length=1000)   # valid options : [video, image]
    video_link = models.CharField(max_length=1000, null=True)
    base64_image = models.TextField(null=True)
    tags = models.CharField(null=True, max_length=1000)
    event = models.ForeignKey(Event, related_name="gallery", null=True, on_delete=models.CASCADE)
    
    
    def __str__(self) -> str:
        return "%s" % (self.title)
    