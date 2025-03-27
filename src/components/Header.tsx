import { Heading, Flex, TextField, Select, IconButton, Button } from '@radix-ui/themes';

import { useSpellsStore, spellsStoreSelector, defaultFilterOptions } from '../store';
import { Cross2Icon } from '@radix-ui/react-icons';

export const Header: React.FC = () => {
	const search = useSpellsStore(spellsStoreSelector.search);
	const setSearch = useSpellsStore(spellsStoreSelector.setSearch);
	const filterData = useSpellsStore(spellsStoreSelector.filterData);
	const filter = useSpellsStore(spellsStoreSelector.filter);
	const setFilter = useSpellsStore(spellsStoreSelector.setFilter);
	const reset = useSpellsStore(spellsStoreSelector.reset);

	return (
		<>
			<Heading size="6" mb="4">
				📖 Заклинания D&D 2024
			</Heading>

			<Flex direction="column" gap="3">
				<TextField.Root placeholder="Поиск по названию..." value={search} onChange={(e) => setSearch(e.target.value)}>
					{search && (
						<TextField.Slot side="right">
							<IconButton size="1" variant="ghost" onClick={() => setSearch('')}>
								<Cross2Icon />
							</IconButton>
						</TextField.Slot>
					)}
				</TextField.Root>

				<Flex gap="3" wrap="wrap">
					<Select.Root value={filter.level} onValueChange={(value) => setFilter('level', value)}>
						<Select.Trigger placeholder="Уровень" />
						<Select.Content>
							<Select.Item value={defaultFilterOptions.filter.level}>Все уровни</Select.Item>
							{filterData.level.map((level) => (
								<Select.Item key={level} value={level}>
									{level === '0' ? 'Заговор' : `${level} уровень`}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>

					<Select.Root value={filter.school} onValueChange={(value) => setFilter('school', value)}>
						<Select.Trigger placeholder="Школа" />
						<Select.Content>
							<Select.Item value={defaultFilterOptions.filter.school}>Все школы</Select.Item>
							{filterData.school.map((school) => (
								<Select.Item key={school} value={school}>
									{school}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>

					<Select.Root value={filter.class} onValueChange={(value) => setFilter('class', value)}>
						<Select.Trigger placeholder="Класс" />
						<Select.Content>
							<Select.Item value={defaultFilterOptions.filter.class}>Все классы</Select.Item>
							{filterData.class.map((cls) => (
								<Select.Item key={cls} value={cls}>
									{cls}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
					<Button onClick={reset}>Сбросить всё</Button>
				</Flex>
			</Flex>
		</>
	);
};
