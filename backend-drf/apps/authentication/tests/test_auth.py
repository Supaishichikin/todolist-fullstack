# auth/tests/test_auth.py

import pytest
from django.utils.http import urlsafe_base64_decode
from django.urls import reverse
from apps.accounts.models import CustomUser
from rest_framework import status
from django.core import mail


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