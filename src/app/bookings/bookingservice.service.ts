import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {
 bookings:Booking[]=[
  new Booking(
    'id-1','dsdf','swamy','wolverine',2
  )
]
  constructor() { }

  getbookings(){
    return [...this.bookings];
  }
}
