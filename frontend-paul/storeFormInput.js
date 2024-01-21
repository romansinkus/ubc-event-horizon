document.getElementById('eventForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = {
      title: document.getElementById('title').value,
      location: document.getElementById('location').value,
      date: document.getElementById('date').value,
      startTime: document.getElementById('startTime').value,
      endTime: document.getElementById('endTime').value,
      description: document.getElementById('description').value,
      clubName: document.getElementById('clubName').value,
      insta: document.getElementById('insta').value
  };

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
