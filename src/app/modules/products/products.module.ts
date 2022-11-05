import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CartComponent } from './components/cart/cart.component';
import { AddtocartComponent } from './components/addtocart/addtocart.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    HeaderComponent,
    SidebarComponent,
    CartComponent,
    AddtocartComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule,
    MatButtonModule,
    NgbRatingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    Ng2SearchPipeModule,

  ]
})
export class ProductsModule { }
