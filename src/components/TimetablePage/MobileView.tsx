import { Box, Card, Flex, ScrollArea, Tabs, Text } from '@radix-ui/themes';
import { Timetable } from '../../dtos/timetable';

interface TimetableMobileViewProps {
  schedule: Timetable[][];
  isLoading: boolean;
  weekdays: string[];
  isCurrentDay: (dayIndex: number) => boolean;
  getCurrentDayIndex: () => number;
  currentWeek: number;
}

const TimetableMobileView = ({
  schedule,
  isLoading,
  weekdays,
  isCurrentDay,
  getCurrentDayIndex,
  currentWeek
}: TimetableMobileViewProps) => {
  return (
    <Box display={{ initial: 'block', md: 'none' }}>
      <Card>
        {isLoading ? (
          <Flex justify="center" align="center" style={{ height: '400px' }}>
            <Text>시간표를 불러오는 중...</Text>
          </Flex>
        ) : (
          <Tabs.Root defaultValue={currentWeek === 0 && getCurrentDayIndex() >= 0 ? weekdays[getCurrentDayIndex()] : weekdays[0]}>
            <Tabs.List>
              {weekdays.map((day, dayIndex) => (
                <Tabs.Trigger
                  key={day}
                  value={day}
                  style={{
                    position: 'relative',
                    backgroundColor: isCurrentDay(dayIndex) ? 'var(--accent-3)' : undefined,
                    fontWeight: isCurrentDay(dayIndex) ? 'bold' : undefined
                  }}
                >
                  {day}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {weekdays.map((day, dayIndex) => (
              <Tabs.Content key={day} value={day}>
                <ScrollArea style={{ height: '400px' }}>
                  <Flex direction="column" gap="2" style={{ padding: '16px' }}>
                    {schedule[dayIndex]?.map((lesson, index) => (
                      <Card
                        key={`mobile-${day}-${index}`}
                        style={{
                          borderLeft: isCurrentDay(dayIndex) ? '4px solid var(--accent-9)' : undefined
                        }}
                      >
                        <Flex justify="between" align="center">
                          <Box
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: isCurrentDay(dayIndex) ? 'var(--accent-9)' : 'var(--accent-4)',
                              color: isCurrentDay(dayIndex) ? 'white' : 'inherit',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold'
                            }}
                          >
                            {lesson.period}
                          </Box>
                        </Flex>
                        <Box style={{ marginTop: '8px' }}>
                          <Text size="3" weight="medium">{lesson.subject}</Text>
                        </Box>
                      </Card>
                    ))}

                    {/* 시간표 데이터가 없는 경우 */}
                    {(!schedule[dayIndex] || schedule[dayIndex].length === 0) && (
                      <Flex justify="center" align="center" style={{ padding: '40px 0' }}>
                        <Text size="2" color="gray">이 날은 수업이 없습니다</Text>
                      </Flex>
                    )}
                  </Flex>
                </ScrollArea>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        )}
      </Card>
    </Box>
  );
};

export default TimetableMobileView;
