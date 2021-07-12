async function update() {
  try {
    const interval = 5000; // 5 seconds
    const target = document.getElementById("content");
    target.innerHTML = await content();
    setTimeout(update, interval);
  } catch(error) {
    console.error(error);
  };
}

async function content() {
  const url = "https://gasstation-mainnet.matic.network/";
  const data = await fetchData(url);

  return `
      <div class="row row-cols-4 gap-3">
        ${safeLowCard(data.safeLow)}
        ${standardCard(data.standard)}
        ${fastCard(data.fast)}
        ${fastestCard(data.fastest)}
      </div>

      <div class="row row-cols-1">
        <div class="card text-dark bg-light mb-3" style="max-width: 36rem;">
          <div class="card-body">
            <table class="table">
              <tr>
                <td>Block number</td>
                <td>${data.blockNumber}</td>
              </tr>
              <tr>
                <td>Block time</td>
                <td>${data.blockTime}</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>${timestamp()}</td>
              </tr>
            </table>

            <p>
              <span class="fw-lighter">Data from:</span> <a href="${url}">${url}</a>
            </p>
          </div>
        </div>
  `;
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function standardCard(value) {
  return card({ bg: "primary", header: "Standard", value });
}

function safeLowCard(value) {
  return card({ bg: "success", header: "Safe low", value });
}

function fastCard(value) {
  return card({ bg: "warning", header: "Fast", value });
}

function fastestCard(value) {
  return card({ bg: "danger", header: "Fastest", value });
}

function card({ bg, header, value }) {
  return `
  <div class="card text-white bg-${bg} mb-3" style="max-width: 18rem;">
  <div class="card-header">${header}</div>
  <div class="card-body">
    <h5 class="card-title">${value}</h5>
  </div>
</div>
  `;
}

function timestamp() {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

window.addEventListener('load', update);
