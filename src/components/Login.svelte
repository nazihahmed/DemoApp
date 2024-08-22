<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	$: userProfile = $page.data?.profile;
</script>

<form method="POST" use:enhance action="?/login">
	{#if userProfile}
		<p>Welcome {userProfile.name}!</p>
		<button formaction="?/logout">Logout</button>
	{:else}
		<input type="text" name="username" placeholder="Username" required />
		<input type="password" name="password" placeholder="Password" required />
		<button>Login</button>
	{/if}
</form>
