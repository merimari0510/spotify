import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styles: []
})
export class SongsComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;

    this.spotify.getToken()
      .subscribe( (data: any) => {
        this.spotify.setToken(data.access_token);
        this.spotify.getNewReleases(20)
        .subscribe( (data: any) => {
          this.nuevasCanciones = data;
          this.loading = false;
        }, ( errorServicio ) => {

          this.loading = false;
          this.error = true;
          console.log(errorServicio);
          this.mensajeError = errorServicio.error.error.message;
        });
      });
  }
}
