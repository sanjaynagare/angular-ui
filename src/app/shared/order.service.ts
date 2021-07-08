import { Injectable } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  form: FormGroup=new FormGroup({
    $key:new FormControl(null),
    orderName:new FormControl(''), 
    description:new FormControl(''), 
    amount:new FormControl('') 
  });
}
