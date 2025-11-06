const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5500'
    : 'https://intellicord-api.senarado.com';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`
}

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
    
    const chartId = document.getElementById("files-uploaded-chart");
    if (!chartId) return;

    new Chart(chartId, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Files Uploaded',
          data: daily_file_amount,
          borderWidth: 2,
          borderColor: 'rgb(239, 163, 0)',
          tension: 0.4,
          pointBackgroundColor: 'rgb(239, 163, 0)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(239, 163, 0)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: { color: 'rgb(30 41 59)' },
            grid: { color: 'rgba(226, 232, 240, 0.4)' },
          },
          y: { 
            beginAtZero: true,
            ticks: { color: 'rgb(30 41 59)' },
            grid: { color: 'rgba(226, 232, 240, 0.4)' },
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgb(30 41 59)',
              font: { size: 14 }
            }
          }
        }
      }
    });
    
    // show file details
    let table = document.getElementById("file-details-table-body");
    for (let i = 0; i < file_details.length; i++) {
      const newRow = document.createElement("tr");
      newRow.setAttribute("scope", "row");
      newRow.setAttribute("class", "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200");
      const rowContent = `
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${file_details[i].name}</td>
        <td class="px-6 py-4">${file_details[i].type}</td>
        <td class="px-6 py-4">${formatBytes(file_details[i].size)}</td>
        <td class="px-6 py-4">${file_details[i].analyzed_date}</td>
        <td class="px-6 py-4 text-right">
          <a href="https://discord.com/channels/${file_details[i].discord_server_id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Open</a>
        </td>
      `;

      newRow.innerHTML = rowContent;
      table.appendChild(newRow);
    }
  } catch (err) {
    console.error(err);
    window.location.href = `/`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  filesAllServers();
});
