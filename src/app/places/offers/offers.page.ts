import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit,OnDestroy {
offerslist:place[];
private placeSub:Subscription;
isloading=false;
  constructor(private placeservice:PlacesService) { }

  ngOnInit() {

    this.placeSub= this.placeservice.fetchplaces().subscribe(placess=>{
      this.offerslist=placess;

    });
  }
  Onedit(id:string,ionslide:IonItemSliding){
    ionslide.close();
    console.log(id);
  }
  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }
}
