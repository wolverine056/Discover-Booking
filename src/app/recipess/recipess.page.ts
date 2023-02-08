import { Component, OnInit } from '@angular/core';
import { RecipeSerivceService } from '../recipe-serivce.service';
import { recipe } from './recipes.model';

@Component({
  selector: 'app-recipess',
  templateUrl: './recipess.page.html',
  styleUrls: ['./recipess.page.scss'],
})
export class RecipessPage implements OnInit {
recip:recipe[];
  constructor(private recipe:RecipeSerivceService) { }

  ngOnInit() {
  this.recip=this.recipe.getallrecipes();
  }

}
