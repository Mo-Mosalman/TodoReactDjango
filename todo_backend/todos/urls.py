from django.urls import path
from .views import TodoListView, TodoCreateView, SignUpView, TodoDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    # Token urls
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/signup/', SignUpView.as_view(), name='signup'),
    # Todo urls
    path('todos/',TodoListView.as_view(),name='todo-list'),
    path('todos/create/',TodoCreateView.as_view(), name='todo-create'),
    path('todos/<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),
]