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
  items: Array<string>;
  
  
  constructor(private afs: AngularFirestore ) {}
  coffees = ["Americano", "Flat White", "Cappuccino", "Latte", "Espresso", "Machiato", "Mocha", "Hot Chocolate", "Tea"];

  
  addCoffee(coffee){ }
  
  async ngOnInit()
  {
  var count=0;
   this.afs.collection("markers").valueChanges().subscribe(
     val=>{
       if(val){
         console.log(val)
        let i
        for(i =0;i<val.length;i++){
                    //@ts-ignore

            console.log(val[i].markerName);
                                //@ts-ignore

                         this.items.push(val[i].markerName);

             
       }
       
     } 

  });
  console.log(this.items);
  
 
  } 
}
