export interface UserResponse {
  message: string;
  user: {
    id: number;
    email: string;
    userName: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    profileSetup: boolean;
  };
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
