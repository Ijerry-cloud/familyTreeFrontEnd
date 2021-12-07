from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.
class TreeBio(models.Model):
    
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, related_name="children")
    spouse = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, related_name="uspouse")
    first_name = models.CharField(max_length=1000, null=True, blank=True)
    last_name = models.CharField(max_length=1000, null=True, blank=True)
    gender = models.CharField(max_length=11, null=True, blank=True)
    marital_status = models.CharField(max_length=11, null=True, blank=True)
    dob = models.DateField(null=True)
    
    def __str__(self) -> str:
        return "%s %s" % (self.first_name, self.last_name)


class TreeBio2(MPTTModel):
    
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, related_name="children")
    spouse = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, related_name="uspouse")
    first_name = models.CharField(max_length=1000, null=True, blank=True)
    last_name = models.CharField(max_length=1000, null=True, blank=True)
    gender = models.CharField(max_length=11, null=True, blank=True)
    marital_status = models.CharField(max_length=11, null=True, blank=True)
    dob = models.DateField(null=True)
    
    def __str__(self) -> str:
        return "%s %s" % (self.first_name, self.last_name)


    
