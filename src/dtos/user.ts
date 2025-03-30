
interface SchoolInfo {
    name: string;
    grade: number;
    room: number;
    edu_office_code: string;
    standard_school_code: string;

}

interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    school_info: SchoolInfo
}

export type {
    CreateUserDTO,
    SchoolInfo
}

