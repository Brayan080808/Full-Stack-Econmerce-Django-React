from django.urls import path,include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView,TokenVerifyView,TokenBlacklistView
from .views import UserData,GoogleLoginView,Register,Update_Password,Contact_Us,Resent_Email,Login

router = routers.DefaultRouter()
router.register(r"", UserData, "UserData")


urlpatterns = [
    path('api/login/', Login.as_view(), name='login'),
    path('api/register/', Register.as_view(), name='register'),
    path('api/change/password/', Update_Password.as_view(), name='change-password'),
    path('resend/mail/<int:id>/', Resent_Email.as_view()),
    path('api/contact/', Contact_Us.as_view()),
    path('verify/google/', GoogleLoginView.as_view()),
    path('user/data/', UserData.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # Otros endpoints de tu API
    # ...
]