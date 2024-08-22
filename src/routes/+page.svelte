<script>
	import { goto } from '$app/navigation';
	import ProductList from '../components/ProductList.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export let data;
	export let form;

	$: products = data.products;
	$: count = data.count;

	let wishlistOnly = $page?.url.searchParams.get('wishlist') ? 'checked' : null;
	$: wishlistOnly;

	const updateWishlist = () => {
		const url = new URL($page?.url);
		if (wishlistOnly) {
			url.searchParams.set('wishlist', true);
			url.searchParams.set('page', 1);
		} else {
			url.searchParams.delete('wishlist');
		}
		goto(url.toString());
	};

	$: {
		if (form?.error) {
			alert(form.error);
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center mb-5">
	<div class="space-y-10 text-center flex flex-col items-center">
		{#if data.profile}
			<input
				type="checkbox"
				id="wishlist"
				name="wishlist"
				bind:checked={wishlistOnly}
				on:change={updateWishlist}
			/>
			<label for="wishlist">Show only products from wishlist</label>
		{/if}

		<ProductList {products} {count} />
	</div>
</div>

<style lang="postcss">
</style>
