import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token_type:string;
  access_token:string;
  client_id: string;
  client_secret: string;

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');

    this.client_id = "75e1d165a3ef435fb08a9816c84c2a71";
    this.client_secret = "f1e7ebd3bb614a3d82273200dba6f94f";
  }

  setToken( token:string ) {
    this.access_token = token;
  }

  getToken() {
    const url = "https://spotify-get-token.herokuapp.com/spotify/" + this.client_id + "/" + this.client_secret + "";
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.get(url, { headers });
  }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.access_token
    });
    return this.http.get(url, { headers });

  }

  getNewReleases( limit: number ) {

    return this.getQuery('browse/new-releases?limit='+limit)
              .pipe( map( data => data['albums'].items ));

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));

  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items));

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']));

  }

}
