<script lang="ts">
	import type { Pokemon } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import { isVoting } from '../store/pokemon';
	import { capitalizeFirstLetter } from '../utils/format';

	const dispatch = createEventDispatcher();

	export let pokemon: Pokemon;

	const onClickHandler = () => dispatch('vote', pokemon.number);
</script>

<section class="flex flex-col items-center">
	<p>{capitalizeFirstLetter(pokemon.name.split('-')[0])}</p>
	<p># {pokemon.number}</p>
	<img class="translate-x-2" src={pokemon.url} width="180" alt={pokemon.name} />
	<button
		disabled={$isVoting}
		class="bg-gray-700 py-2 px-4 rounded-full enabled:hover:bg-gray-600 disabled:opacity-20 disabled:cursor-not-allowed "
		on:click={onClickHandler}>Vote</button
	>
</section>
