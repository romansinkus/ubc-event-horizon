# -*- coding: utf-8 -*-
"""
Created on Sat Jan 20 14:47:12 2024

@author: cherr
"""

import os
import sys
import pandas as pd
import time
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

prompt = 'You are an assistant that when provided with unstructured data in the form of a paragraph will extract information that can be categorized in the six categories as follows in the exact order: Location, Date, Start Time, End Time, Event Title, Event Description. For each category output a line in the following format: CategoryName: CategorizedInformation where CategoryName corresponds with one of Location, Date, Start Time, End Time, Event Title, Event Description, and CategorizedInformation is the categorized extracted information.'
start = time.time()
listOfEvents = {}

for i, row in urls_filtered.iterrows():
    text = row['description']
    
    response = client.chat.completions.create(
      model="gpt-3.5-turbo-0613",
      messages=[
    	{
      	"role": "system",
      	"content": prompt
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
    listOfEvents[row['postUrl']] = msg
    
    ##i ended at 22

end = time.time()
print(end - start)
#%%
listOfEventObjects = {}
errorEvents = {}

for key, value in listOfEvents.items():
    try:
        username_key = urls_df[urls_df['postUrl'] == key ]['username']
        event_info = value.content.split('\n')
        event_object = {}
        for info in event_info:
            key_val = info.split(':', 1)
            if len(key_val) == 2:
                event_object[key_val[0]] = key_val[1]
            else:
                errorEvents[key] = value
            
        listOfEventObjects[username_key] = event_object
        
    except:
        print(key)
        print(value)
        print('---------------')


#%%

# Convert and write JSON object to file
with open("events_20240120_test4_43events.json", "w") as outfile: 
    json.dump(listOfEventObjects, outfile)
    
    