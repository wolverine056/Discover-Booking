import { Injectable } from '@angular/core';
import { recipe } from './recipess/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeSerivceService {
  recip:recipe[]=[
    {
    id:'item1',
    title:'Chicken Fry',
    imgUrl:'https://www.dinneratthezoo.com/wp-content/uploads/2018/10/roasted-chicken-4-500x500.jpg',
    ingredients:['Chicken','Grains', 'Olive oil']
    },
    {
    id:'item2',
    title:'Burger',
    imgUrl:'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246__480.jpg',
    ingredients:['Bread','Cheese', 'Masala']
    }
  ]
  constructor() { }

  getallrecipes(){
    return [...this.recip]
  }
  getrecipe(recipeID:string){
    return {...this.recip.find(recipe=>{
      return(recipe.id==recipeID)
    })

    }
  }
  deleterecipe(recipeid:string){
    this.recip=this.recip.filter(recipe=>{
      return recipe.id!==recipeid;
    })
  }
}
