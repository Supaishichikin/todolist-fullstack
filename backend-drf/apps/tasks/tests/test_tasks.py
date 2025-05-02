# tasks/tests/test_tasks.py

import pytest
from django.urls import reverse
from rest_framework import status

@pytest.mark.django_db
def test_create_task(auth_client):
    url = reverse('task-list')
    data = {
        "title": "Buy milk",
        "description": "From the market",
        "priority": "Medium",
        "status": "Todo",
        "to_complete_at": "2025-05-01T12:00:00Z"
    }
    response = auth_client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == "Buy milk"

@pytest.mark.django_db
def test_list_tasks(auth_client, create_task):
    url = reverse('task-list')
    res = auth_client.get(url)
    assert res.status_code == status.HTTP_200_OK
    assert isinstance(res.data, list)
    assert len(res.data) > 0

@pytest.mark.django_db
def test_update_task(auth_client):
    create = auth_client.post(reverse('task-list'), {
        "title": "Do laundry",
        "description": "",
        "priority": "Low",
        "status": "Todo",
        "to_complete_at": "2025-05-02T12:00:00Z"
    })
    task_id = create.data['id']
    url = reverse('task-detail', args=[task_id])
    res = auth_client.patch(url, {"status": "Done"})
    assert res.status_code == status.HTTP_200_OK
    assert res.data['status'] == "Done"

@pytest.mark.django_db
def test_delete_task(auth_client):
    create = auth_client.post(reverse('task-list'), {
        "title": "Do laundry",
        "priority": "Low",
        "status": "Todo",
        "to_complete_at": "2025-05-02T12:00:00Z"
    })
    task_id = create.data['id']
    url = reverse('task-detail', args=[task_id])
    res = auth_client.delete(url)
    assert res.status_code == status.HTTP_204_NO_CONTENT
