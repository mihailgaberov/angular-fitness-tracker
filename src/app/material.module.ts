import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule, MatTabsModule, MatCardModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule
  ]
})

export class MaterialModule {
}
