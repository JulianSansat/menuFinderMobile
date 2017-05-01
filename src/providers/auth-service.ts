import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

let apiUrl = 'https://sheltered-beyond-67853.herokuapp.com/';

@Injectable()
export class AuthService{
  token: any;
  constructor(public http:Http, public storage: Storage){
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'auth/sign_in', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.headers.get('access-token'));
          }, (err) => {
            console.log(err);
          });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'auth', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
            this.storage.ready().then(() => {
              this.storage.get('token').then((val) => {
                this.token = val;
            })
        });
        headers.append('access-token', this.token);

        this.http.post(apiUrl+'auth/sign_out', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
    });
  }

}