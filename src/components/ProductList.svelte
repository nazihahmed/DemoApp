<script>
	import ProductItem from './ProductItem.svelte';
	import { page } from '$app/stores';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let products = [];
	export let count = 0;
	// Each page should display 10 products and users should be able to to move between
	// pages using pagination, the page number should be passed as a query parameter

	$: currentPage = $page?.url.searchParams.get('page')
		? Number.parseInt($page.url.searchParams.get('page')) - 1
		: 0;
	$: limit = $page?.url.searchParams.get('limit')
		? Number.parseInt($page.url.searchParams.get('limit'))
		: 10;

	let pageSettings;

	$: {
		pageSettings = {
			page: currentPage,
			limit: limit,
			size: count,
			amounts: [5, 10]
		};
		pageSettings = pageSettings;
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

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        controlSeparator="display-none"
		showNumerals
		showPreviousNextButtons={false}
		maxNumerals={2}
		justify="justify-center"
        active="bg-slate-400 border-slate-400"
        buttonClasses="!border !border-slate-400 !mx-1 rounded-xl !px-4 !py-2"
	/>
</div>
