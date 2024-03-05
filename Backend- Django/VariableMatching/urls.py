"""
URL configuration for VariableMatching project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import *

schema_view = get_schema_view(
    openapi.Info(
        title="MBTI test ",
        default_version='v1',
        description='EI:\n'
                    'Question 1 = When you have a day all to yourself, what does your ideal day look like?\n'
                    'Question 2 = In a bustling social event, what role do you find yourself naturally gravitating towards?\n'
                    'SN:\n'
                    'Question 1 = How do you typically prepare for a new experience or journey?\n'
                    'Question 2 = When reflecting on a past event, what stands out to you the most - the specific details or the overall meaning?\n'
                    'TF:\n'
                    'Question 1 = When offering support to a friend, what is your instinctive response?\n'
                    'Question 2 = Reflecting on a recent decision, what was the primary influence on your choice - logic or the impact on others?\n'
                    'JP:\n'
                    'Question 1 = How do you adapt to changes in your daily routine or plans?\n'
                    'Question 2 = In a team setting, what is your approach to completing tasks and reaching goals?'


    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('VM/', VariableMatching, name='VariableMatching'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

