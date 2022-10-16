import { PrismaClient } from '@prisma/client';
import { error, json } from '@sveltejs/kit';

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function GET() {
	const firstNumber = getRandomInt(1, 905);
	let secondNumber = getRandomInt(1, 905);
	while (secondNumber === firstNumber) secondNumber = getRandomInt(1, 905);

	try {
		const prisma = new PrismaClient();
		const firstPokemon = await prisma.pokemon.findUnique({ where: { number: firstNumber } });
		const secondPokemon = await prisma.pokemon.findUnique({ where: { number: secondNumber } });
		await prisma.$disconnect();
		return json({ firstPokemon, secondPokemon }, { status: 200 });
	} catch (e) {
		throw error(500, 'There was an error.');
	}
}

export async function POST({ request }: any) {
	try {
		const { winnerNumber, looserNumber } = await request.json();
		const prisma = new PrismaClient();
		const winnerPokemon = await prisma.pokemon.findUnique({ where: { number: winnerNumber } });
		const looserPokemon = await prisma.pokemon.findUnique({ where: { number: looserNumber } });

		if (!winnerPokemon || !looserPokemon) throw new Error('No pokemon number found');

		await prisma.$transaction([
			prisma.pokemon.update({
				where: { number: winnerNumber },
				data: { winnerVotes: winnerPokemon.winnerVotes + 1 }
			}),
			prisma.pokemon.update({
				where: { number: looserNumber },
				data: { looserVotes: looserPokemon.looserVotes + 1 }
			}),
			prisma.vote.create({
				data: { winnerNumber, looserNumber }
			})
		]);

		await prisma.$disconnect();
		return json({ message: 'Vote registered' }, { status: 201 });
	} catch (e) {
		throw error(500, 'There was an error.');
	}
}
