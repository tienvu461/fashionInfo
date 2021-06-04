from enum import Enum
from django.conf import settings

class adminConst:
    WIDTH_XL = 720
    WIDTH_LA = 540
    WIDTH_SM = 360
    WIDTH_XS = 180
    ATTACH_DIR = "attached/"
    ARCHIVED_DIR = "archived/"
class modelConst:
    STATUS = (
        (0, "Draft"),
        (1, "Publish")
    )
    POST_TYPES = (
        (0, "None"),
        (1, "Photo"),
        (2, "News"),
        (3, "Comment")
    )
    BINARY = (
        (False, "No"),
        (True, "Yes")
    )

class postTypeEnum(Enum):
    NoType = 1
    Photo = 2
    News = 3
    Comment = 4
    
class photosConst:
    TAGS_RATIO = 8
    PHOTOGRAPHER_RATIO = 2
    PAGE_SIZE = settings.REST_FRAMEWORK["PAGE_SIZE"]
    MAX_PAGE_SIZE = settings.REST_FRAMEWORK["MAX_PAGE_SIZE"]