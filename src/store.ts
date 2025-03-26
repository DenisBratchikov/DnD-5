import { create } from 'zustand';
import spells from './assets/spells.json';

type FilterKey = 'level' | 'school' | 'class';

const getDefaultOptions = () => {
	const data = spells.reduce(
		(acc, curr) => {
			acc.levels.add(curr.level);
			acc.schools.add(curr.school);
			for (const c of acc.classes) {
				acc.classes.add(c);
			}
			return acc;
		},
		{ levels: new Set<number>(), schools: new Set<string>(), classes: new Set<string>() },
	);

	const filters = new Map<FilterKey, { current: string; values: string[] }>();
	filters.set('level', {
		current: 'all',
		values: Array.from(data.levels)
			.sort((a, b) => a - b)
			.map(String),
	});
	filters.set('school', { current: 'all', values: Array.from(data.schools) });
	filters.set('class', { current: 'all', values: Array.from(data.classes) });

	return {
		spells,
		search: '',
		filters,
	};
};

type SpellStore = ReturnType<typeof getDefaultOptions>;

export const useSpellsStore = create<SpellStore>((set, get) => ({
	...getDefaultOptions(),

	setSearch: (search: string) => set({ search }),

	setFilter: (key: FilterKey, value: string) => {
		const filter = get().filters.get(key);
		const newFilter = {
			...filter,
			current: value,
		};
	},

	get filteredSpells() {
		const { spells, search, filter } = get();
		return spells.filter((spell) => {
			const matchName =
				spell.name_ru.toLowerCase().includes(search.toLowerCase()) ||
				spell.name.toLowerCase().includes(search.toLowerCase());
			const matchLevel = filter.level === 'all' || spell.level === Number(filter.level);
			const matchSchool = filter.school === 'all' || spell.school === filter.school;
			const matchClass = filter.class === 'all' || spell.classes.includes(filter.class);
			return matchName && matchLevel && matchSchool && matchClass;
		});
	},
}));

export const spellsStoreSelector = {};
