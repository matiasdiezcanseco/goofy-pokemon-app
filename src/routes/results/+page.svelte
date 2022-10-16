<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchRanking, pokemonRanking } from '../../store/pokemon';
	import { Circle } from 'svelte-loading-spinners';
	import { capitalizeFirstLetter } from '../../utils/format';
	import type { Pokemon } from '@prisma/client';

	onMount(async () => {
		if ($pokemonRanking.length === 0) fetchRanking();
	});

	let orderedPokemon: Pokemon[] = [];

	$: {
		orderedPokemon = [...$pokemonRanking];
		orderedPokemon.sort((a, b) => {
			if (a.winnerVotes > b.winnerVotes) return -1;
			else return 1;
		});
	}
</script>

<svelte:head>
	<title>Watch which is the goofiest Pokemon ever! Chosen by the community</title>
</svelte:head>

<section class="flex items-center justify-center h-full">
	{#if orderedPokemon.length > 0}
		<table class="table-auto">
			<tr>
				<th class="px-2 pb-2 border-b-[1px] border-gray-700">#</th>
				<th class="px-2 pb-2 border-b-[1px] border-gray-700">Name</th>
				<th class="px-2 pb-2 border-b-[1px] border-gray-700">Image</th>
				<th class="px-2 pb-2 border-b-[1px] border-gray-700">Votes</th>
				<th class="px-2 pb-2 border-b-[1px] border-gray-700">Chosen</th>
			</tr>
			{#each orderedPokemon as { number, name, url, winnerVotes, looserVotes }}
				<tr class="text-center">
					<td class="pb-2 border-b-[1px] border-gray-700">{number}</td>
					<td class="pb-2 border-b-[1px] border-gray-700"
						>{capitalizeFirstLetter(name.split('-')[0])}</td
					>
					<td class="pb-2 border-b-[1px] border-gray-700"
						><img src={url} width="120" alt={name} /></td
					>
					<td class="pb-2 border-b-[1px] border-gray-700">{winnerVotes}</td>
					<td class="pb-2 border-b-[1px] border-gray-700"
						>{winnerVotes + looserVotes > 0
							? ((winnerVotes * 100) / (winnerVotes + looserVotes)).toFixed(0)
							: 0}%</td
					>
				</tr>
			{/each}
		</table>
	{:else}
		<Circle size="60" color="white" unit="px" duration="1s" />
	{/if}
</section>
