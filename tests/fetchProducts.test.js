require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('verifica se fetchProducts() é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('verifica se fetch foi chamada ao executar fetchProducts(`computador`)', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('verifica se fetch foi chamada com a url esperada', async () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('verifica se o retorno da função fetchProducts("computador"), é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const response = await fetchProducts('computador');
    expect(response).toMatchObject(computadorSearch);
  });

  it('verifica se ao chamar fetchProducts(), retorna um erro com a mensagem "You must provide an url"', async () => {
    const fail = await fetchProducts();
    expect(fail).toEqual(new Error('You must provide an url'));
  });
  
});
