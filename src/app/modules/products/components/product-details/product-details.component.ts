import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from "../../models/products";
import { ProductsService } from "../../services/products.service";
import { NgxSpinnerService } from "ngx-spinner";
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id:any;
  dataLoad = false;
  cartProduct: Product[] = [];
  productData: Product = {
    amount: 0,
    price: 0,
  };
  subscription:Subscription = new Subscription();

  constructor(
    private router:Router,
    private _products:ProductsService,
    private spinner: NgxSpinnerService,
    private activateRouter:ActivatedRoute,
    private messages: MessagesService

  ) { }

  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];
    if(this.id){
      this.getData();
    } else {
      this.router.navigate(['products/list']);
    }
  }

  getData(){
    this.spinner.show();
    this.subscription.add(
      this._products.getProductsList().subscribe(
        (res) => {
          this.cartProduct = res
          this.dataLoad = true;
          this.spinner.hide();
          this.productData = res.filter(
            (productData: any) => productData.id == this.id
          )[0];
          res.map((productsList: any) => {
            productsList.amount = 1;
            return productsList;
          });
        },error => {
        this.spinner.hide();
      })
    )
  }

  addProduct(id: any) {
    if ("cart" in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProduct.find((itme) => itme.id == id);
      if (exist) {
        this.messages.openSnackBar("product is already in your cart" , "Error");
      } else {
        this.cartProduct.push(this.productData);
        localStorage.setItem("cart", JSON.stringify(this.cartProduct));
        this.messages.openSnackBar("Product Added successfully", "Success");
      }
    } else {
      this.cartProduct.push(this.productData);
      localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
