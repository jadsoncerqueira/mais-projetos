// const conn = require('../../../src/models/conection');
const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../../src/models/conection');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { listAllProductsMock } = require('./mocks/products.model.mock');

describe('Camada Service', function () {
  it('Retorna lista de produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(listAllProductsMock);
    const response = await productsService.findAll();
    expect(response).to.deep.equal({ type: null, message: listAllProductsMock })
    sinon.restore();
  });

  it('Retorna produto especifico', async function () {
    sinon.stub(productsModel, 'findAll').resolves([listAllProductsMock[0]]);
    const response = await productsService.findById(1);
    expect(response.message).to.deep.equal([listAllProductsMock[0]])
    sinon.restore();
  });

  it('Retorna um erro ao buscar id inexistente', async function () {
    sinon.stub(productsModel, 'findAll').resolves([]);
    const response = await productsService.findById(6);
    expect(response).to.deep.equal({ type: 'PRODUCTS_NOT_FOUND', message: 'Product not found' })
    sinon.restore();
  });

  it('Retorna um erro ao buscar id invalido', async function () {
    sinon.stub(productsModel, 'findAll').resolves({ type: 'INPUT_VALUE', message: '"id" inválido' });
    const response = await productsService.findById('g');
    expect(response).to.deep.equal({ type: 'INPUT_VALUE', message: '"id" inválido' })
    sinon.restore();
  });

});