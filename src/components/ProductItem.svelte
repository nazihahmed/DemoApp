<script>
	export let product = {};
</script>

<div
	class="bg-white rounded-lg p-4 flex gap-2 flex-col justify-between text-left
        {product.isWished && 'outline-2 outline outline-gray-300'}"
>
	<div class="flex flex-col gap-2">
		<img src={product.picture} alt={product.title} class="w-full h-40 object-cover rounded-lg" />
		<h2 class="text-lg text-black font-semibold">
			{product.title}
		</h2>
		<p class="text-sm text-gray-500 line-clamp-3">
			{product.description}
		</p>
	</div>
	<p class="text-lg font-medium text-gray-900">
		{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
	</p>
</div>
