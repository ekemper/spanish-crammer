import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Definition } from './definition';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class GoogleTranslateService {

  constructor(private http: Http) { }


  	//private googleTransUrl = "http://0.0.0.0:3000/api/definitions";

}
