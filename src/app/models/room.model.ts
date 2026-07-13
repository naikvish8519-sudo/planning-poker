import { User } from "./user.model";

export interface Room {

  id: string;

  host: string;

  revealed: boolean;

  users: {
    [key: string]: User;
  };

}