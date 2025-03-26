import type React from 'react';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box, Heading, Text } from '@radix-ui/themes';

export const SpellListVirtualScroll: React.FC = ({ spells }) => {
	const parentRef = useRef(null);

	const rowVirtualizer = useVirtualizer({
		count: spells.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 220,
		overscan: 10,
	});

	return (
		<Box
			ref={parentRef}
			style={{
				height: '90vh',
				overflow: 'auto',
				border: '1px solid var(--gray-a5)',
				borderRadius: 'var(--radius-3)',
				padding: '1rem',
			}}>
			<div
				style={{
					height: `${rowVirtualizer.getTotalSize()}px`,
					position: 'relative',
				}}>
				{rowVirtualizer.getVirtualItems().map((virtualRow) => {
					const spell = spells[virtualRow.index];
					return (
						<Box
							key={spell.name + virtualRow.index}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								transform: `translateY(${virtualRow.start}px)`,
							}}
							p="4"
							mb="3"
							asChild>
							<div style={{ border: '1px solid var(--gray-a5)', borderRadius: 'var(--radius-3)' }}>
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
							</div>
						</Box>
					);
				})}
			</div>
		</Box>
	);
};
