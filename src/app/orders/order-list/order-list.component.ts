import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
constructor(private service:OrderService,private dialog:MatDialog) { }

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
searchKey:String;

listData:MatTableDataSource<any>;
displayedColumns: string[] = ['orderId','orderName','orderDescription','orderAmount','deliveryAddress','emailID','mobileNumber','actions'];
orders:any[];
destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.service.getOrders().subscribe((data: any[])=>{
      console.log("All orders="+data);
      this.orders = data;
      this.listData = new MatTableDataSource(this.orders);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    })
    
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    console.log("ngOnDestroy");
    this.destroy$.unsubscribe();
  }

  applyFilter() {
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(OrderComponent,dialogConfig)
  }

  onEdit(row){
    row.$key="edit";
    this.service.populateForm(row);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(OrderComponent,dialogConfig);
  }
  
  onDelete(row){
    if(confirm("Are you sure to delete selected Order?")){
    this.service.deleteOrder(row.orderId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
}
