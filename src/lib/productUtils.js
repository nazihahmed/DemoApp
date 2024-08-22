// the list of products should be improted from the data/products.json file
import products from '$lib/data/products.json';

export const getProductsForPage = (page, pageSize = 10, wishlistFilter) => {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	let filteredProducts = products;
	if (wishlistFilter) {
		filteredProducts = products.filter((product) => wishlistFilter.includes(product.id));
	}
	return { products: filteredProducts.slice(start, end), count: filteredProducts.length };
};
