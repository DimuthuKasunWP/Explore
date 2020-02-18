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
  marker;
  items=[];


  constructor(private afs: AngularFirestore ) {}
  

  

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
  deleteMarker(data) {
    //  console.log("this is markers"+data);
    //  this.afs.collection("markers",ref =>ref.where ('markerName','==',data)).doc().delete();
      
    }
        
 }


