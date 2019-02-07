import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatCheckboxModule,
    AngularFireAuthModule,
  ],
  exports: []
})
export class AuthModule {

}
