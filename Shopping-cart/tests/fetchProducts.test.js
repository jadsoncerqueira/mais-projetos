require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => { //should i use async? 
  
  try {
    it('é uma função', () => {
      expect(typeof fetchProducts).toBe('function');
    });
    it("é chamada", () => {
      fetchProducts("computador");
      expect(fetch).toHaveBeenCalled();
    });
    it('usa o endpoint', () => {
      const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
      fetchProducts('computador');
      expect(fetch).toHaveBeenCalledWith(endpoint);
    });
    it('retorna o valor correto', async () => {
      const results = await fetchProducts('computador');
      expect(results).toEqual(computadorSearch);
    });
    it('retorna erro sem parametro', async () => {
      const expected = new Error('You must provide an url');
      const results = await fetchProducts();
      expect(results).toEqual(expected);
    });
  } catch (error) {
    console.log(`Sorry, has been an error: ${error}`)
  }

});

// "globals": {
//   "window": {}
// }