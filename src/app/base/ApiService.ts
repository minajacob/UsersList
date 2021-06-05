import { HttpClient } from "@angular/common/http";
import { Directive } from "@angular/core";
import { environment } from "src/environments/environment";

@Directive()
export abstract class BaseApiService {

    protected readonly abstract controllerName: string;
    private serverUrl = environment.serverUrl;

    constructor(private httpClient: HttpClient) { }

    protected get<T>(action: string, params: { [key: string]: any } = {}) {
        return this.httpClient.get<T>(`${this.serverUrl}${this.controllerName}/${action}`, { params: params });
    }

    protected post(action: string, params: object) {
        return this.httpClient.post(`${this.serverUrl}${this.controllerName}/${action}`, params);
    }
}