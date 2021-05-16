
import logging
import json

from .consts import photosConst
logger = logging.getLogger('photos')

def calc_interactive_pt(params_dict: dict=None, ratio_dict: dict=None):
    pt = 0
    for key, value in params_dict.items():
        # logger.debug("key = {} , value = {}".format(key, value))
        # if "comments" == key:
        #     logger.debug("key = {}".format(key))
        #     logger.debug("value = {}".format(value))
        #     logger.debug("key 2 = {}".format(ratio_dict["{}_interact_weight".format(key)]))
        #     logger.debug(type(value))
        #     rs = len(value) * ratio_dict["{}_interact_weight".format(key)]
        #     pt = pt + rs
        #     logger.debug("rs = {}".format(rs))
        # elif key in photosConst.INTERACTIVE_RATIO:
        # logger.debug("key = {}".format(key))
        # logger.debug("value = {}".format(value))
        # logger.debug("key 2 = {}".format(ratio_dict["{}_interact_weight".format(key)]))
        # logger.debug(type(value))
        rs = value * ratio_dict["{}_interact_weight".format(key)]
        pt = pt + rs
        # logger.debug("rs = {}".format(rs))
    logger.debug("pt = {}".format(pt))
    return pt
        
