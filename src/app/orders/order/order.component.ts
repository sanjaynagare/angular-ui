import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {OrderService} from '../../shared/order.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public service:OrderService,
    public dialogRef:MatDialogRef<OrderComponent>) { }
  //,private notificationService: NotificationService
  ngOnInit(): void {
    this.service.getOrders();
  }
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
 
  onSubmit() {
    if (this.service.form.valid) {
      console.log(this.service.form.value);
      const newOrderData = {
        orderId: this.service.form.value.orderId,
        orderName: this.service.form.value.orderName,
        orderDescription: this.service.form.value.orderDescription,
        orderAmount: this.service.form.value.orderAmount,
        deliveryAddress: this.service.form.value.deliveryAddress,
        emailID: this.service.form.value.emailID,
        mobileNumber: this.service.form.value.mobileNumber
      };
      if (this.service.form.get('$key').value=='edit') {
        this.service.updateOrder(newOrderData,this.service.form.get('orderId').value).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
      }
      else{
        this.service.insertOrder(newOrderData).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
      }
      


      this.service.form.reset();
      this.service.initializeFormGroup();
     // this.notificationService.success(':: Submitted successfully');
     this.onClose();
    }
  }
  
  onClose(){
    this.service.form.reset();
    this.dialogRef.close();
  }

}
