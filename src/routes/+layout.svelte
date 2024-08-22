<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Login from '../components/Login.svelte';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="pageHeader">
		<!-- App Bar -->
		<AppBar background="bg-none" spacing="mx-auto container py-7">
			<svelte:fragment slot="lead">
					<h4 class="text-2xl font-semibold text-black"><span class="hidden sm:inline">PlanckMarket</span><span class="sm:hidden">PM</span></h4>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Login/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
