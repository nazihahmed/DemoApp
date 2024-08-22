<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	$: userProfile = $page.data?.profile;
</script>

<form method="POST" use:enhance action="?/login">
	<div class="flex gap-3 items-center">
		{#if userProfile}
			<p class="text-md hidden sm:block">Hello {userProfile.name}</p>
			<button class="btn variant-filled-primary" formaction="?/logout">Logout</button>
		{:else}
			<input
				class="input"
				type="text"
				name="username"
				placeholder="Username"
				required
			/>
			<input
				class="input"
				type="password"
				name="password"
				placeholder="Password"
				required
			/>
			<button class="btn variant-filled-primary">Login</button>
		{/if}
	</div>
</form>
