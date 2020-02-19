import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-deletemarker',
  templateUrl: './deletemarker.component.html',
  styleUrls: ['./deletemarker.component.css']
})
export class DeletemarkerComponent implements OnInit {
  coffee;
  marker;
  items = [];


  constructor(private afs: AngularFirestore) {
  }


  async ngOnInit() {
    var count = 0;
    this.afs.collection('markers').valueChanges().subscribe(
      val => {
        if (val) {
          // @ts-ignore
          console.log('marker name' + val[0].markerName);

          while (count < Object.keys(val).length) {
            //@ts-ignore
            this.items.push(val[count++].markerName);

          }
          console.log(this.items);
        }


      });


  }

  async deleteMarker(data) {
    //  console.log("this is markers"+data);
    //  this.afs.collection("markers",ref =>ref.where ('markerName','==',data)).doc().delete();

    // this.afs.collection('markers',ref=>ref.where('markerName','==',data)).valueChanges()
    const docs = await this.afs.firestore
      .collection('markers')
      .where('markerName', '==', data)
      .get();

    docs.docs.map((doc) => {
      this.afs.firestore
        .collection('markers')
        .doc(doc.id)
        .delete().then(() => console.log('delete'));
    });


  }

}


