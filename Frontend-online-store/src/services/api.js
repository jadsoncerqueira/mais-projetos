export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const fetchUrl = await fetch(url);
  const response = await fetchUrl.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const fetchUrl = await fetch(url);
  const response = await fetchUrl.json();
  return response;
}
