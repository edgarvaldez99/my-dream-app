export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  ci?: string;
  status?: string;
}
