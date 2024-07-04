// Fungsi untuk memuat dan menampilkan CSV
async function loadAndDisplayCsv(url) {
    const apiUrl = `/api${url.split('https://firebasestorage.googleapis.com')[1]}`;
    const response = await fetch(apiUrl);
    const csvText = await response.text();
    displayCsvAsTable(csvText);
}

// Memuat data saat dokumen siap
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/files').then(response => response.json())
        .then(data => {
            const fileList = document.getElementById('fileList');
            data.forEach(file => {
                const listItem = document.createElement('li');
                listItem.textContent = file.name;
                listItem.onclick = () => loadAndDisplayCsv(file.url);
                fileList.appendChild(listItem);
            });
        }).catch(error => {
            console.error('Failed to load files:', error);
        });
});

function displayCsvAsTable(csvText) {
    const lines = csvText.split('\n');
    const table = document.createElement('table');
    lines.forEach((line, index) => {
        const row = document.createElement('tr');
        const cells = line.split(',');
        cells.forEach(cell => {
            const cellElement = index === 0 ? document.createElement('th') : document.createElement('td');
            cellElement.textContent = cell.trim();
            row.appendChild(cellElement);
        });
        table.appendChild(row);
    });
    const container = document.getElementById('csvTableContainer');
    container.innerHTML = ''; // Clear previous tables
    container.appendChild(table);
}
