function calcularTilt() {
    const y = parseFloat(document.getElementById('y').value);
    const xu = parseFloat(document.getElementById('xu').value);
    const vbm = parseFloat(document.getElementById('vbm').value);

    if (isNaN(y) || isNaN(xu) || isNaN(vbm) || y <= 0 || xu <= 0 || vbm <= 0) {
        alert("Por favor, ingresa valores válidos para Y, Xu y VBM.");
        return;
    }

    const tetaM = Math.atan(y / xu) * (180 / Math.PI);
    const tetaU = tetaM - (vbm / 2);
    const tetaL = tetaM + (vbm / 2);

    document.getElementById('tetaM').innerText = tetaM.toFixed(2);
    document.getElementById('tetaU').innerText = tetaU.toFixed(2);
    document.getElementById('tetaL').innerText = tetaL.toFixed(2);
}

function calcularXu() {
    const y = parseFloat(document.getElementById('y2').value);
    const tetaM = parseFloat(document.getElementById('tetaM2').value);

    if (isNaN(y) || isNaN(tetaM) || y <= 0 || tetaM <= 0) {
        alert("Por favor, ingresa valores válidos para Y y Teta M.");
        return;
    }

    const tetaMRad = tetaM * (Math.PI / 180);
    const xu = y / Math.tan(tetaMRad);

    document.getElementById('xuResult').innerText = xu.toFixed(2);
}

function loadCSV(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("Por favor selecciona un archivo CSV.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        parseCSV(text);
    };
    reader.readAsText(file);
}
/*
let antennaData = [];

function parseCSV(data) {
    const lines = data.split("\n");
    const headers = lines[0].split(",");

    antennaData = lines.slice(1).map(line => {
        const values = line.split(",");
        const entry = {};
        headers.forEach((header, index) => {
            entry[header.trim()] = values[index].trim();
        });
        return entry;
    });
    alert("Archivo CSV cargado correctamente.");
}

function filterAntennaData() {
    const model = document.getElementById('model').value;
    const band = document.getElementById('band').value;

    if (!model || !band) {
        alert("Por favor, selecciona un modelo y una banda.");
        return;
    }

    const filteredData = antennaData.filter(item => item.Modelo === model && item.Banda === band);
    displayFilteredData(filteredData);
}

function displayFilteredData(data) {
    const resultContainer = document.getElementById('antennaResults');
    resultContainer.innerHTML = ""; // Clear previous results

    if (data.length === 0) {
        resultContainer.innerHTML = "<p>No se encontraron resultados para el modelo y banda seleccionados.</p>";
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table rows
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultContainer.appendChild(table);
}*/


let antennaData = [];

// Cargar y procesar archivo Excel
function loadExcel(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("Por favor selecciona un archivo Excel (.xlsx).");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Leer la primera hoja
        const sheet = workbook.Sheets[sheetName];
        antennaData = XLSX.utils.sheet_to_json(sheet); // Convertir a JSON
        alert("Archivo Excel cargado correctamente.");
    };
    reader.readAsArrayBuffer(file);
}

// Filtrar datos de antena por modelo
function filterAntennaData() {
    const model = document.getElementById('model').value.trim();

    if (!model) {
        alert("Por favor, ingresa un modelo.");
        return;
    }

    const filteredData = antennaData.filter(item => item.Modelo === model);
    displayFilteredData(filteredData);
}

// Mostrar datos filtrados
function displayFilteredData(data) {
    const resultContainer = document.getElementById('antennaResults');
    resultContainer.innerHTML = ""; // Limpiar resultados anteriores

    if (data.length === 0) {
        resultContainer.innerHTML = "<p>No se encontraron resultados para el modelo seleccionado.</p>";
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Crear encabezados de tabla
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Crear filas de tabla
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultContainer.appendChild(table);
}
