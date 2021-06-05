import { TemplateRef } from "@angular/core";
import { Observable } from "rxjs";

export interface IDialogData {
    title: string;
    template?: TemplateRef<any> | null;
    context? : any;
    okText?: string;
    okColor?: "primary" | "warn";
    OkAction: Observable<void>;
}