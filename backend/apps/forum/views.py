from django.shortcuts import render

# Create your views here.

from djconfig import config
from spirit.core.utils.paginator import paginate, yt_paginate
from spirit import topic
from spirit.category.models import Category
from spirit.topic.models import Topic
from spirit.comment.models import Comment
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


#     first_comment = Comment.objects.filter(topic__id=topics.first().id)
#     logger.debug(first_comment)

    topics_from_pinned_cate = Topic.objects.filter(category=4)
    logger.debug("topics: {}".format(topics_from_pinned_cate.values()))

    topics = yt_paginate(
        topics,
        per_page=config.topics_per_page,
        page_number=request.GET.get('page', 1))

    latest_dict = get_category_topic()

    return render(
        request=request,
        template_name='spirit/topic/active.html',
        context={
            'categories': categories,
            'topics': topics,
            'topics_from_pinned_cate': topics_from_pinned_cate,
            'latest_dict': latest_dict,
        })


# topic.index_active = _index_active
def get_category_topic():
    latest_dict = []
    categories = (
        Category.objects
        .visible()
        .parents()
        .ordered())
    for cate in categories:
        queryset = Topic.objects.filter(category=cate)
        if queryset:
            latest_topic = queryset.latest('date')
            latest_dict.append(
                {
                    'cate_title': getattr(cate, "title"),
                    'topic': latest_topic,
                }
            )
            logger.debug(getattr(cate, "title"))
            logger.debug(getattr(latest_topic, "title"))
    logger.debug(latest_dict)
    return latest_dict
