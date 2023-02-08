import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { place } from './place.model';


interface placedata{

availableTo:string;
availablefrom:string;
description:string;
imgUrl:string;
price:number;
title:string;
userId:string;

}
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private auth:AuthService,
              private http:HttpClient
    ) { }
  private places=new BehaviorSubject<place[]>([
  // new place(
  //   '1',
  //   'Taj Bombay hotel',
  //   'side by sea with gate of india',
  //   'https://www.weddingsutra.com/images/the-taj-mahal-palace-img1.jpg',
  //   1200.85,
  //   new Date('1995-12-07'),
  //   new Date('2000-08-15'),
  //   'userid-one'
  // ),
  // new place(
  //   '2',
  //   'Taj Krishna',
  //   'with swimming pool besides helipad',
  //   'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/78/7b/e8/hotel-exterior.jpg?w=700&h=-1&s=1',
  //   1500.254,
  //   new Date('1999-06-20'),
  //   new Date('2005-11-05'),
  //   'userid-two'
  // ),
  // new place(
  //   '3',
  //   'Ranaprathap hotel',
  //   'with fort view on hill top',
  //   'https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Falaknuma_Palace/images/16x7/AAG_Pool-16x7.jpg',
  //   9500.254,
  //   new Date('2010-06-18'),
  //   new Date('2018-01-15'),
  //   'userid-three'
  // ),
  // new place(
  //   '4',
  //   'Taj Bombay hotel',
  //   'side by sea with gate of india',
  //   'https://www.weddingsutra.com/images/the-taj-mahal-palace-img1.jpg',
  //   1200.85,
  //   new Date('1985-07-07'),
  //   new Date('2020-12-26'),
  //   'userid-four'
  // ),

])
  get _places(){
    return this.places.asObservable();
  }
  getplace(id :string){
    return this.places.pipe(
      take(1),
      map(places=>{
        return {...places.find(p=>p.id===id)};
      })
    );
  }

  fetchplaces(){
    return this.http.get<{[key:string]:placedata}>
    ('https://ionic-706bb-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places.json')
    .pipe(map(resdata=>{
      const places=[];
      for(const key in resdata){
        if(resdata.hasOwnProperty(key)){
          places.push(new place(
            key,
            resdata[key].title,
            resdata[key].description,
            resdata[key].imgUrl,
            resdata[key].price,
            new Date(resdata[key].availablefrom),
            new Date(resdata[key].availableTo),
            resdata[key].userId
            ));
        }
      }
      return places;
    }),
    tap(places=>{
      this.places.next(places)
    })
    );
  }
  addPlace(title:string, description:string,price:number,dateFrom:Date,dateTo:Date){
    let generatedId:string;
    const newPlace=new place(
      Math.random().toString(),
     title,
     description,
    'https://www.weddingsutra.com/images/the-taj-mahal-palace-img1.jpg',
     price,
     dateFrom,
     dateTo,
     this.auth.userid
    );
      return this.http.post<{name:string}>('https://ionic-706bb-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places.json',
      {...newPlace,id:null})
      .pipe(
        switchMap(resdata=>{
          generatedId=resdata.name
          return this.places;
        }),
        take(1),
        tap(places=>{
          newPlace.id=generatedId;
          this.places.next(places.concat(newPlace));
        })
      )
      ;

    // return this._places.pipe(take(1),delay(1000),tap(p=>{
    //   setTimeout(()=>{
    //     this.places.next(p.concat(newPlace));
    //   },1000);

    //}))
  }

  updatePlaces(placeId:string,title:string,desceiption:string){
    let updatedplaces:place[];
    return this._places.pipe(
      take(1),switchMap(places =>{
      const updatedPlaceIndex=places.findIndex(pl=>pl.id===placeId);
       updatedplaces=[...places];
      const oldPlace=updatedplaces[updatedPlaceIndex];
      updatedplaces[updatedPlaceIndex]=new place(
              oldPlace.id,
              title,
              desceiption,
              oldPlace.imgUrl,
              oldPlace.price,
              oldPlace.availablefrom,
              oldPlace.availableTo,
              oldPlace.userId
              );
              return this.http.put(
                `https://ionic-706bb-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places/${placeId}.json`,
                {...updatedplaces[updatedPlaceIndex],id:null}
                );
      }) ,tap(()=>{
        this.places.next(updatedplaces);
      })
    )

  }


}
