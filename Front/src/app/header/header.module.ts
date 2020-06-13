import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,MatOptionModule,MatFormFieldModule,MatSelectModule,AppRoutingModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
