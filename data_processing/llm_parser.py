# -*- coding: utf-8 -*-
"""
Created on Sat Jan 20 14:47:12 2024

@author: cherr
"""

import os
import sys
import pandas as pd

from openai import OpenAI

sys.path.append('C:\\Users\\cherr\\OneDrive\Documents\\Code projects\\ubc-event-horizon')
from data_processing.env import get_openai_api_key

#%%
#AUTHENTICATION

openai_api_key = get_openai_api_key()
client = OpenAI(api_key = openai_api_key)

#%%
# LOAD DATA
urls_df = pd.read_csv(r"C:\Users\cherr\OneDrive\Documents\Code projects\ubc-event-horizon\data\ig_posts_descriptions.csv",  encoding='unicode_escape')

#%%
#filter out non-events

for i, row in urls_df.iterrows():
    text = row['description']
    
    response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
    	{
      	"role": "system",
      	"content": "You will be provided with unstructured data in the form of a paragraph, and your task is to respond 'True' or 'False'. Please respond 'True' if it is an event with time, date, location and activity, 'False' otherwise."
    	},
    	{
      	"role": "user",
      	"content": text
      }
      ],
      temperature=0.7,
      max_tokens=64,
      top_p=1
    )

    msg = response.choices[0].message
    print(msg.content)
    paragraph_dict[row['postUrl']] = msg.content
#%%

paragraph_dict = {}

for i, row in urls_df.iterrows():
    text = row['description']
    
    response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
    	{
      	"role": "system",
      	"content": "You will be provided with unstructured data, and your task is to extract the Location, Event Title, Date, Time, Event Description and parse it into CSV format."
    	},
    	{
      	"role": "user",
      	"content": text
      }
      ],
      temperature=0.7,
      max_tokens=64,
      top_p=1
    )

    msg = response.choices[0].message
    print(msg.content)
    paragraph_dict[row['postUrl']] = msg.content
