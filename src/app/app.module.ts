import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {routingComponents} from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule,ToastrService} from 'ngx-toastr';
import {NotificationService} from '../app/Services/notification.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {LoaderInterceptorService} from './Services/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [NotificationService,ToastrService,{provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
