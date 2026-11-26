
import re

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers


User = get_user_model()


def normalize_phone(value: str) -> str:
    """
    Убирает пробелы, скобки и дефисы из номера телефона.
    Например: +7 (999) 000-00-00 -> +79990000000
    """
    return re.sub(r"[\s()-]", "", value)


class UserSerializer(serializers.ModelSerializer):
    """Безопасное представление данных пользователя."""

    class Meta:
        model = User
        fields = ("id", "phone", "full_name")


class RegistrationSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=20)
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False
    )

    role = serializers.ChoiceField(
        choices=("parent", "treasurer"),
        default="parent"
    )

    def validate_full_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError("Введите ФИО.")

        return value

    def validate_phone(self, value):
        value = normalize_phone(value)

        if not re.fullmatch(r"\+?\d{8,15}", value):
            raise serializers.ValidationError(
                "Введите корректный номер телефона."
            )

        if User.objects.filter(phone=value).exists():
            raise serializers.ValidationError(
                "Пользователь с таким номером уже зарегистрирован."
            )

        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        # Выбранная роль пока является только пожеланием пользователя.
        # Права казначея предоставляются отдельно.
        validated_data.pop("role", None)

        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=20)
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False
    )

    def validate_phone(self, value):
        value = normalize_phone(value)

        if not re.fullmatch(r"\+?\d{8,15}", value):
            raise serializers.ValidationError(
                "Введите корректный номер телефона."
            )

        return value
