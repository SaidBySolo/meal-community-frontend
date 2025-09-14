import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import { Timetable } from '../../dtos/timetable';

interface TimetableDesktopViewProps {
  schedule: Timetable[][];
  isLoading: boolean;
  weekdays: string[];
  isCurrentDay: (dayIndex: number) => boolean;
}

const TimetableDesktopView = ({ schedule, isLoading, weekdays, isCurrentDay }: TimetableDesktopViewProps) => {
  return (
    <Box display={{ initial: 'none', md: 'block' }}>
      <Card>
        {isLoading ? (
          <Flex justify="center" align="center" style={{ height: '400px' }}>
            <Text>시간표를 불러오는 중...</Text>
          </Flex>
        ) : (
          <Grid columns="5" gap="1" style={{ overflow: 'hidden' }}>
            {weekdays.map((day, dayIndex) => (
              <Box key={day} style={{ textAlign: 'center' }}>
                <Box
                  style={{
                    padding: '12px',
                    backgroundColor: isCurrentDay(dayIndex) ? 'var(--accent-9)' : 'var(--accent-3)',
                    color: isCurrentDay(dayIndex) ? 'white' : 'inherit',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    position: 'relative'
                  }}
                >
                  {day}요일
                </Box>

                <Flex
                  direction="column"
                  gap="1"
                  style={{
                    marginTop: '8px',
                    border: isCurrentDay(dayIndex) ? '2px solid var(--accent-9)' : 'none',
                    borderRadius: '8px',
                    padding: isCurrentDay(dayIndex) ? '8px' : '0'
                  }}
                >
                  {schedule[dayIndex]?.map((lesson, index) => (
                    <Card key={`${day}-${index}`} size="1" style={{ padding: '8px' }}>
                      <Text size="2" weight="bold">{lesson.subject}</Text>
                    </Card>
                  ))}

                  {/* 시간표 데이터가 없는 경우 */}
                  {(!schedule[dayIndex] || schedule[dayIndex].length === 0) && (
                    <Flex justify="center" align="center" style={{ padding: '20px 0' }}>
                      <Text size="2" color="gray">수업 정보가 없습니다</Text>
                    </Flex>
                  )}
                </Flex>
              </Box>
            ))}
          </Grid>
        )}
      </Card>
    </Box>
  );
};

export default TimetableDesktopView;
