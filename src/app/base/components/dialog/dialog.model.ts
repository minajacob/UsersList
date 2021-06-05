import { TemplateRef } from "@angular/core";

export interface IDialogData {
    title: string;
    template?: TemplateRef<any> | null;
    context? : any;
}