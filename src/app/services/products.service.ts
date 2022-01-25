import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/products.model";

@Injectable({providedIn:'root'})
export class ProductsService{
    constructor(private http:HttpClient){}

    getAllProducts():Observable<Product[]>{
        //let host=environment.host;
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products");
    } 
  
    getAvailableProducts():Observable<Product[]>{
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products?available=true");
    } 

    getSelectedProducts():Observable<Product[]>{
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products?selected=true");
    }
    getStateOfProducts():Observable<Product[]>{
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products?state=Neuf");
    }
    searchProducts(keyWord: string):Observable<Product[]>{
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products?name_like="+keyWord);
    }
    selectProduct(product: Product):Observable<Product>{
        let host=environment.host;
        product.selected=!product.selected;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }
    deleteProduct(product: Product):Observable<void>{
        let host=environment.host;
       
        return this.http.delete<void>(host+"/products/"+product.id);
    }
    saveProduct(product: Product):Observable<Product>{
        let host=environment.host;
       return this.http.post<Product>(host+"/products",product);
    }

    editProduct(id:number):Observable<Product>{
        //let host=environment.host;
        let host=environment.host;
        return this.http.get<Product>(host+"/products/"+id);
    }
    updateProduct(product: Product):Observable<Product>{
        let host=environment.host;
        product.selected=!product.selected;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }
}