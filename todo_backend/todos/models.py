from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,verbose_name='Todo author')
    title = models.CharField(max_length=200, verbose_name='Todo title',db_index=True)
    description = models.TextField(verbose_name='Todo description',blank=True)
    completed = models.BooleanField(default=False, verbose_name="Todo's completion")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Todo creation time')
    updated_at = models.DateTimeField(auto_now=True,verbose_name='Todo update time')
    notify_at = models.DateTimeField(verbose_name='Todo notification time',
                                     null=True,blank=True)
    email_sent = models.BooleanField(default=False, verbose_name='Todo sent to user')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'