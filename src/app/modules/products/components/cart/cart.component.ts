import { Component, OnInit } from "@angular/core";
import { MessagesService } from "src/app/shared/services/messages.service";
import { Product } from "../../models/products";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  submitted = false;
  cartProduct: Product[] = [];
  totalPrice: any;
  total: any;

  constructor(
    private messages: MessagesService,

  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    if ("cart" in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!);

    }
  }

  changAmount(e:any) {
    if (true) {
      localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    }
  }

  deletProduct(index: number) {
    this.cartProduct.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    this.messages.openSnackBar(
      "The product has been deleted successfully",
      "Success"
    );
  }
}
