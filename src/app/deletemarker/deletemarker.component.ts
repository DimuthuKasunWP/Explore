import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-deletemarker',
  templateUrl: './deletemarker.component.html',
  styleUrls: ['./deletemarker.component.css']
})
export class DeletemarkerComponent implements OnInit {
  coffee;
  markers;
  items: any[];
  
  
  constructor(private afs: AngularFirestore ) {}
  coffees = ["Americano", "Flat White", "Cappuccino", "Latte", "Espresso", "Machiato", "Mocha", "Hot Chocolate", "Tea"];

  
  addCoffee(coffee){ }
  
  async ngOnInit()
  {
  var count=0;
   this.markers= await this.afs.collection("markers").valueChanges().subscribe(
     val=>{
       if(val){
         console.log(val)
        let i
        for(i =0;i<val.length;i++){
          //@ts-ignore
             this.items.push(val[i].markerName);
             
       }
       
     } 

  });
  setInterval(() => {
    console.log(this.items);
  },20000)
  
 
  } 
}
