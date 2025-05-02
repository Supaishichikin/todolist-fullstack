from rest_framework import viewsets
from .models import Tasks
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated

class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Only return tasks of the logged-in user
        return Tasks.objects.filter(user=self.request.user).order_by('-created_at')