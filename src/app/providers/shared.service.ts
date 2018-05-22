import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }
  dataViewCopy;
  marginDetailsGrid;
  setDataView(dv){
    this.dataViewCopy = dv;
  }

  getDataView(){
    return this.dataViewCopy;
  }
  setMarginDetailsGrid(md){
    this.marginDetailsGrid = md;
  }
  getMarginDetailsGrid(){
    return this.marginDetailsGrid;
  }

}
