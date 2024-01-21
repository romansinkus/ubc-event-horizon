# -*- coding: utf-8 -*-
"""
Created on Sat Jan 20 14:47:12 2024

@author: cherr
"""

import os
import sys
import pandas as pd
import json

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
isEvent = []

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
    isEvent.append(msg.content)
    
isEvent = ['FALSE','FALSE','TRUE','FALSE','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','FALSE','FALSE','TRUE','TRUE','TRUE','TRUE','TRUE','FALSE','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','FALSE','TRUE','TRUE','FALSE','TRUE','TRUE','FALSE','TRUE','TRUE','FALSE','TRUE','FALSE','TRUE','TRUE','TRUE','FALSE','TRUE','FALSE','TRUE','TRUE','FALSE','TRUE','TRUE','FALSE','TRUE','TRUE','TRUE','TRUE','TRUE','TRUE','FALSE','FALSE','TRUE']

urls_df['isEvent'] = pd.Series(isEvent)
urls_filtered = urls_df[urls_df['isEvent'] == 'TRUE'] 

#%%

listOfEvents = []

for i, row in urls_filtered.iterrows():
    if (i > 5):
        break
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
    event_info = msg.content.split('\n')
    event_dict = {}
    for info in event_info:
        key = info.split(':', 1)[0]
        value = info.split(':', 1)[1]
        event_dict[key] = value
    print(msg.content)
    print(event_dict)
    listOfEvents.append(event_dict)

#%%

# Convert and write JSON object to file
with open(".\sample_events.json", "w") as outfile: 
    json.dump(listOfEvents, outfile)