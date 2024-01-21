document.addEventListener('DOMContentLoaded', function () {
  console.log("test");
  fetch('http://localhost:3000/api/events')
      .then(response => {
        console.log("test3")
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(events => {
        console.log("got back to frontend")
          const eventsDiv = document.getElementById('events');
          // Convert the JSON object to a string and display it
          eventsDiv.textContent = JSON.stringify(events, null, 2); // Pretty print the JSON
      })
      .catch(error => {
          console.error('Fetch error:', error);
          document.getElementById('events').textContent = 'Failed to load events.';
      });
});
