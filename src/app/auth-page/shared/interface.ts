export interface UserPayload {
  payload: UserAuthPayload;
  access_token: string;
}

interface UserAuthPayload {
  email: string;
  userName: string;
}
