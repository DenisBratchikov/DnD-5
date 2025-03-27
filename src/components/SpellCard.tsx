import { Box, Heading, Text, Flex } from '@radix-ui/themes';
import type { Spell } from '../types';

export const SpellCard: React.FC<{ spell: Spell }> = ({ spell }) => {
	return (
		<Box
			p="4"
			style={{
				border: '1px solid var(--gray-a5)',
				borderRadius: 'var(--radius-4)',
				background: 'var(--color-panel-solid)',
				boxShadow: 'var(--shadow-2)',
			}}>
			<Flex justify="between" align="start" wrap="wrap" mb="2">
				<Heading size="4">
					{spell.name_ru}{' '}
					<Text color="gray" size="2">
						[{spell.name}]
					</Text>
				</Heading>
				<Text size="1" color="gray" mt={{ initial: '2', sm: '0' }}>
					{spell.level === 0 ? 'Заговор' : `${spell.level} уровень`}, {spell.school}
				</Text>
			</Flex>

			<Flex direction="column" gap="1" mb="3">
				<Text size="2">
					<strong>Время:</strong> {spell.casting_time}
				</Text>
				<Text size="2">
					<strong>Дистанция:</strong> {spell.range}
				</Text>
				<Text size="2">
					<strong>Компоненты:</strong> {spell.components.join(', ')}
				</Text>
				<Text size="2">
					<strong>Длительность:</strong> {spell.duration}
				</Text>
			</Flex>

			<Text size="2" as="p" style={{ whiteSpace: 'pre-line' }}>
				{spell.description}
			</Text>

			{spell.improvement && (
				<Text
					size="2"
					as="p"
					mt="2"
					style={{
						whiteSpace: 'pre-line',
						color: 'var(--jade-11)',
						fontWeight: 500,
					}}>
					🔹 {spell.improvement}
				</Text>
			)}
		</Box>
	);
};
