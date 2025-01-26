from django.shortcuts import render
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.http import JsonResponse
import json
from django.contrib.auth import authenticate,logout,login
from django.contrib.auth.models import User
from django.contrib.auth import logout
from .models import Session,Intern,Group,Attendant,Course,Lead,Coach,MainSession
from .serializers import GroupSerializer,LeadSerializer,TribeSerializer,AttendantSerializer,InternSerializer,SessionSerializer,MainSessionSerializer,CoachSerializer,CourseSerializer
from rest_framework.decorators import api_view
from django.db.models import Avg,F
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from datetime import datetime
# Create your views here.



def attend(request):
	return render(request, 'attend.html')


def user_authentication(request):
	if User.objects.filter(username=request.user.username):
		auth = 'auth'
		return JsonResponse({"authenticated":auth}, status=201)
	else:
		auth = 'auth err'
		return JsonResponse({"authenticated":auth}, status=400)

def userLogin(request):
	data = json.loads(request.body)
	username = data['username']
	password = data['password']
	user = authenticate(username=username, password=password)
	if user is not None:
		if user.is_active == True:
			login(request, user)
			response = 'Welcome back.'
			return JsonResponse({"msg":response}, status=201) 
		else:
			response = 'Please verify account before logging in.'
			return JsonResponse({"err":response}, status=400) 
	else:
		response = 'Invalid credentials. Fields may be case sensitive.' 
		print(response)
		return JsonResponse({"err":response}, status=500)
		

def createsession(request):
	data = json.loads(request.body) 
	title = data['title']
	date = data['date']
	group = data['group']
	g = Group.objects.get(name=group)
	s = Session.objects.create(title=title,date=date,group=g)
	s.save()
	id_ = s.id
	print(s.id)
	return JsonResponse({"id":id_}, status=201)

def addsessionintern(request,id):
	data = json.loads(request.body)
	s = Session.objects.get(id=id)
	_id = data['id']
	i = Intern.objects.get(id=_id)
	if s.attendants.filter(intern_name=i):
		att = s.attendants.get(intern_name=i)
		a = Attendant.objects.get(id=att.id)
		s.attendants.remove(a)
		response = 'removed intern from session'
		return JsonResponse({"id":response}, status=201)
	else:
		a = Attendant.objects.create(intern_name=i)
		s.attendants.add(a)
		response = 'added intern to session'
		return JsonResponse({"id":response}, status=201)


def deletesession(request,id):
	s = Session.objects.get(id=id)
	s.delete()
	response = 'Session deleted.'
	return JsonResponse({"msg":response}, status=201)


def logout_view(request):
	logout(request)
	response = 'Logged out.'
	return JsonResponse({"message":response}, status=200) 


def calculate(request):
	sessions = Session.objects.all()
	for s in sessions:
		t = s.attendants.filter(present = True).count()
		f = s.attendants.all().count()
		s.attendance = ((t/f) * 100)
		print(s.attendance)
		s.save()
	response = 'perc.'
	return JsonResponse({"message":response}, status=200)

def lock(request,id):
	s = Session.objects.get(id=id)
	if s.lock:
		s.lock = False
		s.save()
		response = 'unlocked.'
		return JsonResponse({"message":response}, status=200)
	else:
		s.lock = True
		s.save()
		response = 'locked.'
		return JsonResponse({"message":response}, status=200)

@api_view(('GET',))
def calculateOne(request,id):
	session = Session.objects.get(id=id)
	t = session.attendants.filter(present = True).count()
	f = session.attendants.all().count()
	session.attendance = ((t/f) * 100)
	session.save()
	serializer = SessionSerializer(session)
	return Response(serializer.data)


def check(request,id):
	a = Attendant.objects.get(id=id)
	if a.present:
		a.present = False
		a.save()
		response = 'check.'
		return JsonResponse({"message":response}, status=200)
	else:
		a.present = True
		a.save()
		response = 'check.'
		return JsonResponse({"message":response}, status=200)


@api_view(('GET',))
def sessions(request):
	sessions = Session.objects.all()
	serializer = SessionSerializer(sessions, many=True)
	return Response(serializer.data)


@api_view(('GET',))
def groups(request):
	group = Group.objects.all()
	serializer = GroupSerializer(group, many=True)
	return Response(serializer.data)

@api_view(('GET',))
def interns(request):
	iterns = Intern.objects.all()
	serializer = InternSerializer(iterns, many=True)
	return Response(serializer.data)



@api_view(('GET',))
def sessionsOne(request,id):
	session = Session.objects.get(id=id)
	serializer = SessionSerializer(session)
	return Response(serializer.data)

@api_view(('GET',))
def allmainsessions(request):
	mainsessions = MainSession.objects.all()
	serializer = MainSessionSerializer(mainsessions, many=True)
	return Response(serializer.data)

@api_view(('GET',))
def allcoaches(request):
	coaches = Coach.objects.all()
	serializer = CoachSerializer(coaches, many=True)
	return Response(serializer.data)

@api_view(('GET',))
def allcourses(request):
	courses = Course.objects.all()
	serializer = CourseSerializer(courses, many=True)
	return Response(serializer.data)