<script>
	export let product = {};
	/*
    Sample product: 
    {
        "id": "65c4c19c176304fe76c71868",
        "price": 3054.52,
        "picture": "http://placehold.it/128x128",
        "title": "Bugsall",
        "description": "Eiusmod duis sint dolore commodo do qui nulla laboris commodo esse minim. Culpa adipisicing proident minim Lorem. Sint tempor cupidatat minim laborum nulla sint laboris veniam irure dolore. Nostrud cupidatat sit mollit qui consectetur consequat est ea sint eu ex aliqua incididunt. Non reprehenderit pariatur duis reprehenderit enim cillum nostrud labore dolore sint occaecat voluptate aliqua officia. Ex pariatur enim voluptate quis anim non minim irure cupidatat nulla elit ipsum ut.\r\n"
    }
    */
</script>

<div class="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between text-left">
	<div class="flex flex-col">
		<img src={product.picture} alt={product.title} class="w-full h-64 object-cover rounded-lg" />
		<h2 class="text-lg text-black font-semibold mt-4">{product.title}</h2>

		<p class="text-sm text-gray-600 mt-4">{product.description}</p>
		
	</div>
    <p class="text-sm text-gray-500 mt-4">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            product.price
        )}
    </p>
</div>
