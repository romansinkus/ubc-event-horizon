# -*- coding: utf-8 -*-
"""
Created on Sat Jan 20 14:47:12 2024

@author: cherr
"""

import os
import sys
import pandas as pd

from openai import OpenAI

sys.path.append('C:\\Users\\cherr\\OneDrive\Documents\\Code projects\\NW2024-goal-tracker')
from data.env import set_openai_api_key

#%%
set_openai_api_key()


openai_api_key = os.environ.get("nw2024_openai_key")
client = OpenAI(api_key = openai_api_key)

