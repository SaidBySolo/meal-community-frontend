import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  RadioCards,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { requestGetDailyMeal } from "../api";
import { Meal } from "../types";
import MealInfo from "./MealInfo";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Comment from "./Comment";
import CalorieAnalysisDialog from "./CalorieAnalysisDialog";

const MealPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isCalorieDialogOpen, setIsCalorieDialogOpen] = useState(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const getDisplayDate = (date: Date) =>
    date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0: Sunday, 6: Saturday
  };

  const moveDate = (days: number) => {
    setSelectedDate((prev) => {
      let newDate = new Date(prev);
      do {
        newDate.setDate(newDate.getDate() + days);
      } while (isWeekend(newDate));
      return newDate;
    });
  };

  const handleSelectMeal = (mealName: string) => {
    setSelectedMeal(meals.find((meal) => meal.name === mealName) || null);
  };

  const handleDateSelectFromCalendar = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await requestGetDailyMeal({
        date: formatDate(selectedDate),
      });
      if (!response.ok) {
        console.error("Failed to fetch meals");
        setMeals([]);
        setSelectedMeal(null);
        setIsLoading(false);
        return;
      }
      const result = await response.json();
      const mealResults = result.results as Meal[];
      setMeals(mealResults);

      if (mealResults.length > 0) {
        const firstMeal =
          mealResults.find((meal) => meal.name === "중식") || mealResults[0];
        setSelectedMeal(firstMeal);
      } else {
        setSelectedMeal(null);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const renderCalendar = () => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth });
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    return (
      <Box
        ref={calendarRef}
        p="3"
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--gray-a5)",
          borderRadius: "var(--radius-3)",
          maxWidth: 320,
          zIndex: 10,
          marginTop: "4px",
        }}
      >
        <Flex justify="between" align="center" mb="3">
          <IconButton
            size="1"
            variant="ghost"
            onClick={() => setCalendarViewDate(new Date(year, month - 1, 1))}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Text weight="bold">{`${year}년 ${month + 1}월`}</Text>
          <IconButton
            size="1"
            variant="ghost"
            onClick={() => setCalendarViewDate(new Date(year, month + 1, 1))}
          >
            <ChevronRightIcon />
          </IconButton>
        </Flex>
        <Grid columns="7" gap="2" style={{ textAlign: "center" }}>
          {dayNames.map((day) => (
            <Text key={day} size="1" weight="medium" color="gray">
              {day}
            </Text>
          ))}
          {emptyDays.map((_, i) => (
            <Box key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const date = new Date(year, month, day);
            const isSelected =
              selectedDate.toDateString() === date.toDateString();
            return (
              <IconButton
                key={day}
                variant={isSelected ? "solid" : "soft"}
                color={isSelected ? "blue" : "gray"}
                onClick={() => handleDateSelectFromCalendar(date)}
                style={{ borderRadius: "100%", width: 35, height: 35 }}
              >
                {day}
              </IconButton>
            );
          })}
        </Grid>
      </Box>
    );
  };

  const contentWidthStyle = {
    width: "min(100%, 900px)",
    maxWidth: "100%",
    margin: "0 auto",
  };

  return (
    <>
      <Flex
        direction="column"
        align="center"
        gap="4"
        py="4"
        style={{
          width: "100%",
          maxWidth: "100%",
          padding: "var(--space-3)",
        }}
      >
        <Flex
          align="center"
          gap="2"
          mb="2"
          justify="center"
          style={{ ...contentWidthStyle, position: "relative" }}
        >
          <IconButton
            variant="soft"
            onClick={() => moveDate(-1)}
            aria-label="이전 날짜"
            disabled={isLoading}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Box style={{ flex: "1", textAlign: "center" }}>
            <Button
              variant="ghost"
              onClick={() => {
                setCalendarViewDate(selectedDate);
                setIsCalendarOpen(!isCalendarOpen);
              }}
            >
              <Text weight="bold" size={{ initial: "3", sm: "5" }}>
                {getDisplayDate(selectedDate)}
              </Text>
            </Button>
            {isCalendarOpen && renderCalendar()}
          </Box>
          <IconButton
            variant="soft"
            onClick={() => moveDate(1)}
            aria-label="다음 날짜"
            disabled={isLoading}
          >
            <ChevronRightIcon />
          </IconButton>
        </Flex>

        <Box width="100%" style={contentWidthStyle}>
          {isLoading ? (
            <Flex
              align="center"
              justify="center"
              direction="column"
              gap="3"
              py="6"
            >
              <Text
                size={{ initial: "3", sm: "5" }}
                weight="medium"
                color="gray"
              >
                급식 정보를 불러오는 중...
              </Text>
            </Flex>
          ) : meals.length === 0 ? (
            <Flex
              align="center"
              justify="center"
              direction="column"
              gap="3"
              py="6"
            >
              <Text
                size={{ initial: "3", sm: "5" }}
                weight="medium"
                color="gray"
              >
                급식 정보가 없습니다
              </Text>
              <Text size="2" color="gray">
                해당 날짜에 등록된 급식 정보가 없거나 주말입니다
              </Text>
            </Flex>
          ) : (
            <Flex
              direction="column"
              style={{ width: "100%", overflowX: "auto" }}
            >
              <ScrollArea>
                <RadioCards.Root
                  value={selectedMeal?.name}
                  onValueChange={(name) => handleSelectMeal(name)}
                >
                  <Flex
                    direction="row"
                    gap="3"
                    align="center"
                    justify="center"
                    p="2"
                    style={{
                      minWidth: "fit-content",
                      width: "100%",
                    }}
                  >
                    {meals.map((meal, index) => (
                      <MealInfo
                        key={index}
                        meal={meal}
                        index={index}
                        onSelectMeal={() => handleSelectMeal(meal.name)}
                      />
                    ))}
                  </Flex>
                </RadioCards.Root>
              </ScrollArea>
              <Comment
                meal={selectedMeal}
                contentWidthStyle={contentWidthStyle}
              />
            </Flex>
          )}
        </Box>
      </Flex>
      <CalorieAnalysisDialog
        open={isCalorieDialogOpen}
        onOpenChange={setIsCalorieDialogOpen}
        selectedMeal={selectedMeal}
      />
    </>
  );
};

export default MealPage;
