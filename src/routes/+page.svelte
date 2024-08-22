<script>
	import { goto } from '$app/navigation';
	import ProductList from '../components/ProductList.svelte';
	import { page } from '$app/stores';

	export let data;
	export let form;

	// Reactive declarations
	$: products = data.products;
	$: count = data.count;

	// Wishlist filter state
	let wishlistOnly = $page?.url.searchParams.get('wishlist') ? 'checked' : null;
	$: wishlistOnly;


	const updateWishlistInUrl = () => {
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

<svelte:head>
	<title>PlanckMarket</title>
	<meta name="description" content="PlanckMarket" />
</svelte:head>

<div class="container h-full mx-auto flex justify-center pb-10 px-4">
	<div class="flex flex-col gap-6">
		{#if data.profile}
			<label class="flex items-center space-x-2">
				<input
					type="checkbox"
					id="wishlist"
					name="wishlist"
					class="checkbox"
					bind:checked={wishlistOnly}
					on:change={updateWishlistInUrl}
				/>
				<p class="text-slate-600">Show only products from wishlist</p>
			</label>
		{/if}

		<ProductList {products} {count} />
	</div>
</div>
