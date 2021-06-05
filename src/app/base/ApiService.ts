import { HttpClient, HttpContext } from "@angular/common/http";
import { Directive } from "@angular/core";
import { environment } from "src/environments/environment";

export interface IApiDto {
    action: string;
    context: HttpContext;
}

export interface IGetOption extends IApiDto {
    params: { [key: string]: any }
}

export interface IPostOption extends IApiDto {
    body: object
}

@Directive()
export abstract class BaseApiService {

    protected readonly abstract controllerName: string;
    private serverUrl = environment.serverUrl;

    constructor(private httpClient: HttpClient) { }

    private fullUrl(action: string) {
        if (action) {
            return `${this.serverUrl}${this.controllerName}/${action}`
        }
        return `${this.serverUrl}${this.controllerName}`
    }

    protected createGetDto(action: string, params: { [key: string]: any } = {}) {
        return { action: action, params: params } as IGetOption;
    }

    protected createPostDto(action: string, body: object) {
        return { action: action, body: body } as IPostOption;
    }

    protected get<T>(getDto: IGetOption) {
        return this.httpClient.get<T>(this.fullUrl(getDto.action), { params: getDto.params, context: getDto.context });
    }

    protected post(postDto: IPostOption) {
        return this.httpClient.post(this.fullUrl(postDto.action), postDto.body, { context: postDto.context });
    }
}