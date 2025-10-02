import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApi {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPokemonList(): Observable<any> {
    var url: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
    return this.httpClient.get(url);
  }

  getPokemonDetails(url: any): Observable<any> {
    return this.httpClient.get(url);
  }
}
