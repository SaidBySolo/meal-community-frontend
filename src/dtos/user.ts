
interface SchoolInfo {
    name: string;
    edu_office_code: string;
    standard_school_code: string;

}

interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    grade: number;
    room: number;
    school_info: SchoolInfo
}

interface PrivateUserDTO {
  name: string;
}

export type {
    CreateUserDTO,
    SchoolInfo,
    PrivateUserDTO
}

