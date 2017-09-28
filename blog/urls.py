from django.conf.urls import url
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$', views.post_list, name="post_list"),
    url(r'^post/(?P<pk>\d+)/$', views.post_detail, name="post_detail"),
    url(r'^about', TemplateView.as_view(template_name='blog/about.html'), name='about'),
]
