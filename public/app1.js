// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBx2WUSnbqeQ5OjBq6_isl_pwNxqJTD_s",
  authDomain: "raspstats.firebaseapp.com",
  databaseURL: "https://raspstats-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "raspstats",
  storageBucket: "raspstats.firebasestorage.app",
  messagingSenderId: "217400523144",
  appId: "1:217400523144:web:3e62e6ffed2a594bbaa23d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();
const ref = database.ref('temperature_data');

// Fetch data
ref.on('value', (snapshot) => {
  const data = snapshot.val();
  const tableBody = document.getElementById('dataTable');
  const chartLabels = [];
  const chartData = [];

  tableBody.innerHTML = ''; // Clear the table

  // Process data
  for (let key in data) {
    console.error("Test1");
    
    const entry = data[key];
    const row = document.createElement('tr');
    const timestampCell = document.createElement('td');
    const temperatureCell = document.createElement('td');

    timestampCell.textContent = entry.timestamp;
    temperatureCell.textContent = entry.temperature;

    row.appendChild(timestampCell);
    row.appendChild(temperatureCell);
    tableBody.appendChild(row);

    // Prepare data for the chart
    chartLabels.push(entry.timestamp);
    chartData.push(entry.temperature);
  }

  // Update chart
  updateChart(chartLabels, chartData);
});

// Create a Chart.js chart
const ctx = document.getElementById('temperatureChart').getContext('2d');
let temperatureChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature ("C)',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Timestamp' }
      },
      y: {
        title: { display: true, text: 'Temperature ("C)' },
        beginAtZero: false
      }
    }
  }
});

// Function to update chart
function updateChart(labels, data) {
  temperatureChart.data.labels = labels;
  temperatureChart.data.datasets[0].data = data;
  temperatureChart.update();
}
