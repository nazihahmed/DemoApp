import { getProductsForPage } from '../lib/productUtils.js';
import users from '$lib/data/users.json';
import jwt from '@tsndr/cloudflare-worker-jwt';
import { fail, redirect } from '@sveltejs/kit';

// TODO: Move this to a more secure location
const SECRET_KEY = '62tEHLKWt*W2fX%AriLF9F4z7auDDf';

export const load = async ({ url, cookies }) => {
	const token = cookies.get('session');
	let profile = null;
	if (token) {
		try {
			const isValid = await jwt.verify(token, SECRET_KEY);
			if(isValid) {
				profile = jwt.decode(token).payload;
			}
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
		const token = await jwt.sign(
			{
				username: user.username,
				name,
				wishlist,
				exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60) // now + 24 hours
			},
			SECRET_KEY
		);

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

		throw redirect(303, '/');
	}
};
