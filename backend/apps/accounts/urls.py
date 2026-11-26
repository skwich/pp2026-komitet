
from django.urls import path

from .views import (
    CsrfTokenView,
    RegisterView,
    LoginView,
    CurrentUserView,
    LogoutView,
)


urlpatterns = [
    path("csrf/", CsrfTokenView.as_view(), name="csrf"),

    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),

    path("me/", CurrentUserView.as_view(), name="current-user"),
]
