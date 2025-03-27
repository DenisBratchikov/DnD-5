export interface Spell {
	name: string;
	name_ru: string;
	level: number;
	school: string;
	classes: string[];
	casting_time: string;
	range: string;
	components: string[];
	duration: string;
	description: string;
	improvement: string | null;
}
