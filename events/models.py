from django.db import models

# Create your models here.
class Event(models.Model):
    
    title = models.CharField(max_length=1000)
    description = models.CharField(max_length=10000, null=True)
    details = models.TextField(null=True, blank=True)
    cover_image  = models.TextField(null=True)   # <- base 64 string should go here
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    tags = models.CharField(null=True, max_length=1000)
    created_by = models.CharField(max_length=1000, null=True)
    
    
    def __str__(self) -> str:
        return "%s" % (self.title)
    
    class Meta:
        ordering = ["-id"]
    

    