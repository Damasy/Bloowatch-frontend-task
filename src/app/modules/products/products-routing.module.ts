import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: 'list',
    component : ProductsListComponent
  },
  {
    path: 'cart',
    component : CartComponent
  },
  {
    path: 'product/:id',
    component : ProductDetailsComponent
  },
  {
    path: 'product',
    redirectTo : 'list'
  },
  {
    path : '',
    redirectTo : 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
