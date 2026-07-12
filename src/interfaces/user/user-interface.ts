export interface UserInterface {
  id: string;
  name?: string | null;
  email?: string | null;
  username?: string | null;
}

export interface ActionResponse {
  ok: boolean;
  message: string;
  data?: UserInterface;
}
