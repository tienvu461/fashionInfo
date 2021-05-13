from enum import Enum

class adminConst:
    WIDTH_XL = 720
    WIDTH_LA = 540
    WIDTH_SM = 360
    WIDTH_XS = 180

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

class postTypeEnum(Enum):
    NoType = 1
    Photo = 2
    News = 3
    Comment = 4
    
class photosConst:
    INTERACTIVE_RATIO = [
        'likes',
        'dislikes',
        'comments',
        'views',
    ]