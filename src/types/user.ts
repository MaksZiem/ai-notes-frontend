export interface UserRole {
  role: 'USER' | 'ADMIN'
}

export interface User {
  id: number;
  email: string;
  role: UserRole;
}