export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  project: string;
}

export interface UserPayload {
  id: string;
  name: string;
}
