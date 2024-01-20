# -*- coding: utf-8 -*-
"""
Created on Fri Jan 19 21:33:01 2024

@author: cherr
"""
import re 
import requests 
import pandas as pd

from bs4 import BeautifulSoup 

import os
import sys


s = requests.session()
login_url = "https://amscampusbase.ubc.ca/club_signup?view=all&"
req = s.get(login_url)
soup = BeautifulSoup(req.text,"html.parser")
ul_clubs = soup.find_all('ul', {"class": "list-group"})[0]
clubs = ul_clubs.find_all('li', {"class": "list-group-item"})


found_websites = []

for club in clubs:
    a_links = club.find_all("a")
    for a in a_links:
        if (a.text == 'Website'):
            print(a.text)
            found_websites.append(a)
#%%

found_websites_hrefs = list(map(lambda x : re.search('href=".+" style', str(x)).group(), found_websites))
found_websites_hrefs = list(map(lambda x : x[6: -7], found_websites_hrefs))
len(found_websites_hrefs)
found_websites_hrefs[0]

#%%
ig_links = []

for i in range(len(found_websites_hrefs)):
    try:
        site_url = found_websites_hrefs[i]
        s_req = s.get(site_url)
        site_soup = BeautifulSoup(s_req.text,"html.parser")
        s_a_tags = site_soup.find_all('a', href=True)
        for a_tag in s_a_tags:
            account_name = re.search('www\.instagram\.com\/.+\/', str(a_tag))
            if account_name:
                ig_links.append(account_name.group())
    except:
        print(site_url + ' failed')
        pass
#%%
len(ig_links)
ig_links[-2]

df = pd.DataFrame(ig_links)
df.to_csv('ig_urls_uncleaned.csv', index=False)
