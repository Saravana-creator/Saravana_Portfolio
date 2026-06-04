async function run() {
  const payload = {
    name: "", // Empty name
    email: "not-an-email", // Invalid email
    subject: "", // Empty subject
    message: "" // Empty message
  };

  console.log('Sending invalid request to http://localhost:5000/api/contact ...');
  
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Body:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

run();
