require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('verifica se fetchItem() é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('verifica se fetch foi chamada ao executar fetchItem(`MLB1615760527`)', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('verifica se fetch foi chamada com a url esperada', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('verifica se o retorno da função fetchItem("MLB1615760527"), é uma estrutura de dados igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toMatchObject(item);
  });

  it('verifica se ao chamar fetchItem(), retorna um erro com a mensagem "You must provide an url"', async () => {
    const fail = await fetchItem();
    expect(fail).toEqual(new Error('You must provide an url'));
  });
});
