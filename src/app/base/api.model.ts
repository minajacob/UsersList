export interface IFilter {
    page: number;
    per_page: number;
}

export interface ISupport {
    text: string;
    url: string
}
export interface IListResponse extends IFilter {
    data: IUser[];
    support: ISupport;
    total: number;
    total_pages: number
}

export interface IGetUserData {
    data: IUser;
    support: ISupport;
}

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
    createdAt?: any;
}