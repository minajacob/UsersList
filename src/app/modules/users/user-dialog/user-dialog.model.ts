import { IUser } from "src/app/base/api.model";

export interface IUserDialogData {
    editMode?: boolean;
    user: IUser;
    title?: string;
}