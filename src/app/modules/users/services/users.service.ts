import { Injectable } from "@angular/core";
import { IFilter, IListResponse, IUser } from "src/app/base/api.model";
import { BaseApiService } from "src/app/base/ApiService";

@Injectable()
export class UsersService extends BaseApiService {

    protected controllerName: string = "users";

    list(filter: IFilter) {
        return this.get<IListResponse>("", filter);
    }

    add(user: IUser) {
        return this.post("",user);
    }
}