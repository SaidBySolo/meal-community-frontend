import { Box, Flex, RadioCards, Text } from "@radix-ui/themes";
import { Meal } from "../types";

interface MealInfoProps {
  meal: Meal;
  index: number;
  onSelectMeal?: (mealName: string) => void;
}

const MealInfo = ({ meal, onSelectMeal }: MealInfoProps) => {
  const handleSelect = () => {
    if (onSelectMeal) {
      onSelectMeal(meal.name);
    }
  };

  return (
    <RadioCards.Item
      value={meal.name}
      onClick={handleSelect}
      style={{
        width: "clamp(250px, 30vw, 300px)",
        aspectRatio: "4/5",
        margin: "0.5rem",
        padding: "0.5rem",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Flex direction="column" style={{ height: "100%", width: "100%" }}>
        {/* 식사 유형 헤더 */}
        <Box style={{
          padding: "0.5rem",
          borderBottom: "1px solid var(--gray-5)",
          backgroundColor: "var(--gray-2)",
          borderRadius: "0.25rem"
        }}>
          <Text
            weight="bold"
            size={{ initial: "3", sm: "4" }}
            style={{
              textAlign: "center",
              color: "var(--gray-12)"
            }}
          >
            {meal.name}
          </Text>
        </Box>

        {/* 메뉴 목록 - 내부 레이아웃 꽉 차게 수정 */}
        <Box style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.5rem 0",
          display: "flex",
          flexDirection: "column",
          pointerEvents: "auto",
        }}>
          {meal.dish_name.split("<br/>").map((dish, idx) => (
            <Flex
              key={idx}
              align="start"
              style={{
                padding: "0.25rem 0.5rem",
                borderBottom: idx < meal.dish_name.split("<br/>").length - 1 ? "1px dashed var(--gray-4)" : "none",
                width: "100%"
              }}
            >
              <Text
                size={{ initial: "2", sm: "2" }}
                style={{
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                  width: "100%",
                  display: "block",
                  padding: "0"
                }}
              >
                {dish.trim()}
              </Text>
            </Flex>
          ))}
        </Box>

        {/* 칼로리 정보 */}
        {meal.calorie && (
          <Box
            style={{
              marginTop: "auto",
              padding: "0.5rem",
              borderTop: "1px solid var(--gray-5)",
              backgroundColor: "var(--gray-1)",
              borderRadius: "0.25rem"
            }}
          >
            <Text
              size="1"
              color="gray"
              style={{
                textAlign: "right"
              }}
            >
              칼로리: {meal.calorie || "정보 없음"}
            </Text>
          </Box>
        )}
      </Flex>
    </RadioCards.Item>
  );
};

export default MealInfo;
