import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
productId!:number;
submitted:boolean=false;
  productFormGroup!: FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private prodService: ProductsService,
    private formBuider: FormBuilder) { 
    this.productId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.prodService.editProduct(this.productId)
    .subscribe(product=>{
      this.productFormGroup=this.formBuider.group({
        id:[product.id, Validators.required],     
        name:[product.name, Validators.required],
        price:[product.price, Validators.required],
        quantity:[product.quantity, Validators.required],
        available:[product.available, Validators.required],
        selected:[product.selected, Validators.required],
        state:[product.state, Validators.required]

      })
    });

  }
  onUpdateProduct(){
   
      this.submitted=true;
      if(this.productFormGroup?.invalid) return;
    
      this.prodService.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("success Product Update");
      })
    }
  

}
