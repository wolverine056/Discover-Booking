import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit,OnDestroy {
places;
placeSub:Subscription;
  constructor(private r:Router,
    private route:ActivatedRoute,
    private placeser:PlacesService,
    private nav:NavController,
    private modctrl:ModalController,
    private actionsheetctrl:ActionSheetController
    ) { }

  ngOnInit() {


    this.route.paramMap.subscribe(param=>{
      if(!param.has('placeid')){

        this.nav.navigateBack('places/tabs/discover')
        return;
      }

      this.placeSub=this.placeser.getplace( param.get('placeid')).subscribe(place=>{
        this.places=place;
      });

      console.log(this.places)
    })
  }
  Onbookplace(){
      //this.r.navigateByUrl('/places/tabs/discover');
    //this.nav.navigateBack('/places/tabs/discover');
    this.actionsheetctrl.create({
      header: 'choose an Action',
      buttons:[
        {
          text:'Select date',
          handler:()=>{
            this.openBookModel('select')
          }
        },
        {
          text:'Random date',
          handler:()=>{
            this.openBookModel('random')
          }
        },
        {
          text:'Cancel',
          role:'cancel'
        }
      ]
    }
  )
  .then(actionAL=>{
    actionAL.present();
  })


    }
    openBookModel(mode:'select' | 'random'){
      console.log(mode)
      this.modctrl.create({component: CreateBookingComponent,
        componentProps:{hotel:this.places, selectedmode:mode }
      })
      .then(modelEl=>{
        modelEl.present();
        return modelEl.onDidDismiss();
      })
      .then(resultData=>{
      console.log(resultData.data,resultData.role);
      if(resultData.role==='confirm'){
      console.log('BOOKED')
      };
      })
      }
      ngOnDestroy(): void {
        if(this.placeSub){
          this.placeSub.unsubscribe;
        }
      }
}
