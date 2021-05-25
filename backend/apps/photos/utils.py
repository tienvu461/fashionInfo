
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
    # logger.debug("tag_pt = {} --- photographer_pt = {} ".format(tag_pt, photographer_pt))
    return tag_pt + photographer_pt


# create nested json form flat json
def nested_comment(list_comment, list_reply):
    for item in list_reply:
        if item["parent"]:
            parent_id = item["parent"]
            parent_comment = next(item for item in list_comment if item["cmt_id"] == parent_id)
            # create list reply if not exist, otherwise append
            if "reply" in parent_comment:
                parent_comment["reply"].append(item)
            else:
                parent_comment["reply"] = [item]
        else:
            logger.debug("parent is None")
            logger.error("No parent comment found!")
    return

        
