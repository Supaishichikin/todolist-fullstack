from rest_framework import viewsets
from .models import Tasks
from .serializers import TaskSerializer

class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
