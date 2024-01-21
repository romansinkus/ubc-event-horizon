# -*- coding: utf-8 -*-
"""
Created on Sun Jan 21 00:13:30 2024

@author: cherr
"""

from dotenv import load_dotenv
import os

import pandas as pd
import re
import time
import json


from openai import OpenAI


load_dotenv()
#%%
#AUTHENTICATION

openai_api_key = os.getenv("NEW_OPENAI_API_KEY")
client = OpenAI(api_key = openai_api_key)
