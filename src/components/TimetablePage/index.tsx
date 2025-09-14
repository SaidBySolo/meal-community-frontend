import { useState, useEffect } from 'react';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { requestWeeklyTimetable } from '../../api';
import { Timetable } from '../../dtos/timetable';
import TimetableDesktopView from '../TimetablePage/DesktopView';
import TimetableMobileView from '../TimetablePage/MobileView';

const TimetablePage = () => {
  const [schedule, setSchedule] = useState<Timetable[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentWeek, setCurrentWeek] = useState<number>(0); // 현재 주차
  const [error, setError] = useState<string | null>(null);

  // 요일 데이터
  const weekdays: string[] = ['월', '화', '수', '목', '금'];

  // 현재 요일 인덱스 (0: 월요일, 1: 화요일, ...)
  const getCurrentDayIndex = (): number => {
    const today = new Date();
    const day = today.getDay(); // 0: 일요일, 1: 월요일, ...
    return day === 0 || day === 6 ? -1 : day - 1; // 주말은 -1, 평일은 0~4
  };

  // 현재 요일이 이번 주인지 확인
  const isCurrentDay = (dayIndex: number): boolean => {
    return currentWeek === 0 && dayIndex === getCurrentDayIndex();
  };

  // 날짜 포맷 함수
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0].replace(/-/g, "");
  };

  // 현재 주의 월요일 날짜 계산
  const getMondayDate = (weekOffset: number = 0): Date => {
    const today = new Date();
    const day = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

    // 현재 요일부터 월요일까지의 차이 계산 (일요일이면 -6, 월요일이면 0, ...)
    const diff = day === 0 ? -6 : 1 - day;

    // 현재 날짜에 차이와 주차 오프셋을 더해 월요일 날짜 계산
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff + (weekOffset * 7));

    return monday;
  };

  // 주차 표시 문자열 생성
  const getWeekDisplayText = (): string => {
    const monday = getMondayDate(currentWeek);
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    return `${monday.getMonth() + 1}월 ${monday.getDate()}일 ~ ${friday.getMonth() + 1}월 ${friday.getDate()}일`;
  };

  // 시간표 데이터 가져오기
  const fetchSchedule = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const monday = getMondayDate(currentWeek);
      const dateStr = formatDate(monday);

      const timetableData = await requestWeeklyTimetable(dateStr);
      setSchedule(timetableData);
    } catch (error) {
      console.error('시간표를 불러오는 중 오류가 발생했습니다:', error);
      setError('시간표를 불러올 수 없습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [currentWeek]);

  // 주차 변경 함수
  const changeWeek = (delta: number) => {
    setCurrentWeek(prev => prev + delta);
  };

  return (
    <Flex direction="column" gap="4" style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <Flex justify="between" align="center" wrap="wrap" gap="2">
        <Heading size="5">주간 시간표</Heading>
        <Flex gap="2" align="center" wrap="wrap">
          <Text size="2" weight="medium">
            {getWeekDisplayText()}
            {currentWeek === 0 ? ' (이번 주)' : ''}
          </Text>
          <Flex gap="1">
            <button
              onClick={() => changeWeek(-1)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--gray-5)' }}
            >
              ←
            </button>
            <button
              onClick={() => setCurrentWeek(0)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--gray-5)' }}
            >
              이번주
            </button>
            <button
              onClick={() => changeWeek(1)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--gray-5)' }}
            >
              →
            </button>
          </Flex>
        </Flex>
      </Flex>

      {/* 에러 메시지 */}
      {error && (
        <Card style={{ backgroundColor: 'var(--red-3)', padding: '12px' }}>
          <Text color="red">{error}</Text>
        </Card>
      )}

      {/* 데스크톱 뷰 */}
      <TimetableDesktopView
        schedule={schedule}
        isLoading={isLoading}
        weekdays={weekdays}
        isCurrentDay={isCurrentDay}
      />

      {/* 모바일 뷰 */}
      <TimetableMobileView
        schedule={schedule}
        isLoading={isLoading}
        weekdays={weekdays}
        isCurrentDay={isCurrentDay}
        getCurrentDayIndex={getCurrentDayIndex}
        currentWeek={currentWeek}
      />
    </Flex>
  );
};

export default TimetablePage;