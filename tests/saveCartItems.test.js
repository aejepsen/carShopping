const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('verifica se ao executar saveCartItems("<ol><li>Item</li></ol>"), o método localStorage.setItem é chamado', () => {
    saveCartItems('cartItems', "<ol><li>Item</li></ol>");
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('verifica se ao executar saveCartItems("<ol><li>Item</li></ol>", o método localStorage.setItem é chamado com dois parâmetros (cartItems e o parametro de SaveCartItems)', () => {
    saveCartItems('cartItems', "<ol><li>Item</li></ol>");
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
