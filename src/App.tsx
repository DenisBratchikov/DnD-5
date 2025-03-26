import { useEffect, useState } from 'react';
import spellsData from './spells_final_superclean.json';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

function App() {
	const [search, setSearch] = useState('');
	const [filteredSpells, setFilteredSpells] = useState(spellsData);

	useEffect(() => {
		setFilteredSpells(
			spellsData.filter(
				(spell) =>
					spell.name_ru.toLowerCase().includes(search.toLowerCase()) ||
					spell.name.toLowerCase().includes(search.toLowerCase()),
			),
		);
	}, [search]);

	return (
		<div className="max-w-screen-lg mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">📖 Заклинания D&D 2024</h1>

			<Input
				type="text"
				placeholder="Поиск по названию..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="mb-6"
			/>

			<div className="grid gap-4">
				{filteredSpells.map((spell, idx) => (
					<Card key={idx}>
						<CardContent className="p-4">
							<h2 className="text-xl font-semibold">
								{spell.name_ru} <span className="text-sm text-muted-foreground">[{spell.name}]</span>
							</h2>
							<p className="text-sm italic mb-2">
								{spell.level === 0 ? 'Заговор' : `${spell.level} уровень`}, {spell.school}
							</p>

							<p className="text-sm mb-1">
								<strong>Время:</strong> {spell.casting_time}
							</p>
							<p className="text-sm mb-1">
								<strong>Дистанция:</strong> {spell.range}
							</p>
							<p className="text-sm mb-1">
								<strong>Компоненты:</strong> {spell.components.join(', ')}
							</p>
							<p className="text-sm mb-1">
								<strong>Длительность:</strong> {spell.duration}
							</p>

							<p className="text-sm mt-2 whitespace-pre-line">{spell.description}</p>
							{spell.improvement && (
								<p className="text-sm mt-2 text-blue-700 whitespace-pre-line font-medium">🔹 {spell.improvement}</p>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default App;
