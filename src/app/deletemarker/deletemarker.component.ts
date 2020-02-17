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
  items=[];


  constructor(private afs: AngularFirestore ) {}
  coffees = ["Americano", "Flat White", "Cappuccino", "Latte", "Espresso", "Machiato", "Mocha", "Hot Chocolate", "Tea"];


  addCoffee(coffee){ }

  async ngOnInit()
  {
  var count=0;
   this.afs.collection("markers").valueChanges().subscribe(
     val=>{
       if(val){
         // @ts-ignore
         console.log("marker name"+val[0].markerName);

        while(count<Object.keys(val).length){
          //@ts-ignore
             this.items.push(val[count++].markerName);

       }
         console.log(this.items);
     }

  });



  }
}
