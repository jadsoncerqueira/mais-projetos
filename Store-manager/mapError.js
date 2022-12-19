const errorMap = {
  PRODUCTS_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INVALID_ID: 422,
  INVALID_QUANTITY: 422,
  INVALID_PRODUCT: 422,
  INVALID_NAME: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};