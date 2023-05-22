import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const url = "https://free-proxy-list.net/";

const res = await fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  },
});
const text = await res.text();
const doc = new DOMParser().parseFromString(text, "text/html")!;
const rows = [...doc.querySelectorAll("tbody tr")];

let proxies = [];
for (let row of rows) {
  let cells = [...row.querySelectorAll("td")];
  if (cells.length >= 2) {
    proxies.push(`${cells[0].textContent}:${cells[1].textContent}`);
  }
}

if (proxies.length > 0) {
  const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
  console.log(`Random proxy: ${randomProxy}`);
} else {
  console.log("No proxies found.");
}
