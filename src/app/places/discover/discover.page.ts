import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit , OnDestroy{
loadedplaces:place[];
placeSub:Subscription
isloading=true;
  constructor(private placeservice:PlacesService) { }

  ngOnInit() {

    this.placeservice._places.subscribe(places=>{
      this.loadedplaces=places;
    });
  }
  onFilterupdate(event:CustomEvent<SegmentChangeEventDetail>){
      console.log(event.detail)
  }
  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }
}
