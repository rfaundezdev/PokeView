import { Component, OnInit } from '@angular/core';
import { PokeApi } from '../../services/poke-api';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [MatButtonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {

  public pokemonList: any[] = [];
  public isLoading: boolean = true;

  constructor(
    private pokeApi: PokeApi,
  ) { }

  ngOnInit(): void {
    this.pokeApi.getPokemonList()
      .pipe(
        map((response: any) => {
          var newArray: any = []
          response.results.forEach((pokemon: any) => {
            this.pokeApi.getPokemonDetails(pokemon.url).subscribe((details: any) => {
              newArray.push({
                name: pokemon.name,
                url: pokemon.url,
                image: details.sprites.front_default
              });
            });
          });
          return newArray;
        }),
      )
      .subscribe({
        next: (data: any) => {
          this.pokemonList = data;
        }, error: (error: any) => {
          console.error('Error fetching Pokémon list:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
