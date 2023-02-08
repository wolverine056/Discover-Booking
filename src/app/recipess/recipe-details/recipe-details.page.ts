import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RecipeSerivceService } from 'src/app/recipe-serivce.service';
import { recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
recipe:recipe;
  constructor(private actRoutes:ActivatedRoute,
    private recipeservice:RecipeSerivceService,
    private route:Router,
    private alertctrl:AlertController
    ) { }

  ngOnInit() {
    this.actRoutes.paramMap.subscribe(param=>{
      if(!param.has('recipeid')){
        this.route.navigate(['/recipess']);
        return;
      }
      const selecteditem=param.get('recipeid');
      this.recipe=this.recipeservice.getrecipe(selecteditem);

    })
  }
  ondeleterecipe(){
    this.alertctrl.create({
      header:'Are you sure?',
      message:'Do you want to delete the item',
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Delete',
          handler:()=>{
            this.recipeservice.deleterecipe(this.recipe.id);
            this.route.navigate(['/recipess']);
          }
        }
      ]
    })
    .then(alertAL=>{
      alertAL.present();
    });


  }


}
