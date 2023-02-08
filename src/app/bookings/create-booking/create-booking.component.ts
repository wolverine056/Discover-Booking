import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

    @Input() hotel:place;
    @Input() selectedmode:'select'|'random';
    @ViewChild('f',{static:true}) from:NgForm

    startdate:string;
    enddate:string;

  constructor(private modctrl:ModalController) { }

  ngOnInit() {
    const availablefrom=new Date(this.hotel.availablefrom);
    const availableto=new Date(this.hotel.availableTo);
    if (this.selectedmode==='random'){
      this.startdate=new Date(availablefrom.getTime()+Math.random()
      *(availableto.getTime()-7*24*60*60*1000-availablefrom.
      getTime() )) .toISOString()
      this.enddate=new Date( new Date(this.startdate).getTime()+
      Math.random()*(new Date(this.startdate).getTime()+6*24*60*60*1000
       - new Date(this.startdate).getTime())).toISOString();
    }
  }

  oncancel(){
    this.modctrl.dismiss(null,'cancel');
  }

  onbookplace(){
    if(!this.from.valid || !this.datesValid){
      return
    }
    this.modctrl.dismiss({bookingData:{
      firstName:this.from.value['first-name'],
      lastName:this.from.value['last-name'],
      guestNmuber:this.from.value['guest-number'],
      startDate:this.from.value['date-from'],
      endDate:this.from.value['date-to']
    }},'confirm')
  }

  datesValid(){
    const startDate= new Date(this.from.value['date-form']);
    const endDate=new Date(this.from.value['date-to']);
    return endDate > startDate;
  }
}
