import { Component } from '@angular/core';
import { BarService } from 'app/services/bar/bar.service';
import { Bar } from '../../models/bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
      
  list: Bar[] = [];
  loading: boolean = false;

  constructor(private barService: BarService) { }

     
  ngOnInit(): void {
    this.getListProducts();   
  }
  
   getListProducts(){
    this.loading = true;
    this.barService.getList().subscribe((data: Bar[])=>{
      this.list = data;
      console.log(data);
      this.loading = false;
    })

  }
 

}
