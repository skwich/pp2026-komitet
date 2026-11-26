from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.utils import timezone


class UserManager(BaseUserManager):
    """
    Менеджер для создания обычных пользователей
    и администраторов.
    """

    use_in_migrations = True

    def create_user(self, phone, full_name, password=None, **extra_fields):
        if not phone:
            raise ValueError("Необходимо указать номер телефона")

        if not full_name:
            raise ValueError("Необходимо указать ФИО")

        phone = phone.strip()
        full_name = full_name.strip()

        user = self.model(
            phone=phone,
            full_name=full_name,
            **extra_fields
        )

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)

        return user

    def create_superuser(self, phone, full_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("У администратора is_staff должен быть True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("У администратора is_superuser должен быть True")

        return self.create_user(
            phone,
            full_name,
            password,
            **extra_fields
        )


class User(AbstractBaseUser, PermissionsMixin):
    phone = models.CharField(
        "Номер телефона",
        max_length=20,
        unique=True
    )

    full_name = models.CharField(
        "ФИО",
        max_length=255
    )

    is_active = models.BooleanField(
        "Активен",
        default=True
    )

    is_staff = models.BooleanField(
        "Администратор",
        default=False
    )

    date_joined = models.DateTimeField(
        "Дата регистрации",
        default=timezone.now
    )

    objects = UserManager()

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = ["full_name"]

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
        ordering = ["full_name"]

    def __str__(self):
        return f"{self.full_name} ({self.phone})"