import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/services/products.service';
import{startWith, map, catchError} from 'rxjs/operators';
import { AppDataState, DataStateEnum } from 'src/app/states/product.state';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
products:Observable<AppDataState<Product[]>>|null=null; 
readonly DataStateEnum=DataStateEnum;
  constructor(private productsService: ProductsService, private router:Router) { }

  ngOnInit(): void {
  }
onGetAllProducts(){
  console.log("start...");
  this.products=this.productsService.getAllProducts().pipe(
    
    map(data=>({dataState:DataStateEnum.LOADED, data:data})
      )),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}));
  } 
onGetAvailableProducts(){ 

    console.log("start...");
    this.products=this.productsService.getAvailableProducts().pipe(
      
      map(data=>({dataState:DataStateEnum.LOADED, data:data})
        )),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}));
    }
  
onGetSelectedProducts(){
  console.log("start...");
  this.products=this.productsService.getSelectedProducts().pipe(
    
    map(data=>({dataState:DataStateEnum.LOADED, data:data})
      )),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}));
  }
onGetStateProducts(){
  console.log("start...");
  this.products=this.productsService.getStateOfProducts().pipe(
    
    map(data=>({dataState:DataStateEnum.LOADED, data:data})
      )),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}));
  }

  onSearchProducts(dataForm: any){
    console.log("start...");
    this.products=this.productsService.searchProducts(dataForm.keyWord).pipe(
      
      map(data=>({dataState:DataStateEnum.LOADED, data:data})
        )),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}));
    }
onSelectProduct(p:Product){
  this.productsService.selectProduct(p).subscribe(data=>{
    p.selected=data.selected;
  })
}
onDeleteProduct(p:Product){
  let c=confirm('Etes-vous sur de vouloir supprimer ?');
  if(c==true)
  this.productsService.deleteProduct(p).subscribe(data=>{
    this.onGetAllProducts();
  })
}
onNewProduct(){
  this.router.navigateByUrl("/newProduct");
}
onEditProduct(p:Product){
  this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
