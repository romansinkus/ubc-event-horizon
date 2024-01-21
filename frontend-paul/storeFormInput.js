document.getElementById('eventForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = {
      'Event Title': document.getElementById('title').value,
      Location: document.getElementById('location').value,
      Date: new Date(document.getElementById('date').value),
      'Start Time': document.getElementById('startTime').value,
      'End Time': document.getElementById('endTime').value,
      'Event Description': document.getElementById('description').value,
      clubName: document.getElementById('clubName').value,
      ig_username: document.getElementById('insta').value
  };

  console.log(formData);

  fetch('http://localhost:3000/api/storeForm', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('submissionStatus').textContent = 'Event submitted successfully!';
  })
  .catch((error) => {
      console.error('Error:', error);
      document.getElementById('submissionStatus').textContent = 'Failed to submit event.';
  });
  document.getElementById('eventForm').reset();
});
