import { Avatar, Box, Button, Card, Flex, IconButton, RadioCards, ScrollArea, Text, TextArea } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { requestGetDailyMeal, requestComment } from "../api";
import { Meal } from "../types";
import MealInfo from "./MealInfo";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import LogoutButton from "./LogoutButton";

const MealPage = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hasMeal, setHasMeal] = useState(true);
    const [selectedMealType, setSelectedMealType] = useState<string>("");
    const [commentInput, setCommentInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingRef = useRef(false);

    const [comments, setComments] = useState<requestComment[]>([]);

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

    const handleSelectMeal = (mealName: string) => {
        setSelectedMealType(mealName);
    };

    const handleCommentSubmit = () => {
        if (!commentInput.trim() || !selectedMealType) return;

        // 현재 날짜 및 시간 포맷팅
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0] + " " +
            now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

        // 새 댓글 객체 생성
        const newComment = {
            id: Date.now().toString(), // 임시 ID
            user: "사용자", // 실제 앱에서는 로그인한 사용자 정보 사용
            date: formattedDate,
            content: commentInput
        };

        // 선택된 식사 유형의 댓글 목록에 추가
        setComments(prev => ({
            ...prev,
            [selectedMealType]: [...(prev[selectedMealType] || []), newComment]
        }));

        // 입력 필드 초기화
        setCommentInput("");

        // 여기에서 실제 API 호출하여 댓글 저장 로직 추가 필요
    };

    useEffect(() => {
        const fetchData = async () => {
            if (isLoadingRef.current) return; // 이미 로딩 중이면 요청 방지
            isLoadingRef.current = true;

            setIsLoading(true);

            const response = await requestGetDailyMeal({
                date: formatDate(selectedDate)
            });

            if (!response.ok) {
                console.error("Failed to fetch meals");
                setMeals([]);
                setHasMeal(false);
                setIsLoading(false);
                isLoadingRef.current = false; // 로딩 상태 초기화
                return;
            }

            const result = await response.json();
            const mealResults = result.results as Meal[];
            setMeals(mealResults);
            setHasMeal(mealResults.length > 0);

            if (mealResults.length > 0) {
                const lunchMeal = mealResults.find(meal => meal.name === "중식");
                setSelectedMealType(lunchMeal ? lunchMeal.name : mealResults[0].name);
            } else {
                setSelectedMealType("");
            }

            setIsLoading(false);
            isLoadingRef.current = false; // 로딩 상태 초기화
        };

        fetchData();
    }, [selectedDate]);
    // 현재 선택된 식사 유형의 댓글만 필터링
    const currentComments = selectedMealType ? (comments[selectedMealType] || []) : [];

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
                    <Flex align="center" justify="center" direction="column" gap="3" py="6">
                        <Text size={{ initial: "3", sm: "5" }} weight="medium" color="gray">급식 정보를 불러오는 중...</Text>
                    </Flex>
                ) : !hasMeal || meals.length === 0 ? (
                    <Flex align="center" justify="center" direction="column" gap="3" py="6">
                        <Text size={{ initial: "3", sm: "5" }} weight="medium" color="gray">급식 정보가 없습니다</Text>
                        <Text size="2" color="gray">해당 날짜에 등록된 급식 정보가 없거나 주말입니다</Text>
                    </Flex>
                ) : (
                    <Box style={{ width: "100%", overflowX: "auto" }}>
                        <RadioCards.Root
                            defaultValue={meals[0]?.name}
                            value={selectedMealType}
                            onValueChange={setSelectedMealType}
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
                                        onSelectMeal={handleSelectMeal}
                                    />
                                ))}
                            </Flex>
                        </RadioCards.Root>
                    </Box>
                )}
            </Box>

            {/* 댓글 섹션 - 급식 메뉴와 동일한 너비 적용 */}
            {selectedMealType && (
                <Box
                    py="3"
                    style={contentWidthStyle}
                >
                    <Flex direction="column" gap="3" width="100%">
                        <Flex justify="between" align="baseline">
                            <Text weight="bold" size={{ initial: "3", sm: "4" }}>{selectedMealType} 댓글</Text>
                            <Text size="1" color="gray">총 {currentComments.length}개의 댓글</Text>
                        </Flex>

                        {/* 댓글 목록 */}
                        <ScrollArea style={{ flex: 1 }}>
                            <Flex direction="column" gap="2" width="100%">
                                {currentComments.length > 0 ? (
                                    currentComments.map(comment => (
                                        <Card key={comment.id} size={{ initial: "1", sm: "2" }}>
                                            <Flex gap="2" align="start">
                                                <Avatar
                                                    size={{ initial: "2", sm: "3" }}
                                                    fallback={comment.user.charAt(0).toUpperCase()}
                                                    radius="full"
                                                />
                                                <Box style={{ flex: 1 }}>
                                                    <Flex
                                                        gap="2"
                                                        align={{ initial: "start", sm: "center" }}
                                                        direction={{ initial: "column", sm: "row" }}
                                                        justify="between"
                                                        width="100%"
                                                    >
                                                        <Text as="div" size="2" weight="bold">{comment.user}</Text>
                                                        <Text as="div" size="1" color="gray">
                                                            {comment.date}
                                                        </Text>
                                                    </Flex>
                                                    <Text as="div" size="2" mt="1" style={{
                                                        wordBreak: "break-word"
                                                    }}>
                                                        {comment.content}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </Card>
                                    ))
                                ) : (
                                    <Flex align="center" justify="center" direction="column" p="4">
                                        <Text color="gray" size="2">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</Text>
                                    </Flex>
                                )}
                            </Flex>
                        </ScrollArea>

                        {/* 댓글 입력 */}
                        <Card size={{ initial: "1", sm: "2" }}>
                            <Flex direction="column" gap="2" width="100%">
                                <TextArea
                                    placeholder={`${selectedMealType}에 대한 댓글을 입력해 주세요.`}
                                    style={{ width: "100%" }}
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    rows={3}
                                />
                                <Flex justify="end">
                                    <Button
                                        variant="solid"
                                        aria-label="댓글 작성"
                                        color="blue"
                                        onClick={handleCommentSubmit}
                                        disabled={!commentInput.trim()}
                                    >
                                        작성
                                    </Button>
                                </Flex>
                            </Flex>
                        </Card>
                    </Flex>
                    <LogoutButton/>
                </Box>
            )}
        </Flex>
    );
}

export default MealPage;