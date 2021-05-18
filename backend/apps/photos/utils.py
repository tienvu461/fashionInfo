
import logging
import json

from .consts import photosConst
logger = logging.getLogger('photos')

def calc_interactive_pt(org_tags, suggested_tags, org_photographer, suggested_photographer):
    tag_pt = sum(tag in org_tags for tag in suggested_tags) * photosConst.TAGS_RATIO
    if org_photographer == suggested_photographer:
        photographer_pt = photosConst.PHOTOGRAPHER_RATIO
    else:
        photographer_pt = 0
    logger.debug("tag_pt = {} --- photographer_pt = {} ".format(tag_pt, photographer_pt))
    return tag_pt + photographer_pt
        
