import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from apps.tasks.models import Tasks
from rest_framework_simplejwt.tokens import RefreshToken

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_task():
    task = Tasks.objects.create(
        title="Buy milk",
        description="From the market",
        priority="Medium",
        status="Todo",
        to_complete_at="2025-05-01T12:00:00Z"
    )
    return task

@pytest.fixture
def test_user(db):
    user = User.objects.create_user(
        username="johndoe",
        email="john@example.com",
        password="strongpass123"
    )
    return user

@pytest.fixture
def user_token(test_user):
    refresh = RefreshToken.for_user(test_user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    }

@pytest.fixture
def auth_client(api_client, user_token):
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {user_token["access"]}')
    return api_client
