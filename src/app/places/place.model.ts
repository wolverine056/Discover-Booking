export class place{
  constructor(
    public id:string,
    public title:string,
    public description:string,
    public imgUrl:string,
    public price:number,
    public availablefrom:Date,
    public availableTo:Date,
    public userId:string
  ){

  }
}
