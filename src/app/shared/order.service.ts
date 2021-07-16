import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private REST_API_SERVER = "http://localhost:8080/OMS";
  private URI_GET_ORDERS="/orders";
  private URI_INSERT_ORDER="/order/create";
  private URI_DELETE_ORDER=this.REST_API_SERVER+"/order/delete";
  private URI_UPDATE_ORDER=this.REST_API_SERVER+"/order/update";

  constructor(private httpClient: HttpClient) { }
  
  getOrders(){
    return this.httpClient.get(this.REST_API_SERVER+this.URI_GET_ORDERS);
  }
  insertOrder(newOrderData)  {
    return this.httpClient.post(this.REST_API_SERVER+this.URI_INSERT_ORDER, newOrderData);
  }
  updateOrder(updatedOrderData,orderId): Observable<any> {
    return this.httpClient.put(`${this.URI_UPDATE_ORDER}/${orderId}`, updatedOrderData);
  }
  deleteOrder(orderId): Observable<any> {
    console.log("in delete orderId="+orderId);
    return this.httpClient.delete(`${this.URI_DELETE_ORDER}/${orderId}`);
  }
  populateForm(order) {
    this.form.setValue(order);
  }
  form: FormGroup=new FormGroup({
    $key:new FormControl(null),
    orderId:new FormControl(''),
    orderName:new FormControl('',Validators.required),
    orderDescription:new FormControl(''), 
    orderAmount:new FormControl('',Validators.required),
    emailID:new FormControl('',Validators.email), 
    mobileNumber:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    deliveryAddress:new FormControl(''),  
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      orderId:'',
      orderName:'',
      orderDescription:'',  
      orderAmount:'',
      deliveryAddress:'', 
      emailID:'',
      mobileNumber:''
    })
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
