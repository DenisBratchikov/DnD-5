import { Heading, Flex, TextField, Select } from '@radix-ui/themes';
import { useState, useEffect } from 'react';

export const Header: React.FC = () => {
	const [search, setSearch] = useState('');
	const [filteredSpells, setFilteredSpells] = useState(spellsData);
	const [filter, setFilter] = useState({ level: 'all', school: 'all', class: 'all' });

	// Получение уникальных значений для фильтра
	const levels = [...new Set(spellsData.map((s) => s.level).filter(Boolean))].sort((a, b) => a - b);
	const schools = [...new Set(spellsData.map((s) => s.school).filter(Boolean))].sort();
	const classes = [...new Set(spellsData.flatMap((s) => s.classes).filter(Boolean))].sort();

	useEffect(() => {
		setFilteredSpells(
			spellsData.filter((spell) => {
				const matchName =
					spell.name_ru.toLowerCase().includes(search.toLowerCase()) ||
					spell.name.toLowerCase().includes(search.toLowerCase());
				const matchLevel = filter.level === 'all' || spell.level === Number(filter.level);
				const matchSchool = filter.school === 'all' || spell.school === filter.school;
				const matchClass = filter.class === 'all' || spell.classes.includes(filter.class);
				return matchName && matchLevel && matchSchool && matchClass;
			}),
		);
	}, [search, filter]);

	return (
		<>
			<Heading size="6" mb="4">
				📖 Заклинания D&D 2024
			</Heading>

			<Flex direction="column" gap="3">
				<TextField.Root placeholder="Поиск по названию..." value={search} onChange={(e) => setSearch(e.target.value)} />

				<Flex gap="3" wrap="wrap">
					<Select.Root value={filter.level} onValueChange={(value) => setFilter((f) => ({ ...f, level: value }))}>
						<Select.Trigger placeholder="Уровень" />
						<Select.Content>
							<Select.Item value="all">Все уровни</Select.Item>
							{levels.map((level) => (
								<Select.Item key={level} value={String(level)}>
									{level === 0 ? 'Заговор' : `${level} уровень`}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>

					<Select.Root value={filter.school} onValueChange={(value) => setFilter((f) => ({ ...f, school: value }))}>
						<Select.Trigger placeholder="Школа" />
						<Select.Content>
							<Select.Item value="all">Все школы</Select.Item>
							{schools.map((school) => (
								<Select.Item key={school} value={school}>
									{school}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>

					<Select.Root value={filter.class} onValueChange={(value) => setFilter((f) => ({ ...f, class: value }))}>
						<Select.Trigger placeholder="Класс" />
						<Select.Content>
							<Select.Item value="all">Все классы</Select.Item>
							{classes.map((cls) => (
								<Select.Item key={cls} value={cls}>
									{cls}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</Flex>
			</Flex>
		</>
	);
};
