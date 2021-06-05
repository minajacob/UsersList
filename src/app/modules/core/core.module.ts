import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastrInterceptor } from 'src/app/base/Interceptors/toastr/toastr.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: "toast-bottom-right" })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ToastrInterceptor, multi: true }
  ]
})
export class CoreModule { }
