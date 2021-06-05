import { IUser } from "src/app/base/api.model";

export interface IUserDialogData {
    editMode?: boolean;
    viewMode?: boolean;
    user: IUser;
    title?: string;
}