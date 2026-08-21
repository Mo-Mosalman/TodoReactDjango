# TodoReactDjango

A full-stack Todo List application built with **Django REST Framework** and **React**.

## Features

- User signup and login
- JWT authentication
- Protected routes
- Create, read, update, and delete Todos
- Todo completion status
- Todo details and timestamps
- Paginated Todo list
- Delete confirmation modal
- Scheduled email notifications
- HTML email templates
- Celery background tasks
- Redis as Celery message broker
- Responsive UI with Tailwind CSS

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- Celery
- Redis

### Frontend
- React
- React Router
- Axios
- React Context API
- Tailwind CSS

## Project Structure

```text
TodoReactDjango/
├── todo_backend/
│   ├── todos/
│   └── todo_backend/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   └── public/
│
└── README.md
