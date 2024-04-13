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

export enum QuestionType {
    MCQ = 'MCQ',
    MATCH = 'MATCH',
    READING = 'READING',
}

export interface Question {
    question: string;
    options: string[];
    answer: string;
    type: QuestionType;
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
