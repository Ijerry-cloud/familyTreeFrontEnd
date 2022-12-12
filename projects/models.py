from django.db import models

# Create your models here.
class Project(models.Model):
    
    title = models.CharField(max_length=1000)
    category = models.CharField(max_length=10000, null=True)
    details = models.TextField(null=True, blank=True)
    cover_image  = models.TextField(null=True, blank=True)   # <- base 64 string should go here
    commencement_date = models.DateField(auto_now_add=True)
    featured = models.BooleanField(default=False)
    
    
    def __str__(self) -> str:
        return "%s" % (self.title)