// import fetch from 'node-fetch'
const fetchItem = (produto) => 
  fetch(`https://api.mercadolibre.com/items/${produto}`)
  .then((res) => res.json())
  .catch((err) => err);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}