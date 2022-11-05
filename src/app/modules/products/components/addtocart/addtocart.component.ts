import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.scss']
})
export class AddtocartComponent implements OnInit {
 @Input() productData: any

 @Output() addProducts = new EventEmitter()

  constructor(

  ) { }

  ngOnInit(): void {

  }
  
   addProduct() {
    this.addProducts.emit(this.productData.id)
  }
  
  

}
