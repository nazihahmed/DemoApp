import products from '$lib/data/products.json';

/**
 * Retrieves a paginated list of products, with optional filtering for wishlist items.
 *
 * @param {number} page - The current page number.
 * @param {number} [pageSize=10] - The number of products per page. Defaults to 10.
 * @param {Array<number>} itemsInWishlist - An array of product IDs that are in the wishlist.
 * @param {boolean} wishlistOnly - If true, only products in the wishlist are returned.
 * @returns {Object} An object containing the paginated products and the total count of filtered products.
 */
export const getProductsForPage = (page, pageSize = 10, itemsInWishlist, wishlistOnly) => {
	// Calculate the starting index for the current page
	const start = (page - 1) * pageSize;
	// Calculate the ending index for the current page
	const end = start + pageSize;

	// Map through the products and add an 'isWished' property to each product
	let filteredProducts = products.map((product) => ({
		...product,
		isWished: itemsInWishlist?.includes(product.id)
	}));

	if (wishlistOnly) {
		filteredProducts = filteredProducts.filter(({ isWished }) => isWished);
	}

	return { products: filteredProducts.slice(start, end), count: filteredProducts.length };
};
