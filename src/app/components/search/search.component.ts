import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;
  elementoBuscado: string;

  constructor(private spotify: SpotifyService) {
    this.elementoBuscado = '';
  }

  buscar(termino: string) {
    console.log(termino);

    this.loading = true;
    this.spotify.getToken()
      .subscribe( (data: any) => {
        this.spotify.setToken(data.access_token);
        this.spotify.getArtistas( termino )
          .subscribe( (data: any) => {
            console.log(data);
            this.artistas = data;
            this.loading = false;
            this.elementoBuscado = termino;
          });
        });
  }

}
