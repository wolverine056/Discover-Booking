import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit,OnDestroy {
  places:place;
  placeSub:Subscription;
  form:FormGroup;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private navctrl:NavController,
              private placeservice:PlacesService,
              private loadingctrl:LoadingController,
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param=>{
      if(!param.has('placeid')){
        this.navctrl.navigateBack('/places/tabs/offers');
        return;
      }

      this.placeSub=this.placeservice.getplace(param.get('placeid')).subscribe(place=>{
        this.places=place;
        console.log(this.places)
      this.form=new FormGroup({
        title:new FormControl(this.places.title,{
          updateOn:'blur',
          validators:[Validators.required]
        }),
        description:new FormControl(this.places.description,{
          updateOn:'blur',
          validators:[Validators.required, Validators.maxLength(200)]
        })
      });
      });

    })

  }
  modifyOffer(){
    if(!this.form.valid){
      return
    }
    this.loadingctrl.create({
      message:'Updating place...'
    }).then(loadingEl=>{
      loadingEl.present();
      this.placeservice.updatePlaces(
        this.places.id,
        this.form.value.title,
        this.form.value.description
      ).subscribe(()=>{
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/offers'])
      });
    })

  }
  ngOnDestroy() {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
