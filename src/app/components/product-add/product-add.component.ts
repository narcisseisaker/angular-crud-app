import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
productFormGroup!: FormGroup;
submitted!:boolean;
  constructor(private fb:FormBuilder, private prodService: ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({ 
     name:["", Validators.required],
      price:[0, Validators.required],
      quantity:[0, Validators.required],
      available:[true, Validators.required],
      selected:[true, Validators.required],
      state:["", Validators.required]
    });
  }

onSaveProduct(){
  this.submitted=true;
  if(this.productFormGroup?.invalid) return;

  this.prodService.saveProduct(this.productFormGroup?.value)
  .subscribe(data=>{
    alert("success saving product");
  })
}

}

