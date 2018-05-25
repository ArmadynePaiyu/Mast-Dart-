
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";


@Injectable()
export class SharedService {

  constructor(public http: HttpClient) { }
  dataViewCopy;
  marginDetailsGrid;
  data = [];
  response;
  marginDetailsResponse;
  setDataView(dv) {
    this.dataViewCopy = dv;
  }
  getData() {
    return this.data;
  }
  setData(d) {
    this.data = d;
  }
  getDataView() {
    return this.dataViewCopy;
  }
  setMarginDetailsGrid(md) {
    this.marginDetailsGrid = md;
  }
  getMarginDetailsGrid() {
    return this.marginDetailsGrid;
  }
  setMarginDetailsRes(res) {
    this.marginDetailsResponse = res;
  }
  getMarginDetailsRes() {
    return this.marginDetailsResponse;
  }

  /* getMarginDetailsData(){
     console.log("call");
    // this.http.get('../assets/testData.json');
   
    this.http.get('http://localhost:8087/marginDetail/fetchDetailsLineItems',{
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    }).subscribe(res => {
      console.log(res);
      this.response=res;
      return this.response;
    });

    
  }*/
  getMarginDetailsData(): Observable<any[]> {
    //debugger;
    return this.http.get("http://localhost:8087/marginDetail/fetchDetailsLineItems", {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    })
      // .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }
   getMarginDetailsColumnData(): Observable<any[]> {
    //debugger;
    return this.http.get("http://localhost:8087/marginDetail/gridColumnStructure ", {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    })
      // .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }
  getUpdatedMarginDetails(marginDetail: any) {
    return this.http.post('http://localhost:8087/marginDetail/saveMarginDetailLineItems', marginDetail);
  }
 /* getCalculatedDetailsData(row, field, value) {
    debugger;
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    var body = {
      rowDetails: row,
      fieldId: field,
      values: value

    }
    return this.http.post("http://localhost:8087/margincalc/calculate?fieldName=" + field + "", body, {
      headers
    })
  }*/
  getCalculatedDetailsData(row, field, value): Observable<any[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    var body = row;
    return this.http.post("http://localhost:8087/margincalc/calculate?fieldName=" + field + "", body, {
      headers
    })
      // .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }
}
