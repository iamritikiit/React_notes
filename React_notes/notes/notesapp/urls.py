# urls.py

from django.urls import path
from .views import IndexCreateView

urlpatterns = [
    path('notes/', IndexCreateView.as_view(), name='index-create'),
]
