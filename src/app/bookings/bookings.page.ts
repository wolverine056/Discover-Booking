import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Booking } from './booking.model';
import { BookingserviceService } from './bookingservice.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
   loadbooking:Booking[];
  constructor(private bookingservice:BookingserviceService) { }

  ngOnInit() {
    this.loadbooking=this.bookingservice.bookings;
    }
    deleteit(id,slide:IonItemSliding){
        slide.close();
        console.log('deleted');
    }

}
