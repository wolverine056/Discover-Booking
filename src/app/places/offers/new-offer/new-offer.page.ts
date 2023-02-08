import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { OfferBookingsPage } from '../offer-bookings/offer-bookings.page';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
form:FormGroup;
  constructor(private placeservice:PlacesService,
              private route:Router,
              private loadingctrl:LoadingController
              ) { }

  ngOnInit() {
    this.form=new FormGroup({
      title:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required, Validators.maxLength(200)]
      }),
      price:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.min(1)]
      }),
      Datefrom:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      DateTo:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      })
    })

  }
  CreateOffer(){
    if(!this.form.valid){
      return;
    }
    this.loadingctrl.create({
      message:'Creating Place ...'
    })
    .then(loadingEl=>{
      loadingEl.present();
      this.placeservice.addPlace(this.form.value.title,
        this.form.value.description,
        +this.form.value.price,
        new Date(this.form.value.Datefrom),
        new Date(this.form.value.DateTo)
        ).subscribe(()=>{
          loadingEl.dismiss();
          this.form.reset();
          this.route.navigate(['/places/tabs/offers']);
        })
    })


  }

}
