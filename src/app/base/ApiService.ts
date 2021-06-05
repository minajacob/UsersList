import { HttpClient } from "@angular/common/http";
import { Directive } from "@angular/core";
import { environment } from "src/environments/environment";

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

    protected get<T>(action: string, params: { [key: string]: any } = {}) {
        return this.httpClient.get<T>(this.fullUrl(action), { params: params });
    }

    protected post(action: string, params: object) {
        return this.httpClient.post(this.fullUrl(action), params);
    }
}