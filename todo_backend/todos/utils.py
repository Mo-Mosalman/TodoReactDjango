from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def send_notification_email(
        subject,
        to,
        context,
        template_name,
    ):
    html_message = render_to_string(
        template_name,
        context,
    )

    email = EmailMultiAlternatives(
        subject=subject,
        body="Todo notification",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[to],
    )

    email.attach_alternative(
        html_message,
        "text/html",
    )

    email.send()