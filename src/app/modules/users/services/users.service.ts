import { Injectable } from "@angular/core";
import { IFilter, IGetUserData, IListResponse, IUser } from "src/app/base/api.model";
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
        let userWithoutavater = { ...user };
        delete userWithoutavater.avatar;
        let postDto = this.createPostDto("", userWithoutavater);
        postDto.context = msgToastr("User created successfully 😀");
        return this.post(postDto);
    }

    update(user: IUser){
        let userWithoutavater = { ...user };
        delete userWithoutavater.avatar;
        let postDto = this.createPostDto(user.id, userWithoutavater);
        postDto.context = msgToastr("User updated successfully 😀");
        return this.put(postDto);
    }

    getById(userId: number) {
        let getDto = this.createGetDto(userId, {});
        return this.get<IGetUserData>(getDto);
    }

    deleteUser(userId: number) {
        let postDto = this.createPostDto(userId, {});
        postDto.context = msgToastr(`User id ${userId} deleted successfully 😀`);
        return this.delete(postDto);
    }
}