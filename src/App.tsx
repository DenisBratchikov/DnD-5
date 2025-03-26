import { useEffect, useState } from 'react';
import spellsData from './assets/spells.json';
import { Theme, TextField, Select, Box, Flex, Heading, Text } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

function App() {
	return (
		<Theme accentColor="jade" grayColor="gray" panelBackground="solid">
			<Box maxWidth="600px" mx="auto" p="4">
				<Box mt="5">
					<Flex direction="column" gap="4">
						{filteredSpells.map((spell) => (
							<Box
								key={spell.name}
								p="4"
								style={{ border: '1px solid var(--gray-a5)', borderRadius: 'var(--radius-3)' }}>
								<Heading size="4" mb="1">
									{spell.name_ru}{' '}
									<Text color="gray" size="2">
										[{spell.name}]
									</Text>
								</Heading>
								<Text size="2" mb="2" color="gray">
									{spell.level === 0 ? 'Заговор' : `${spell.level} уровень`}, {spell.school}
								</Text>

								<Text size="2">
									<strong>Время:</strong> {spell.casting_time}
								</Text>
								<br />
								<Text size="2">
									<strong>Дистанция:</strong> {spell.range}
								</Text>
								<br />
								<Text size="2">
									<strong>Компоненты:</strong> {spell.components.join(', ')}
								</Text>
								<br />
								<Text size="2">
									<strong>Длительность:</strong> {spell.duration}
								</Text>

								<Box mt="2">
									<Text size="2" as="p" style={{ whiteSpace: 'pre-line' }}>
										{spell.description}
									</Text>
									{spell.improvement && (
										<Text
											size="2"
											as="p"
											style={{ whiteSpace: 'pre-line', color: 'var(--jade-11)', marginTop: '0.5rem', fontWeight: 500 }}>
											🔹 {spell.improvement}
										</Text>
									)}
								</Box>
							</Box>
						))}
					</Flex>
				</Box>
			</Box>
		</Theme>
	);
}

export default App;
