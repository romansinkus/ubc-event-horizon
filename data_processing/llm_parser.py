# -*- coding: utf-8 -*-
"""
Created on Sat Jan 20 14:47:12 2024

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

#%%
# LOAD DATA
path = os.path.join(os.path.dirname(__file__), "..\\data\scraped_ig_posts_partC.csv")
urls_df = pd.read_csv(path,  encoding='unicode_escape')




#%%
#filter out non-events
isEvent = []
for i, row in urls_df.iterrows():
    if i < 42:
        continue
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
#%%
isEvent = ['True',
 'True',
 'False',
 'True',
 'False',
 'True',
 'False',
 'True',
 'False',
 'False',
 'True',
 'True',
 'True',
 'True',
 'True',
 'True',
 'True',
 'True',
 'True',
 'True',
 'False',
 'True',
 'True',
 'True',
 'False',
 'True',
 'True',
 'True',
 'False',
 'False',
 'True',
 'True',
 'True',
 'False',
 'True',
 'True',
 'False',
 'True',
 'True',
 'True',
 'False',
 'True',
 'True',
 'True',
 'False',
 'True',
 'False',
 'False',
 'False',
 'True',
 'False',
 'False',
 'False',
 'True',
 'True',
 'False',
 'False',
 'False',
 'False',
 'True']
urls_df['isEvent'] = pd.Series(isEvent)
urls_filtered = urls_df[urls_df['isEvent'] == 'True'] 

#%%

prompt = 'You are an assistant that when provided with unstructured data in the form of a paragraph will extract information that can be categorized in the six categories as follows in the exact order: Location, Date, Start Time, End Time, Event Title, Event Description. For each category output a line in the following format: CategoryName: CategorizedInformation where CategoryName corresponds with one of Location, Date, Start Time, End Time, Event Title, Event Description, and CategorizedInformation is the categorized extracted information. Convert the extracted Date categroy to a format of monthNumber/dayNumber/yearNumber where monthNumber is between the integer values of 1 to 12, dayNumber  is between the integer values of 1 to 31, and yearNumber is 2024. Also convert the extracted Start Time and End Time into the standardized 24 hour clock of HH:MM where HH is the hour from 00 to 24 and MM is the minutes in an hour from 01 to 59'


start = time.time()
listOfEvents = {}

for i, row in urls_filtered.iterrows():
    text = row['description']
    
    response = client.chat.completions.create(
      model="gpt-3.5-turbo-1106",
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
      max_tokens=100,
      top_p=1
    )

    msg = response.choices[0].message
    print(msg.content)
    listOfEvents[row['postUrl']] = msg
    ##i ended at 22

end = time.time()
print(end - start)

#%%
#parse response into dict

listOfEvents_37 = listOfEvents
listOfEventObjects = []
errorEvents = {}

def make_into_24_hr(time_str):
    if (re.search(r'\d{2}:\d{2}$', time_str)):
        return time_str
    elif (re.match(r'\d{1}:\d{2}$', time_str)):
        return '0' + time_str
    elif (re.search('am', time_str.lower())):
        new_time = re.search('\d{2}:\d{2}', time_str)
        if new_time:
            return new_time.group()
        elif (re.search('\d{2}:\d{2}', time_str)):
            return re.search('\d{2}:\d{2}', time_str).group()
        else:
            return ''
    elif (re.search('pm', time_str.lower())):
        hour = re.search('\d{2}:', time_str)
        minutes = re.search(':\d{2}', time_str)
        if hour and minutes:
            new_hour = int(hour.group().replace(':', '')) + 12
            new_time = str(new_hour) + minutes.group()
        else:
            return ''
    else:
        return ''
        

for key, value in listOfEvents.items():
    try:
        event_object = {}
        event_info = value.content.split('\n')
        username = urls_df[urls_df['postUrl'] == key ].iloc[0]['username']
        event_object['ig_username'] = username
        for info in event_info:
            key_val = info.split(': ', 1)
            if len(key_val) == 2:
                
                if (key_val[0] == 'Start Time' or key_val[0] == 'End Time'):
                    key_val[1] = make_into_24_hr(key_val[1])
                    
                event_object[key_val[0]] = key_val[1]
        
        listOfEventObjects.append(event_object)
        
    except Exception as e:
        print(e)
        print(key)
        print(value)
        errorEvents[key] = value
        print('---------------')


#%%
#filter json for duplicates

event_set = set([])
listOfEventObject_no_dup = []

for obj in listOfEventObjects:
    if ('Event Title' in obj) and ('ig_username' in obj):
        hashname = str(obj['Event Title']) + str(obj['ig_username'])
        if hashname in event_set:
            continue
        event_set.add(hashname)
    listOfEventObject_no_dup.append(obj)

#%%
# Convert and write JSON object to file
with open("events_20240121_eventsB_36events.json", "w") as outfile: 
    json.dump(listOfEventObject_no_dup, outfile)
    

    