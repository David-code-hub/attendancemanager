from django.urls import path
from . import views


urlpatterns = [
	path('',views.attend,name="attend"),
    path('user-login/',views.userLogin,name="user-login"),
    path('logoutaccount/',views.logout_view,name="logout_view"),
    path('userauthentication/',views.user_authentication,name="user_authentication"),
	path('calculate/',views.calculate,name="calculate"),
    path('api/check/<int:id>/',views.check,name="check"),
    path('calculateOne/<int:id>/',views.calculateOne,name="calculateOne"),
    path('lock/<int:id>/',views.lock,name="lock"),
    path('createsession/',views.createsession,name="createsession"),
    path('deletesession/<int:id>/',views.deletesession,name="deletesession"),
    path('addsessionintern/<int:id>/',views.addsessionintern,name="addsessionintern"),

    #api
    path('api/groups/',views.groups,name="groups"),
    path('api/sessions/',views.sessions,name="sessions"),
    path('api/interns/',views.interns,name="interns"),
    path('api/sessionsOne/<int:id>/',views.sessionsOne,name="sessionsOne"),
    path('api/allmainsessions/',views.allmainsessions,name="allmainsessions"),
    path('api/allcoaches/',views.allcoaches,name="allcoaches"),
    path('api/allcourses/',views.allcourses,name="allcourses"),



]