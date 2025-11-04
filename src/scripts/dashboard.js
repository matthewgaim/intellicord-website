const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5500'
    : 'https://intellicord-api.senarado.com';

async function filesAllServers() {

  try {
    const res = await fetch(`${API_URL}/analytics/files-all-servers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    const file_details = data.file_details;
    const files_analyzed = data.files_analyzed;
    const total_messages_count = data.total_messages_count;
    let dates = files_analyzed.map((file) => file.date);
    let daily_file_amount = files_analyzed.map((file) => file.amount);
    
    const ctx = document.getElementById("myChart");
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Files Uploaded',
          data: daily_file_amount,
          borderWidth: 2,
          backgroundColor: 'rgb(0,0,0)',
          borderColor: 'rgb(239, 163, 0)',
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          legend: {
            labels: {
              color: '#1e293b',
              font: { size: 14 }
            }
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
    window.location.href = `/`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  filesAllServers();
});
