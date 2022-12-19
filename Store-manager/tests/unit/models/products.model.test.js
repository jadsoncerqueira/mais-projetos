// const conn = require('../../../src/models/conection');
const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../../src/models/conection');
const { productsModel } = require('../../../src/models');
const { listAllProductsMock } = require('./mocks/products.model.mock');

describe('Camada Model', function () {
  it('Retorna lista de produtos', async function () {
    sinon.stub(conn, 'execute').resolves([listAllProductsMock])
    const response = await productsModel.findAll();
    expect(response).to.deep.equal(listAllProductsMock)
    sinon.restore();
  });
  it('Retorna produto especifico', async function () {
    sinon.stub(conn, 'execute').resolves([listAllProductsMock[0]])
    const response = await productsModel.findById(1);
    expect(response).to.deep.equal(listAllProductsMock[0])
    sinon.restore();
  });

});