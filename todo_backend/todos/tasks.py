from celery import shared_task
from .utils import send_notification_email
from .models import Todo
from django.utils import timezone


@shared_task
def send_email_at_specific_time(todo_id:int):
    try:
        todo = Todo.objects.get(pk=todo_id)
    except Todo.DoesNotExist:
        return "Todo does npt exist"
    
    context = {'todo':todo}
    if todo.email_sent:
        return "Email already sent"

    if not todo.notify_at:
        return "No notification time"
    if todo.notify_at > timezone.now():
        return "Notification time has not arrived"

    if not todo.user.email:
        return "User has no email address"

    context = {
        "todo": todo,
        "user": todo.user,
    }

    send_notification_email(
        "Todo notification",
        todo.user.email,
        context,
        "email_layout.html",
    )

    todo.email_sent = True

    todo.save(
        update_fields=["email_sent"]
    )

    return "Email sent successfully"