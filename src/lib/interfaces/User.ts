import { UserRole } from "../enums";

export interface ICurrentUser {
    id: number;
    fullName: string;
    avatar: string;
    username: string;
    role: UserRole;
}

export interface IUser extends ICurrentUser {

}