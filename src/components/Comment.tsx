import { useEffect, useState } from "react";
import { CreateCommentDTO, GetCommentDTO } from "../dtos/comment";
import { Avatar, Box, Button, Card, Flex, ScrollArea, Text, TextArea } from "@radix-ui/themes";
import { Meal } from "../types";
import { requestComment, requestGetComment } from "../api";

const ReplyComment = ({ reply }: { reply: GetCommentDTO }) => {
  return <Card key={reply.id} size="1" style={{ background: "#f8f9fa" }}>
    <Flex gap="2" align="start">
      <Avatar
        size="1"
        fallback={reply.author?.name ? reply.author.name.charAt(0).toUpperCase() : "?"}
        radius="full"
      />
      <Box>
        <Flex gap="2" align="center">
          <Text size="1" weight="bold">{reply.author?.name || "알 수 없음"}</Text>
          <Text size="1" color="gray">{reply.created_at}</Text>
        </Flex>
        <Text size="2" style={{ wordBreak: "break-word" }}>{reply.content}</Text>
      </Box>
    </Flex>
  </Card>
}

const Comment = ({ meal, contentWidthStyle }: {
  meal: Meal | null,
  contentWidthStyle: React.CSSProperties

}) => {
  const [comments, setComments] = useState<GetCommentDTO[]>([]);
  const [commentInput, setCommentInput] = useState<string>("");
  const [replyInput, setReplyInput] = useState<{ [commentId: number]: string }>({});
  const [replyOpen, setReplyOpen] = useState<{ [commentId: number]: boolean }>({});

  // 댓글 작성 핸들러
  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;
    if (!meal) return

    // 댓글 생성 요청 본문 구성
    const createCommentDTO: CreateCommentDTO = {
      content: commentInput,
      meal_id: meal.meal_id,
      parent_id: null
    };

    try {
      // 서버에 댓글 생성 요청
      await requestComment(createCommentDTO);
      const result = await requestGetComment(meal.meal_id);
      setComments(result.results);
    } catch (error) {
      console.error("댓글 작성 중 오류:", error);
    }
    setCommentInput("");
  };

  // 대댓글 작성 핸들러
  const handleReplySubmit = async (parentId: number) => {
    if (!replyInput[parentId]?.trim()) return;
    if (!meal) return;
    const createCommentDTO: CreateCommentDTO = {
      content: replyInput[parentId],
      meal_id: meal.meal_id,
      parent_id: parentId
    };
    try {
      await requestComment(createCommentDTO);
      const result = await requestGetComment(meal.meal_id);
      setComments(result.results)
      setReplyInput(prev => ({ ...prev, [parentId]: "" }));
      setReplyOpen(prev => ({ ...prev, [parentId]: false }));
    } catch (error) { }
  };

  useEffect(() => {
    const loadComments = async () => {
      if (!meal?.meal_id) return;
      try {
        const result = await requestGetComment(meal.meal_id);
        setComments(result.results);
      } catch (error) {
        setComments([]);
      }
    };
    loadComments();
  }, [meal?.meal_id]);


  return (
    <Flex>
      {/* 댓글 섹션 - 급식 메뉴와 동일한 너비 적용 */}
      <Box
        py="3"
        style={contentWidthStyle}
      >
        <Flex direction="column" gap="3" width="100%">
          <Flex justify="between" align="baseline">
            <Text weight="bold" size={{ initial: "3", sm: "4" }}>{meal?.name} 댓글</Text>
            <Text size="1" color="gray">총 {(comments.length ?? 0)}개의 댓글</Text>
          </Flex>

          {/* 댓글 목록 */}
          <ScrollArea style={{ flex: 1 }}>
            <Flex direction="column" gap="2" width="100%">
              {comments.length > 0 ? (
                comments.map(comment => (
                  <Card key={comment.id} size={{ initial: "1", sm: "2" }}>
                    {/* 기존 댓글 UI */}
                    <Flex gap="2" align="start">
                      <Avatar
                        size={{ initial: "2", sm: "3" }}
                        fallback={comment.author?.name ? comment.author.name.charAt(0).toUpperCase() : "?"}
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
                          <Text as="div" size="2" weight="bold">
                            {comment.author?.name || "알 수 없음"}
                          </Text>
                          <Text as="div" size="1" color="gray">
                            {comment.created_at}
                          </Text>
                        </Flex>
                        <Text as="div" size="2" mt="1" style={{
                          wordBreak: "break-word"
                        }}>
                          {comment.content}
                        </Text>
                        <Button
                          size="1"
                          variant="ghost"
                          onClick={() => setReplyOpen(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                        >
                          답글
                        </Button>
                        {replyOpen[comment.id] && (
                          <Box mt="2">
                            <TextArea
                              value={replyInput[comment.id] || ""}
                              onChange={e => setReplyInput(prev => ({ ...prev, [comment.id]: e.target.value }))}
                              placeholder="답글을 입력하세요"
                              rows={2}
                            />
                            <Flex justify="end" mt="1">
                              <Button
                                size="1"
                                onClick={() => handleReplySubmit(comment.id)}
                                disabled={!replyInput[comment.id]?.trim()}
                              >
                                답글 작성
                              </Button>
                            </Flex>
                          </Box>
                        )}
                      </Box>
                    </Flex>
                    {/* 대댓글(답글) 목록 렌더링 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <Box ml="6" mt="2">
                        {comment.replies.map(reply => (
                          <ReplyComment key={reply.id} reply={reply} />
                        ))}
                      </Box>
                    )}
                  </Card>
                ))
              ) : (
                <Flex align="center" justify="center" direction="column" p="4">
                  <Text color="gray" size="2">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</Text>
                </Flex>
              )}
            </Flex>
          </ScrollArea>

          <Card size={{ initial: "1", sm: "2" }}>
            <Flex direction="column" gap="2" width="100%">
              <TextArea
                placeholder={`${meal?.name}에 대한 댓글을 입력해 주세요.`}
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
      </Box>

    </Flex>
  );
}

export default Comment;