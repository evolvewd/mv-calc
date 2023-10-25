document.getElementById("generatePanelSelectors").addEventListener("click", generatePanelSelectors);
document.getElementById("calculateSize").addEventListener("click", calculateSize);

function generatePanelSelectors() {
  const panelCount = parseInt(document.getElementById("panel-count").value);
  const panelTypeSelectors = document.getElementById("panel-type-selectors");

  panelTypeSelectors.innerHTML = ""; // Cancella eventuali selezioni precedenti

  for (let i = 1; i <= panelCount; i++) {
    const panelSelector = document.createElement("div");
    panelSelector.innerHTML = `


  
    <div class="relative my-4">
      <label for="tipo-${i}" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Pannello ${i}:</label>
      <select id="tipo-${i}" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600">
        <option value="elegance">Elegance</option>
        <option value="pro">Pro</option>
      </select>
    </div>
    <div class="relative my-4">
      <label for="taglia-${i}" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Formato ${i}:</label>
      <select id="taglia-${i}" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600">
        <option value="A4">A4</option>
        <option value="A3">A3</option>
      </select>
    </div>
    <div class="relative my-4">
      <label for="orientamento-${i}" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Orientamento ${i}:</label>
      <select id="orientamento-${i}" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600">
        <option value="h">Orizzontale</option>
        <option value="v">Verticale</option>
      </select>
    </div>


    `;
    panelTypeSelectors.appendChild(panelSelector);
  }
}

function calculateSize() {
  const panelCount = parseInt(document.getElementById("panel-count").value);
  const tipo = document.querySelectorAll('[id^="tipo-"]');
  const taglia = document.querySelectorAll('[id^="taglia-"]');
  const orientamento = document.querySelectorAll('[id^="orientamento-"]');
  const glassSize = parseInt(document.getElementById("glass-size").value) * 10;

  const json = {
    elegance: {
      A4: {
        h: {
          l: 369,
        },
        v: {
          l: 21,
        },
      },
      A3: {
        h: {
          l: 300,
        },
        v: {
          l: 369,
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

  const decimale = 1;
  const totalGlassSize = (glassSize - totalPanelSize) / 10;
  const gap = totalGlassSize / (panelCount + 1) / 10;
  const centroVetro = glassSize / 20;
  const gapArr = gap.toFixed(decimale);

  document.getElementById("meta").innerHTML = `Centro Vetrina: ${centroVetro} cm`;

  if (totalGlassSize > 0) {
    document.getElementById("ingombro").innerHTML = `Spazio rimanente: ${totalGlassSize} cm`;
    document.getElementById("gap").innerHTML = `Distanza tra pannelli: ${gapArr} cm`;
  } else {
    document.getElementById("ingombro").innerHTML = "La misura del vetro non è sufficiente per i pannelli selezionati.";
    document.getElementById("gap").innerHTML = "";
  }
}
