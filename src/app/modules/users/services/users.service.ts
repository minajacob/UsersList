import { Injectable } from "@angular/core";
import { IFilter, IListResponse, IUser } from "src/app/base/api.model";
import { BaseApiService } from "src/app/base/ApiService";
import { msgToastr } from "src/app/base/Interceptors/toastr/toastr.interceptor";

@Injectable({
    providedIn: "root"
})
export class UsersService extends BaseApiService {

    protected controllerName: string = "users";

    list(filter: IFilter) {
        let getDto = this.createGetDto("", filter);
        return this.get<IListResponse>(getDto);
    }

    add(user: IUser) {
        let postDto = this.createPostDto("", user);
        postDto.context = msgToastr("User created successfully 😀");
        return this.post(postDto);
    }
}