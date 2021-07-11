async function update() {
  try {
    const interval = 10000; // 10 seconds
    const target = document.getElementById("content");
    target.innerHTML = await content();
    setTimeout(update, interval);
  } catch(error) {
    console.error(error);
  };
}

async function content() {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  const timestamp = `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  const data = await fetchData();
  console.log("data", data);
  // { safeLow: 2.05, standard: 3, fast: 5, fastest: 50, blockTime: 4, blockNumber: 16728302 }

  return `
  <h1>Hello, Sailor!</h1>
  <h2>Time: ${timestamp}</h2>

  <h3>Block number: ${data.blockNumber}</h3>
  <h3>Block time: ${data.blockTime}</h3>
  <h3>Safe low: ${data.safeLow}</h3>
  <h3>Standard: ${data.standard}</h3>
  <h3>Fast: ${data.fast}</h3>
  <h3>Fastest: ${data.fastest}</h3>
  `;
}

async function fetchData() {
  const url = "https://gasstation-mainnet.matic.network/";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

window.addEventListener('load', update);
