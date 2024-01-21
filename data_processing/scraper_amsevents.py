# import requests
# from bs4 import BeautifulSoup

# url = 'https://www.ams.ubc.ca/events/'

# # Send a GET request to the website
# response = requests.get(url)

# # Check if the request was successful
# if response.status_code == 200:
#     # Parse the HTML content
#     soup = BeautifulSoup(response.content, 'html.parser')
#     print(soup);
    
#     # Assuming events are contained in elements with a specific class
#     # You'll need to update the selector based on the actual structure of the webpage
#     events = soup.find_all(class_='event-class-name')

#     for event in events:
#         # Extract event details - update these based on the actual structure of the event elements
#         title = event.find('h2').get_text() if event.find('h2') else 'No Title'
#         date = event.find(class_='date-class-name').get_text() if event.find(class_='date-class-name') else 'No Date'
#         location = event.find(class_='location-class-name').get_text() if event.find(class_='location-class-name') else 'No Location'

#         print(f"Title: {title}, Date: {date}, Location: {location}")
# else:
#     print(f"Failed to retrieve content: Status code {response.status_code}")

# tribe-events-calendar-list__event-title tribe-common-h6 tribe-common-h4--min-medium
