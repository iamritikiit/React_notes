from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import IndexViewSet

router = DefaultRouter()
router.register(r'notesapp', IndexViewSet)
index_router = router