from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import CustomTokenObtainPairView,StudentGroupViewSet


router = DefaultRouter()
router.register(r'student-groups', StudentGroupViewSet, basename="studentgroup")

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("", include(router.urls)),  
]
