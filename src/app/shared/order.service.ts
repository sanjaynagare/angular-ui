import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  form: FormGroup=new FormGroup({
    $key:new FormControl(null),
    orderName:new FormControl('',Validators.required),
    description:new FormControl(''), 
    amount:new FormControl('',Validators.required),
    email:new FormControl('',Validators.email), 
    mobile:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]), 
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      orderName:'',
      description:'',  
      amount:'',
      email:'', 
      mobile:''
    })
  }
}
