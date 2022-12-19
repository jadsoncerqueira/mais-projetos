// const conn = require('../../../src/models/conection');
const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
// const chaiHttp = require('chai-http');
// const sinonChai = require('sinon-chai');
const { productsController  } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { listAllProductsMock } = require('./mocks/products.model.mock');
// const app = require('../../../src/app');

// chai.use(sinonChai);
// chai.use(chaiHttp);


describe('Camada Controller', function () {
  it('Retorna lista de produtos', async function () {
    const res = {};
    const req = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findAll').resolves({ type: null, message: listAllProductsMock })
    await productsController.getProducts(req, res)
    expect(res.status.calledWith(200)).to.be.eq(true);
    expect(res.json.calledWith(listAllProductsMock)).to.be.eq(true);
    sinon.restore();
  });
  it('Retorna produto especifico', async function () {
    const res = {};
    const req = { params: { id: 1 }}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves({ type: null, message: [listAllProductsMock[0]] })

    await productsController.getProductsById(req, res);
    expect(res.status.calledWith(200)).to.be.eq(true);
    expect(res.json.calledWith(listAllProductsMock[0])).to.be.eq(true)
    sinon.restore();
  });

  it('Retorna um erro ao buscar id inexistente', async function () {
    const res = {};
    const req = { params: { id: 6 } }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves({ type: 'PRODUCTS_NOT_FOUND', message: 'Product not found' })

    await productsController.getProductsById(req, res);
    expect(res.status.calledWith(404)).to.be.eq(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.eq(true)
    sinon.restore();
  });

});