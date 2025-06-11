import { PrivateUserDTO } from "./user";

interface CreateCommentDTO {
    meal_id: number; //급식 ID
    content: string; //댓글 내용
    parent_id: number | null; //부모 댓글 ID (대댓글 작성 시 사용, 없으면 null)
}

interface GetCommentDTO {
    id: number; //댓글 ID
    content: string; //댓글 내용
    author: PrivateUserDTO; //작성자 이름
    replies: GetCommentDTO[]; //대댓글
    created_at: string; //생성일
    parent_id: number | null; //부모 댓글 ID (대댓글 작성 시 사용, 없으면 null)
}

export type {
    CreateCommentDTO,
    GetCommentDTO
}
