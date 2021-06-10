from django.shortcuts import render

# Create your views here.

from djconfig import config
from spirit.core.utils.paginator import paginate, yt_paginate
from spirit import topic 
from spirit.category.models import Category
from spirit.topic.models import Topic
import logging

logger = logging.getLogger("photos")

def index_active(request):
    categories = (
        Category.objects
        .visible()
        .parents()
        .ordered())

    topics = (
        Topic.objects
        .visible()
        .global_()
        .with_bookmarks(user=request.user)
        .order_by('-is_globally_pinned', '-last_active')
        .select_related('category'))

    topics_from_pinned_cate = Topic.objects.filter(category=4)
    logger.debug("topics_from_pinned_cate: {}".format(topics_from_pinned_cate))
    topics = yt_paginate(
        topics,
        per_page=config.topics_per_page,
        page_number=request.GET.get('page', 1))
    return render(
        request=request,
        template_name='spirit/topic/active.html',
        context={
            'categories': categories,
            'topics': topics,
            'topics_from_pinned_cate': topics_from_pinned_cate})


# topic.index_active = _index_active
