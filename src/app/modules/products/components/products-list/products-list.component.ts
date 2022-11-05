import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Product } from "../../models/products";
import { ProductsService } from "../../services/products.service";
import { NgxSpinnerService } from "ngx-spinner";
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productsList:Product[] = [];
  categoriesList = [];
  cartProduct:Product[] = [];
  productData :any;
  @Input() searchText:any



  params = {
    limit : 6,
    total:30
  }
  subscription:Subscription = new Subscription();

  constructor(
    private _products:ProductsService,
    private spinner: NgxSpinnerService,
    private messages: MessagesService,

  ) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(){
    this.spinner.show();
    this.subscription.add(
      this._products.getProductsList(this.params).subscribe(res => {
        this.spinner.hide();
        this.productsList = res;
      },error => {
        this.spinner.hide();
      })
    )
  }

  filterCategory(event: any) {
    if (event == 'All categories') {
      this.getProductsList();
    } else {
      this.getProductsOfCategory(event);
    }
  }

  getProductsOfCategory(param: any) {
    this.spinner.show();
    this.subscription.add(
      this._products.getProductsofCategory(param).subscribe(
        (res) => {
          this.spinner.hide();
          this.productsList = res;
        },
        (error) => {
          this.spinner.hide();
        }
      )
    );
  }
  searchProduct(event: any) {
    this.searchText = event;
  }

  addProduct(id:any){
    this.productData = this.productsList.filter((productData: any) => productData.id == id)[0]
    if("cart" in localStorage){
     this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
     let exist = this.cartProduct.find(itme => itme.id ==id)
     if(exist){
       this.messages.openSnackBar('product is already in your cart', 'Error');
   
     }
     else{
       this.cartProduct.push(this.productData)
       localStorage.setItem("cart" ,JSON.stringify(this.cartProduct))
       this.messages.openSnackBar('Product Added successfully', 'Success');
   
   
     }
    }
    else{
     this.cartProduct.push(this.productData)
     localStorage.setItem("cart" ,JSON.stringify(this.cartProduct))
    }
   
   
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
