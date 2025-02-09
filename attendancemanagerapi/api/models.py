from django.db import models
from django.contrib.auth.models import AbstractUser,Group,Permission
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.dispatch import receiver


class Company(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100,unique=True,blank=False)

    def __str__(self):
        return self.name
    
@receiver(pre_save,sender=Company)
def populate_slug(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)

class CompanyUser(AbstractUser):
    company = models.ForeignKey(Company,on_delete=models.CASCADE,null=True,blank=True)
    groups = models.ManyToManyField(
        Group,
        related_name="companyuser_set",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="companyuser_permissions",  
        blank=True
    )

    def __str__(self):
        return self.username

class StudentGroup(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200,unique=True,blank=False)

    def __str__(self):
        return self.name

@receiver(pre_save,sender=StudentGroup)
def populate_slug(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)

class Student(models.Model):
    name = models.CharField(max_length=100)
    group = models.ForeignKey(StudentGroup,on_delete=models.CASCADE) 

    def __str__(self):
        return self.name
