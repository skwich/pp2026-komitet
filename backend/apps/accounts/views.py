
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    UserSerializer,
    RegistrationSerializer,
    LoginSerializer,
)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CsrfTokenView(APIView):
    """
    Выдаёт CSRF-токен, необходимый для безопасных POST-запросов.
    """

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "csrfToken": get_token(request)
        })


@method_decorator(csrf_protect, name="dispatch")
class RegisterView(APIView):
    """
    Регистрация нового пользователя.
    После регистрации автоматически выполняется вход.
    """

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        registration_role = serializer.validated_data["role"]
        user = serializer.save()

        login(request, user)

        return Response(
            {
                "message": (
                    "Регистрация прошла успешно. "
                    "Права доступа к группам назначаются отдельно."
                ),
                "registration_role": registration_role,
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED
        )


@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    """
    Авторизация пользователя по номеру телефона и паролю.
    """

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone = serializer.validated_data["phone"]
        password = serializer.validated_data["password"]

        user = authenticate(
            request,
            phone=phone,
            password=password
        )

        if user is None:
            return Response(
                {
                    "detail": "Неверный номер телефона или пароль."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        login(request, user)

        return Response({
            "message": "Вход выполнен успешно.",
            "user": UserSerializer(user).data
        })


class CurrentUserView(APIView):
    """
    Получение информации о текущем авторизованном пользователе.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "user": UserSerializer(request.user).data
        })


@method_decorator(csrf_protect, name="dispatch")
class LogoutView(APIView):
    """
    Завершение пользовательской сессии.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)

        return Response({
            "message": "Вы вышли из аккаунта."
        })
