import { useState } from "react";
import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { requestimageasync } from "../api";
import { CalorieData } from "../dtos/calorie";
import { Meal } from "../types";

interface CalorieAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMeal: Meal | null;
}

const CalorieAnalysisDialog = ({
  open,
  onOpenChange,
  selectedMeal,
}: CalorieAnalysisDialogProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [calorieData, setCalorieData] = useState<CalorieData | null>(null);
  const [isCalorieLoading, setIsCalorieLoading] = useState(false);
  const [calorieError, setCalorieError] = useState<string | null>(null);

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

  const handleClose = () => {
    onOpenChange(false);
    // Dialog가 닫힐 때 상태 초기화
    setSelectedImage(null);
    setCalorieData(null);
    setIsCalorieLoading(false);
    setCalorieError(null);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>칼로리 분석</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          급식 사진을 업로드하여 칼로리를 분석하세요.
        </Dialog.Description>

        <Flex direction="column" gap="3">
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
              <Text size="4" weight="bold">
                분석 결과
              </Text>
              <Text as="p">총 칼로리: {calorieData.total_calories}</Text>
              <ul>
                {calorieData.meals.map((meal, index) => (
                  <li key={index}>
                    <Text as="span" weight="bold">
                      {meal.name}:
                    </Text>{" "}
                    {meal.calories ? `${meal.calories} kcal` : "정보 없음"}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={handleClose}>
              닫기
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CalorieAnalysisDialog;
