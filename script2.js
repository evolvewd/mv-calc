document.getElementById("generatePanelSelectors").addEventListener("click", generatePanelSelectors);
document.getElementById("calculateSize").addEventListener("click", calculateSize);

function generatePanelSelectors() {
  const panelCount = parseInt(document.getElementById("panel-count").value);
  const panelTypeSelectors = document.getElementById("panel-type-selectors");

  panelTypeSelectors.innerHTML = ""; // Cancella eventuali selezioni precedenti

  for (let i = 1; i <= panelCount; i++) {
    const panelSelector = document.createElement("div");
    panelSelector.innerHTML = `
      <label for="tipo-${i}" class="block text-sm font-medium">Pannello ${i}:</label>
      <select id="tipo-${i}" class="w-full py-2 px-3 mb-4 border rounded bg-gray-900 text-white">
        <option value="elegance">Elegance</option>
        <option value="pro">Pro</option>
      </select>
      <label for="taglia-${i}" class="block text-sm font-medium">Formato ${i}:</label>
      <select id="taglia-${i}" class="w-full py-2 px-3 mb-4  border rounded bg-gray-900 text-white">
        <option value="A4">A4</option>
        <option value="A3">A3</option>
      </select>
      <label for="orientamento-${i}" class="block text-sm font-medium">Orientamento del Pannello ${i}:</label>
      <select id="orientamento-${i}" class="w-full py-2 px-3 mb-4 border rounded bg-gray-900 text-white">
        <option value="h">Orizzontale (h)</option>
        <option value="v">Verticale (v)</option>
      </select>
    `;
    panelTypeSelectors.appendChild(panelSelector);
  }
}

function calculateSize() {
  const panelCount = parseInt(document.getElementById("panel-count").value);
  const tipo = document.querySelectorAll('[id^="tipo-"]');
  const taglia = document.querySelectorAll('[id^="taglia-"]');
  const orientamento = document.querySelectorAll('[id^="orientamento-"]');
  const glassSize = parseInt(document.getElementById("glass-size").value);

  const json = {
    elegance: {
      A4: {
        h: {
          l: 200,
        },
        v: {
          l: 100,
        },
      },
      A3: {
        h: {
          l: 300,
        },
        v: {
          l: 200,
        },
      },
    },
    pro: {
      A4: {
        h: {
          l: 150,
        },
        v: {
          l: 50,
        },
      },
      A3: {
        h: {
          l: 250,
        },
        v: {
          l: 150,
        },
      },
    },
  };

  let totalPanelSize = 0;

  for (let i = 0; i < panelCount; i++) {
    const selectedPanelType = tipo[i].value;
    console.log(selectedPanelType);
    const selectedPaperSize = taglia[i].value;
    console.log(selectedPaperSize);
    const selectedPanelOrientation = orientamento[i].value;
    console.log(selectedPanelOrientation);

    totalPanelSize += json[selectedPanelType][selectedPaperSize][selectedPanelOrientation].l;
    console.log(totalPanelSize);
  }

  const totalGlassSize = glassSize - totalPanelSize;
  const gap = Math.round(totalGlassSize / (panelCount + 1));
  const centroVetro = glassSize / 2;

  document.getElementById("meta").innerHTML = `Centro Vetrina: ${centroVetro} mm`;

  if (totalGlassSize > 0) {
    document.getElementById("ingombro").innerHTML = `Spazio rimanente: ${totalGlassSize} mm`;
    document.getElementById("gap").innerHTML = `Distanza tra pannelli: ${gap} mm`;
  } else {
    document.getElementById("ingombro").innerHTML = "La misura del vetro non è sufficiente per i pannelli selezionati.";
    document.getElementById("gap").innerHTML = "";
  }
}
