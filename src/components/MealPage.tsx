import { Avatar, Box, Button, Card, Flex, IconButton, RadioCards, ScrollArea, Text, TextArea } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { requestGetDailyMeal,requestimageasync } from "../api";
import { Meal } from "../types";
import MealInfo from "./MealInfo";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Comment from "./Comment";

// 칼로리
import { CalorieData, CalorieInfo } from "../dtos/calorie";

const MealPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: Date) =>
    date.toISOString().split('T')[0].replace(/-/g, "");

  const getDisplayDate = (date: Date) =>
    date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "short" });

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0: Sunday, 6: Saturday
  };

  const moveDate = (days: number) => {
    setSelectedDate(prev => {
      let newDate = new Date(prev);
      do {
        newDate.setDate(newDate.getDate() + days);
      } while (isWeekend(newDate));
      return newDate;
    });
  };

  // 급식 선택 핸들러
  const handleSelectMeal = (mealName: string) => {
    setSelectedMeal(meals.find(meal => meal.name === mealName) || null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await requestGetDailyMeal({
        date: formatDate(selectedDate)
      });

      if (!response.ok) {
        console.error("Failed to fetch meals");
        setMeals([]);
        setSelectedMeal(null); // 급식 없으면 선택 해제
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      const mealResults = result.results as Meal[];
      setMeals(mealResults);

      if (mealResults.length > 0) {
        const firstMeal = mealResults.filter(meal => meal.name == "중식")[0];
        setSelectedMeal(firstMeal);
      } else {
        setSelectedMeal(null);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [selectedDate]);

  // 칼로리 변수
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [calorieData, setCalorieData] = useState<CalorieData | null>(null);
  const [isCalorieLoading, setIsCalorieLoading] = useState(false);
  const [calorieError, setCalorieError] = useState<string | null>(null);

  // 칼로리 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setCalorieData(null);
      setCalorieError(null);
    }
  };

const handleCalorieSubmit = async () => {
    if (!selectedMeal || !selectedImage) {
      setCalorieError("먼저 급식을 선택하고 이미지를 업로드해주세요.");
      return;
    }

    setIsCalorieLoading(true);
    setCalorieError(null);

    const data = await requestimageasync(selectedMeal.meal_id, selectedImage);

    if (data) {
      setCalorieData(data);
    } else {
      setCalorieError("칼로리 분석에 실패했습니다. 다시 시도해 주세요.");
    }
    
    setIsCalorieLoading(false);
  };

  // 컨텐츠 영역 공통 너비 스타일
  const contentWidthStyle = {
    width: "min(100%, 900px)",
    maxWidth: "100%",
    margin: "0 auto"
  };

  return (
    <Flex
      direction="column"
      align="center"
      gap="4"
      py="4"
      style={{
        width: "100%",
        maxWidth: "100%",
        padding: "var(--space-3)"
      }}
    >
      {/* 날짜 이동 버튼 - 최대 너비 설정 */}
      <Flex
        align="center"
        gap="2"
        mb="2"
        justify="center"
        style={contentWidthStyle}
      >
        <IconButton
          variant="soft"
          onClick={() => moveDate(-1)}
          aria-label="이전 날짜"
          disabled={isLoading}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Text weight="bold" size={{ initial: "3", sm: "5" }} style={{
          textAlign: "center",
          flex: "1",
          maxWidth: "60%"
        }}>
          {getDisplayDate(selectedDate)}
        </Text>
        <IconButton
          variant="soft"
          onClick={() => moveDate(1)}
          aria-label="다음 날짜"
          disabled={isLoading}
        >
          <ChevronRightIcon />
        </IconButton>
      </Flex>

      {/* 급식 정보 표시 */}
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
              weight="medium" color="gray">
              급식 정보를 불러오는 중...
            </Text>
          </Flex>
        ) : meals.length === 0 ? (
          <Flex
            align="center"
            justify="center"
            direction="column"
            gap="3"
            py="6">
            <Text size={{ initial: "3", sm: "5" }} weight="medium" color="gray">급식 정보가 없습니다</Text>
            <Text size="2" color="gray">해당 날짜에 등록된 급식 정보가 없거나 주말입니다</Text>
          </Flex>
        ) : (
          <Flex direction="column" style={{ width: "100%", overflowX: "auto" }}>
            <ScrollArea>
              <RadioCards.Root
                defaultValue={meals[0]?.name}
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
                    width: "100%"
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

            <Comment meal={selectedMeal} contentWidthStyle={contentWidthStyle} />
          </Flex >

        )}
      </Box>
      <Box width="100%" style={contentWidthStyle}>
        <Card size="2" my="4">
          <Flex direction="column" gap="3">
            <Text size="5" weight="bold">칼로리 분석</Text>

            {/* 파일 입력 필드 */}
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {/* 분석 시작 버튼 */}
            <Button
              onClick={handleCalorieSubmit}
              disabled={!selectedMeal || !selectedImage || isCalorieLoading}
              size="3"
            >
              {isCalorieLoading ? "분석 중..." : "이미지 분석 시작"}
            </Button>

            {/* 오류 메시지 표시 */}
            {calorieError && (
              <Text color="red" size="2">
                {calorieError}
              </Text>
            )}

            {/* 칼로리 분석 결과 표시 */}
            {calorieData && (
              <Box mt="3">
                <Text size="4" weight="bold">분석 결과</Text>
                <Text as="p">총 칼로리: {calorieData.total_calories}</Text>
                <ul>
                  {calorieData.meals.map((meal, index) => (
                    <li key={index}>
                      <Text as="span" weight="bold">{meal.name}:</Text>{" "}
                      {meal.calories ? `${meal.calories} kcal` : "정보 없음"}
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}

export default MealPage;