import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  loadingNewReleases: boolean;

  error: boolean;
  errorNewReleases: boolean;
  mensajeError: string;

  token: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.loadingNewReleases = true;
    this.error = false;
    this.errorNewReleases = false;
  }

  ngOnInit() {
    this.loading = false;
    this.loadingNewReleases = true;
    this.error = true;
    this.errorNewReleases = false;

    this.spotify.getToken()
      .subscribe( (data: any) => {
        this.spotify.setToken(data.access_token);
        this.spotify.getNewReleases(6)
            .subscribe( (data: any) => {
              this.nuevasCanciones = data;
              this.loadingNewReleases = false;
              this.errorNewReleases = false;
            }, ( errorServicio ) => {

              this.loadingNewReleases = false;
              this.errorNewReleases = true;
              console.log(errorServicio);
              this.mensajeError = errorServicio.error.error.message;

            });
      });
  }


}
