from django.urls import path
from .views import *

urlpatterns = [
    path('login/',  LoginApiView.as_view(), name='login'),
    path('logout/',  LogoutApiView.as_view(), name='logout'),
    path("signup/", SignupApiView.as_view(), name="sign_up"),
    path("change_password/", ChangePasswordView.as_view(), name="change_password"),
    path("user_profile/", GetUpdateUserProfileView.as_view(), name="get_update_user_profile"),
]