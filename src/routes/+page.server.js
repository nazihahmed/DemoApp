import { getProductsForPage } from '../lib/productUtils.js';
import users from '$lib/data/users.json';
import jwt from 'jsonwebtoken';
import { fail } from '@sveltejs/kit';

const SECRET_KEY = 'planck-super-secret-base';

export const load = async ({ url, cookies }) => {
	const token = cookies.get('session');
	let profile = null;
	if (token) {
		try {
			profile = jwt.verify(token, SECRET_KEY);
		} catch (err) {
			console.error('Invalid token', err);
		}
	}

	const showWishlistOnly = url.searchParams.get('wishlist');
	const currentPage = parseInt(url.searchParams.get('page') ?? '1');
	const currentLimit = parseInt(url.searchParams.get('limit') ?? '10');

	const { products, count } = getProductsForPage(
		currentPage,
		currentLimit,
		profile?.wishlist,
		showWishlistOnly
	);

	return {
		products,
		count,
		profile
	};
};

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		// check if user and password match one from users.json
		const user = users.find((u) => u.username === username && u.password === password);

		if (!user) {
			return fail(401, { error: 'Invalid usernmae or password' });
		}
		const { name, wishlist } = user;

		// Generate a JWT
		const token = jwt.sign({ username: user.username, name, wishlist }, SECRET_KEY, {
			expiresIn: '1d'
		});

		// Set the JWT as a cookie
		cookies.set('session', token, {
			httpOnly: true, // Ensure the cookie is only accessible via HTTPS
			sameSite: 'strict', // Prevent CSRF attacks
			path: '/', // Make the cookie available on all routes
			maxAge: 60 * 60 * 24 // 1 day
		});

		return { success: true };
	},
	logout: async ({ cookies }) => {
		// Clear the session cookie
		cookies.delete('session', { path: '/' });
		return { success: true };
	}
};
