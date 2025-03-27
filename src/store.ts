import { create } from 'zustand';
import spells from './assets/spells.json';
import type { Spell } from './types';

type FilterKey = 'level' | 'school' | 'class';
type Filter = { filter: Record<FilterKey, string> };
type Search = { search: string };
type SpellsData = Spell[];
type FilterData = { filterData: Record<FilterKey, string[]> };

export const defaultFilterOptions: Filter & Search = {
	search: '',
	filter: {
		level: 'all',
		school: 'all',
		class: 'all',
	},
};

const getFilterData = (): FilterData => {
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

	return {
		filterData: {
			level: Array.from(data.levels)
				.sort((a, b) => a - b)
				.map(String),
			school: Array.from(data.schools),
			class: Array.from(data.classes),
		},
	};
};

const getFilteredSpells = ({ search, filter }: Search & Filter): SpellsData => {
	return spells.filter((spell) => {
		const matchName =
			spell.name_ru.toLowerCase().includes(search.toLowerCase()) ||
			spell.name.toLowerCase().includes(search.toLowerCase());
		const matchLevel = filter.level === 'all' || `${spell.level}` === filter.level;
		const matchSchool = filter.school === 'all' || spell.school === filter.school;
		const matchClass = filter.class === 'all' || spell.classes.includes(filter.class);
		return matchName && matchLevel && matchSchool && matchClass;
	});
};

interface SpellsStore extends Filter, Search, FilterData {
	spells: SpellsData;
	setSearch: (search: string) => void;
	setFilter: (key: FilterKey, value: string) => void;
	reset: VoidFunction;
}

export const useSpellsStore = create<SpellsStore>((set, get) => ({
	...defaultFilterOptions,
	...getFilterData(),

	spells,

	setSearch: (search: string) => {
		set({ search, spells: getFilteredSpells({ ...get(), search }) });
	},

	setFilter: (key: FilterKey, value: string) => {
		const filter = {
			...get().filter,
			[key]: value,
		};
		set({ filter, spells: getFilteredSpells({ ...get(), filter }) });
	},

	reset: () => {
		set({ ...defaultFilterOptions, spells });
	},
}));

export const spellsStoreSelector = {
	search: (state: SpellsStore): SpellsStore['search'] => state.search,
	filter: (state: SpellsStore): SpellsStore['filter'] => state.filter,
	filterData: (state: SpellsStore): SpellsStore['filterData'] => state.filterData,
	spells: (state: SpellsStore): SpellsStore['spells'] => state.spells,
	reset: (state: SpellsStore): SpellsStore['reset'] => state.reset,
	setSearch: (state: SpellsStore): SpellsStore['setSearch'] => state.setSearch,
	setFilter: (state: SpellsStore): SpellsStore['setFilter'] => state.setFilter,
};
