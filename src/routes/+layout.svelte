<script>
	import './styles.css';
</script>

<div class="flex flex-col h-screen  text-white">
	<header class="text-center my-6 text-2xl">Which Pokemon is Goofier?</header>
	<main class="flex-grow">
		<slot />
	</main>
	<footer>
		<ul class="flex space-x-6 justify-center my-6 text-lg">
			<li><a href="/">Vote</a></li>
			<p>-</p>
			<li><a href="/results">Results</a></li>
		</ul>
	</footer>
</div>
