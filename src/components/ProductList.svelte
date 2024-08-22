<script>
	import ProductItem from './ProductItem.svelte';
	import { page } from '$app/stores';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	// receive products and count from parent component
	export let products = [];
	export let count = 0;

	$: currentPage = $page?.url.searchParams.get('page')
		? Number.parseInt($page.url.searchParams.get('page')) - 1
		: 0;

	$: limit = $page?.url.searchParams.get('limit')
		? Number.parseInt($page.url.searchParams.get('limit'))
		: 10;

	// Variable to hold pagination settings
	let pageSettings;

	// Reactive statement to update page settings whenever currentPage, limit, or count changes
	$: {
		pageSettings = {
			page: currentPage,
			limit: limit,
			size: count,
			amounts: [10] // Options for items per page
		};
		pageSettings = pageSettings; // Ensuring reactivity
	}

	function setCurrentPageParams(pageNumber, limit) {
		const url = new URL($page?.url);
		url.searchParams.set('page', pageNumber);
		if (limit) {
			url.searchParams.set('limit', limit);
		}
		goto(url.toString());
	}

	async function onPageChange(e) {
		setCurrentPageParams((e.detail + 1).toString());
	}

	function onAmountChange(e) {
		// reset the current page as we don't guarantee it exists with the new limit
		setCurrentPageParams(1, e.detail.toString());
	}
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
	{#each products as product}
		<ProductItem {product} />
	{/each}
</div>

<div class="w-full">
	<Paginator
		bind:settings={pageSettings}
		on:page={onPageChange}
		on:amount={onAmountChange}
		controlVariant=""
		showNumerals
		showPreviousNextButtons={false}
		maxNumerals={2}
		justify="justify-center"
		active="customPaginatorButton--active"
		buttonClasses="customPaginatorButton"
	/>
</div>
