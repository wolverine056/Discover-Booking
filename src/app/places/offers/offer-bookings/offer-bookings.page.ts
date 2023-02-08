import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit,OnDestroy {
places:place;
placeSub:Subscription;
  constructor(private route:ActivatedRoute,
    private nav:NavController,
    private placeservice:PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param=>{
      if(!param.has('placeid')){
         this.nav.navigateBack('/places/tabs/offers')
         return
      }

      this.placeSub= this.placeservice.getplace(param.get('placeid')).subscribe(place=>{
        this.places=place
      });
      console.log(this.places)
    })
  }
  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
