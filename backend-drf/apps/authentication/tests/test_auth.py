# auth/tests/test_auth.py

import pytest
from django.urls import reverse
from apps.accounts.models import CustomUser
from rest_framework import status
from django.core import mail
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.settings import api_settings
import jwt


@pytest.mark.django_db
def test_register(api_client):
    url = reverse('register')
    data = {
        "username": "newuser",
        "email": "new@example.com",
        "password": "pass1234"
    }
    res = api_client.post(url, data)
    assert res.status_code == status.HTTP_201_CREATED
    assert CustomUser.objects.filter(username="newuser").exists()

@pytest.mark.django_db
def test_login(api_client, test_user):
    url = reverse('token_obtain_pair')
    res = api_client.post(url, {
        "username": test_user.username,
        "password": "strongpass123"
    })
    assert res.status_code == status.HTTP_200_OK
    assert "access" in res.data
    assert "refresh" in res.data

@pytest.mark.django_db
def test_logout(api_client, test_user):
    # Step 1: Log in to get a new refresh token
    login_url = reverse('token_obtain_pair')
    login_response = api_client.post(login_url, {
        "username": test_user.username,
        "password": "strongpass123"
    })
    assert login_response.status_code == status.HTTP_200_OK
    refresh_token = login_response.data["refresh"]

    # Step 2: Send logout request
    logout_url = reverse('logout')
    response = api_client.post(logout_url, {"refresh": refresh_token})
    assert response.status_code == status.HTTP_205_RESET_CONTENT

    # Step 3: Verify the token is blacklisted without triggering a TokenError
    decoded = jwt.decode(refresh_token, api_settings.SIGNING_KEY, algorithms=[api_settings.ALGORITHM])
    jti = decoded[api_settings.JTI_CLAIM]
    assert BlacklistedToken.objects.filter(token__jti=jti).exists()

    # Step 4: Try logging out again with the same token (should not raise error)
    second_response = api_client.post(logout_url, {"refresh": refresh_token})
    
    # Adjusted to check for "Invalid or expired token" instead of "blacklisted"
    assert second_response.status_code == status.HTTP_400_BAD_REQUEST
    assert "invalid or expired token" in second_response.data["detail"].lower()

@pytest.mark.django_db
def test_password_reset_request(api_client, test_user):
    url = reverse('password_reset')
    data = {
        "email": test_user.email
    }
    
    res = api_client.post(url, data)

    assert res.status_code == status.HTTP_200_OK
    assert len(mail.outbox) == 1
    
    email = mail.outbox[0]

    assert "Password Reset" in email.subject
    assert test_user.email in email.to

def test_password_reset_confirm(api_client, test_user):

    url = reverse('password_reset')
    data = {
        "email": test_user.email
    }
    response = api_client.post(url, data)

    assert response.status_code == status.HTTP_200_OK
    assert len(mail.outbox) == 1

    reset_email = mail.outbox[0]
    reset_link = reset_email.body
    
    parts = reset_link.split('/') 
    uid = parts[-3]  
    token = parts[-2] 

    confirm_url = reverse('password_reset_confirm')
    confirm_data = {
        "uid": uid,  
        "token": token,  
        "new_password": "newpass123"
    }

    confirm_response = api_client.post(confirm_url, confirm_data)

    assert confirm_response.status_code == status.HTTP_200_OK

    login_url = reverse('token_obtain_pair')
    login_data = {
        "username": test_user.username,
        "password": "newpass123"
    }
    login_response = api_client.post(login_url, login_data)

    assert login_response.status_code == status.HTTP_200_OK
    assert "access" in login_response.data  
    assert "refresh" in login_response.data  