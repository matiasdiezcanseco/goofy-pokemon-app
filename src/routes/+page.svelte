<script lang="ts">
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import PokemonVote from '../components/PokemonVote.svelte';
	import { actualVote, fetchInitialVotes, submitVote } from '../store/pokemon';

	onMount(async () => {
		if (!$actualVote) await fetchInitialVotes();
	});

	const handleOnVote = async (e: CustomEvent) => {
		const winnerNumber = e.detail;
		const looserNumber =
			winnerNumber === $actualVote.firstPokemon.number
				? $actualVote.secondPokemon.number
				: $actualVote.firstPokemon.number;

		await submitVote({ winnerNumber, looserNumber });
	};
</script>

<svelte:head>
	<title>Let's vote for the Goofiest Pokemon</title>
	<meta
		name="description"
		content="Let's respond a weird question, which is the goofiest Pokemon? With this app you can vote between 2 random Pokemon per vote."
	/>
</svelte:head>

<section
	class="flex items-center justify-center h-full space-y-10 md:space-y-0 md:space-x-40 flex-col md:flex-row"
>
	{#if $actualVote}
		<PokemonVote pokemon={$actualVote.firstPokemon} on:vote={handleOnVote} />
		<p class="text-2xl">vs</p>
		<PokemonVote pokemon={$actualVote.secondPokemon} on:vote={handleOnVote} />
	{:else}
		<Circle size="60" color="white" unit="px" duration="1s" />
	{/if}
</section>
