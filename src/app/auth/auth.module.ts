import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    AngularFireAuthModule,
    SharedModule
  ],
  exports: []
})
export class AuthModule {

}
