async function update() {
  const interval = 10000; // 10 seconds
  const target = document.getElementById("content");
  target.innerHTML = await content();
  setTimeout(update, interval);
}

async function content() {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  const timestamp = `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  return `
  <h1>Hello, Sailor!</h1>
  <h2>Time: ${timestamp}</h2>
  `;
}

window.addEventListener('load', update);
