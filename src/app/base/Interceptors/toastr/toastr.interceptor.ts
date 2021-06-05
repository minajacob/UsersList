import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


const SHOW_TOASTR = new HttpContextToken<boolean>(() => false);

export function showToastr() {
  return new HttpContext().set(SHOW_TOASTR, true);
}

const MSG_TOASTR = new HttpContextToken<string>(() => "");

export function msgToastr(msg: string) {
  let conx = new HttpContext();
  conx.set(MSG_TOASTR, msg);
  conx.set(SHOW_TOASTR, true);
  return conx
}

@Injectable()
export class ToastrInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((res) => {
      if (res instanceof HttpResponse && request.context.get(SHOW_TOASTR)) {
        this.toastr.success(request.context.get(MSG_TOASTR))
      }
    }),
    catchError((error) => {
      this.toastr.error("Something went wrong ! 😥")
      return throwError(error)
    }));
  }
}
