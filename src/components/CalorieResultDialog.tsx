import { Box, Button, Dialog, Flex, Spinner, Text } from "@radix-ui/themes";

import { CalorieData } from "../dtos/calorie";


interface CalorieResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calorieData: CalorieData | null;
  setCalorieData: (data: CalorieData | null) => void;
  isLoading: boolean;
}

const CalorieResultDialog = ({
  open,
  onOpenChange,
  setCalorieData,
  calorieData,
  isLoading,
}: CalorieResultDialogProps) => {
  const handleClose = () => {
    onOpenChange(false);
    setCalorieData(null);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>칼로리 분석 결과</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {isLoading ? "칼로리 분석 중입니다..." : "사진을 통해 분석된 칼로리 정보입니다."}
        </Dialog.Description>

        <Flex direction="column" gap="3" >
          {isLoading &&
            <Spinner size="2" style={{
              justifySelf: "center",
              alignSelf: "center",
            }} />}
          {!isLoading && calorieData && (
            <Box>
              <Box mt="2">
                {calorieData.total_calories === 0 ?
                  <Flex>
                    <Text color="red" size="2">제공된 이미지에서 칼로리 정보를 찾을 수 없습니다.<br />다른 사진으로 다시 시도해 주세요.</Text>
                  </Flex> : (
                    calorieData.meals.map((item, index) => (
                      <Flex key={index} justify="between">
                        <Text size="2">{item.name}</Text>
                        <Text size="2">{item.calories} kcal</Text>
                      </Flex>
                    ))
                  )}
                {calorieData.total_calories !== 0 &&
                  <Text size="2" weight="bold">총 칼로리: {calorieData.total_calories} kcal</Text>
                }
              </Box>
            </Box>
          )}
          {!isLoading && calorieData && calorieData.total_calories !== 0 && (
            <Text size="1" color="gray">
              ※ 본 칼로리 정보는 LLM 기반 분석 결과로, 의학적/영양학적 조언이 아니며<br />
              실제 섭취량과 다를 수 있습니다.
            </Text>
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

export default CalorieResultDialog;
