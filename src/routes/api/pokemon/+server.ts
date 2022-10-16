import { PrismaClient } from '@prisma/client';
import { error, json } from '@sveltejs/kit';
import pokemon from '../../../../prisma/data/pokemon.json';
import { SECRET_ENDPOINT_PASSWORD } from '$env/static/private';

export async function GET() {
	try {
		const prisma = new PrismaClient();
		const pokemon = await prisma.pokemon.findMany({});
		await prisma.$disconnect();
		return json(pokemon, { status: 200 });
	} catch (e) {
		console.log(e);
		throw error(500, 'There was an error.');
	}
}

export async function POST({ request }: any) {
	if (request.headers.get('authorization') !== `Bearer ${SECRET_ENDPOINT_PASSWORD}`)
		throw error(401, 'Unauthorized.');

	try {
		const prisma = new PrismaClient();
		await prisma.pokemon.createMany({ data: pokemon });
		await prisma.$disconnect();
		return json({}, { status: 200 });
	} catch (e) {
		throw error(500, 'There was an error.');
	}
}
