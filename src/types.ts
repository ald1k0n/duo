export interface CreateUserRequest {
    email: string;
    password: string;
}

export interface GetUserResponse {
    id: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface JwtResponse {
    type: string;
    accessToken: string;
    refreshToken: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

export interface Question {
    question: string;
    options: string[];
    answer: number;
}

export interface Lesson {
    title: string;
    questions: Question[];
    passedStudentIds: string[];
}

type Instant = string;

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
    createdAt: Instant;
    createdBy: string;
    updatedAt: Instant;
    updatedBy: string;
}

export interface PassModuleParams {
    moduleId: string;
    lessonIndex: number;
}
