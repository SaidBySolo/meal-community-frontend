
interface SchoolInfo {
  name: string;
  edu_office_code: string;
  standard_school_code: string;

}

interface User {
  name: string;
  email: string;
  school_info: SchoolInfo;
  grade: number;
  room: number;
  created_at: string;
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
  PrivateUserDTO,
  User
}

