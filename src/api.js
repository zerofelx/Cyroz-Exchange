const url = 'https://api.coincap.io/v2';

function GetAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then(rest => rest.json())
    .then(rest => rest.data);
}

function GetAsset(id) {
  return fetch(`${url}/assets/${id}`)
    .then(rest => rest.json())
    .then(rest => rest.data);
}

function GetAssetHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();

  return fetch(
    `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  )
    .then(rest => rest.json())
    .then(rest => rest.data);
}

function GetMarkets(coin) {
  return fetch(`${url}/assets/${coin}/markets?limit=8`)
    .then(res => res.json())
    .then(res => res.data);
}

function GetExchange(id) {
  return fetch(`${url}/exchanges/${id}`)
    .then(res => res.json())
    .then(res => res.data);
}

export default {
  GetAssets,
  GetAsset,
  GetAssetHistory,
  GetMarkets,
  GetExchange
};
