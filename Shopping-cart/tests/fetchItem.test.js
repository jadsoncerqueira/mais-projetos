require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {

  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Teste se é chamada', () => {
    fetchItem("MLB1615760527")
    expect(fetch).toHaveBeenCalled();
  })

  it('usa o endpoint', () => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('usa o endpoint', async () => {
    expect(await fetchItem("MLB1615760527")).toEqual(item);
  });

  it('usa o endpoint', async () => {
    const expected = new Error('You must provide an url')
    expect(await fetchItem()).toEqual(expected);
  });
  // Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: 'You must provide an url'.
});
