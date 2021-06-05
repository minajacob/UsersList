export interface IFilter {
    page: number;
    per_page: number;
}

export interface IListResponse extends IFilter {
    data: IUser[];
    support: { text: string, url: string };
    total: number;
    total_pages: number
}

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}