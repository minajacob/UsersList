import { Injectable } from "@angular/core";
import { IFilter, IListResponse } from "src/app/base/api.model";
import { BaseApiService } from "src/app/base/ApiService";

@Injectable()
export class listService extends BaseApiService {

    protected controllerName: string = "users";

    list(filter: IFilter) {
        return this.get<IListResponse>("", filter);
    }
}