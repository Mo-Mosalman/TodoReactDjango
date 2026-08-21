from .serializers import TodoSerializer, UserSerializer
from .models import Todo
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView, CreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .tasks import send_email_at_specific_time
# Create your views here.

class TodoListView(ListAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user).order_by('-created_at')

class TodoCreateView(CreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        todo = serializer.save(user=self.request.user)
        if todo.notify_at:
            send_email_at_specific_time.apply_sync(args=[todo.id], eta=todo.notify_at)

class SignUpView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()

class TodoDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)