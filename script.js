document.getElementById("calculateSize").addEventListener("click", calculateSize);

function calculateSize() {
  const panelType = document.getElementById("panel-type").value;
  const paperSize = document.getElementById("paper-size").value;
  const glassSize = parseInt(document.getElementById("glass-size").value); // Ottieni la misura del vetro e convertila in un numero
  const panelOrientation = document.getElementById("panel-orientation").value; // Ottieni l'orientamento selezionato
  const panelCount = parseInt(document.getElementById("panel-count").value); // Ottieni il numero di pannelli

  const json = {
    elegance: {
      A4: {
        h: {
          l: 369,
        },
        v: {
          l: 297,
        },
      },
      A3: {
        h: {
          l: 297,
        },
        v: {
          l: 420,
        },
      },
    },
    pro: {
      A4: {
        h: {
          l: 210,
        },
        v: {
          l: 297,
        },
      },
      A3: {
        h: {
          l: 297,
        },
        v: {
          l: 420,
        },
      },
    },
  };

  const panelSize = json[panelType][paperSize][panelOrientation].l; // Ottieni il valore "l" corrispondente all'orientamento del pannello

  const totalPanelSize = panelSize * panelCount; // Calcola la dimensione totale dei pannelli
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
