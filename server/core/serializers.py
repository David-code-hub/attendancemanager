from rest_framework.serializers  import ModelSerializer
from rest_framework import serializers
from .models import Group,Lead,Tribe,Intern,Attendant,Session,MainSession,Coach,Course

class GroupSerializer(ModelSerializer):
	class Meta:
		model = Group
		fields = '__all__'
		depth = 1

class LeadSerializer(ModelSerializer):
	class Meta:
		model = Lead
		fields = '__all__'
		depth = 1

class TribeSerializer(ModelSerializer):
	class Meta:
		model = Tribe
		fields = '__all__'
		depth = 1

class AttendantSerializer(ModelSerializer):
	class Meta:
		model = Attendant
		fields = '__all__'
		depth = 1

class InternSerializer(ModelSerializer):
	class Meta:
		model = Intern
		fields = '__all__'
		depth = 1

class SessionSerializer(ModelSerializer):
	class Meta:
		model = Session
		fields = '__all__'
		depth = 3


class MainSessionSerializer(ModelSerializer):
	class Meta:
		model = MainSession
		fields = '__all__'
		depth = 3
  
class CoachSerializer(ModelSerializer):
	class Meta:
		model = Coach
		fields = '__all__'
		depth = 1

class CourseSerializer(ModelSerializer):
	class Meta:
		model = Course
		fields = '__all__'
		depth = 1