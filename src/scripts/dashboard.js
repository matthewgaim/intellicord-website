window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myChart");
  if (!ctx) return;
    console.log(document.cookie);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Files Uploaded',
        data: [12, 19, 3, 5, 2, 3, 8],
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
});
