// the list of products should be improted from the data/products.json file
import products from '$lib/data/products.json';

export const getProductsForPage = (page, pageSize = 10, itemsInWishlist, wishlistOnly) => {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	let filteredProducts = products.map((product) => ({
		...product,
		isWished: itemsInWishlist?.includes(product.id)
	}));
	if (wishlistOnly) {
		filteredProducts = filteredProducts.filter(({ isWished }) => isWished);
	}
	return { products: filteredProducts.slice(start, end), count: filteredProducts.length };
};
