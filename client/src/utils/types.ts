export interface UserResponse {
  message: string;
  user: UserProps;
}
export interface UserProps {
  id: number;
  email: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  profileSetup: boolean;
}

export interface ContactProps {
  id: number;
  userName: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}
