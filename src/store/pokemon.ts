import type { Pokemon } from '@prisma/client';
import { writable, get } from 'svelte/store';

interface IVote {
	firstPokemon: Pokemon;
	secondPokemon: Pokemon;
}

export const pokemonRanking = writable<Pokemon[]>([]);

export const actualVote = writable<IVote>();

export const nextVote = writable<IVote>();

export const isVoting = writable<boolean>(false);

export const fetchRanking = async () => {
	pokemonRanking.set(await (await fetch('api/pokemon')).json());
};

export const submitVote = async ({
	winnerNumber,
	looserNumber
}: {
	winnerNumber: number;
	looserNumber: number;
}) => {
	isVoting.set(true);
	await fetch('api/vote', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ winnerNumber, looserNumber })
	});

	const newVote = await (await fetch('api/vote')).json();

	actualVote.set(get(nextVote));
	nextVote.set(newVote);
	isVoting.set(false);
};

export const fetchInitialVotes = async () => {
	const firstVote = await (await fetch('api/vote')).json();
	const secondVote = await (await fetch('api/vote')).json();

	actualVote.set(firstVote);
	nextVote.set(secondVote);
};
