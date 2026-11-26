from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    
    ordering = ("phone",)

    list_display = (
        "phone",
        "full_name",
        "is_active",
        "is_staff",
    )

    search_fields = (
        "phone",
        "full_name",
    )

    fieldsets = (
        (None, {
            "fields": ("phone", "password")
        }),

        ("Личная информация", {
            "fields": ("full_name",)
        }),

        ("Права доступа", {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),

        ("Даты", {
            "fields": (
                "last_login",
                "date_joined",
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "phone",
                "full_name",
                "password1",
                "password2",
                "is_staff",
                "is_superuser",
                "is_active",
            ),
        }),
    )

    filter_horizontal = (
        "groups",
        "user_permissions",
    )