export interface Student {
  id: string;
  email: string;
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  dateBirth: number;
  studyGroup: string;
  role?: string;
}

export enum ROLES {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

