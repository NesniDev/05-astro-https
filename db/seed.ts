import { clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(clients).values([
		{id: 1, name: 'John', age: 30, isActive: true},
		{id: 2, name: 'Jane', age: 25, isActive: false},
		{id: 3, name: 'Bob', age: 41, isActive: true},
		{id: 4, name: 'Emin', age: 15, isActive: false},
		{id: 5, name: 'Jaime', age: 27, isActive: true},
	])
}
