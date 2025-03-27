import { Theme, Box, Flex } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { spellsStoreSelector, useSpellsStore } from './store';
import { SpellCard } from './components/SpellCard';
import { Header } from './components/Header';

function App() {
	const spells = useSpellsStore(spellsStoreSelector.spells);

	return (
		<Theme accentColor="jade" grayColor="gray" panelBackground="solid">
			<Box maxWidth="600px" mx="auto" p="4">
				<Header />
				<Box mt="5">
					<Flex direction="column" gap="4">
						{spells.slice(0, 100).map((spell) => (
							<SpellCard key={spell.name} spell={spell} />
						))}
					</Flex>
				</Box>
			</Box>
		</Theme>
	);
}

export default App;
