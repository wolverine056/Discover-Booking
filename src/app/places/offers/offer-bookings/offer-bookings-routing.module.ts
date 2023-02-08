import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditOfferPage } from '../edit-offer/edit-offer.page';

import { OfferBookingsPage } from './offer-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: OfferBookingsPage
  },
  {
    path:':placeid',
    component:EditOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferBookingsPageRoutingModule {}
