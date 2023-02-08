import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipessPage } from './recipess.page';

const routes: Routes = [
  {
    path: '',
    component: RecipessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipessPageRoutingModule {}
