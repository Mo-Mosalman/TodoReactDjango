from django.contrib import admin
from .models import Todo
# Register your models here.

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title','user','created_at','completed']
    list_filter = ['completed','email_sent']
    list_per_page = 5