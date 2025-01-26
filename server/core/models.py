from django.db import models
from cloudinary.models import CloudinaryField
import secrets

# Create your models here.



class Course(models.Model):
	cover_image = CloudinaryField('cover_image')
	name = models.CharField(max_length=255)


	def __str__(self):
		return self.name


class Group(models.Model):
	name = models.CharField(max_length=255)

	def __str__(self):
		return self.name

class Lead(models.Model):#facilitator
	profile_image = CloudinaryField('profile_image')
	name = models.CharField(max_length=255)
	
	def __str__(self):
		return self.name

class Coach(models.Model):
	coach_cover = CloudinaryField('coach_cover')
	name = models.CharField(max_length=255)

	def __str__(self):
		return self.name

		
class Tribe(models.Model):
	name = models.CharField(max_length=255)
	lead = models.ForeignKey(Lead,on_delete=models.CASCADE)

	def __str__(self):
		return self.name

class Intern(models.Model):
	name = models.CharField(max_length=255)
	tribe = models.ForeignKey(Tribe,on_delete=models.CASCADE)
	group = models.ForeignKey(Group,on_delete=models.CASCADE)
	add = models.BooleanField(default=False)

	def __str__(self):
		return self.name

class Attendant(models.Model):
	intern_name = models.ForeignKey(Intern,on_delete=models.CASCADE)
	present = models.BooleanField(default=False)

	def __str__(self):
		return str(self.intern_name)


class MainSession(models.Model):
	course = models.ForeignKey(Course,on_delete=models.CASCADE)
	lead = models.ForeignKey(Lead, on_delete=models.CASCADE)
	date = models.CharField(max_length=255,null=True,blank=True)
	

class Session(models.Model):#subSessions
	title = models.CharField(max_length=40)
	# mainsession = models.ForeignKey(MainSession,on_delete=models.CASCADE)
	group = models.ForeignKey(Group, on_delete=models.CASCADE)
	# coaches = models.ManyToManyField(Coach)	
	attendants = models.ManyToManyField(Attendant,blank=True,related_name="session_name")
	attendance = models.IntegerField(default=0)
	lock = models.BooleanField(default=False)
	important = models.BooleanField(default=False)
	date = models.CharField(max_length=255)	

	def __str__(self):
		return self.title