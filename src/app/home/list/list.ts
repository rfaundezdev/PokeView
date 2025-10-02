import { Component, OnInit } from '@angular/core';
import { PokeApi } from '../../services/poke-api';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list',
  imports: [MatButtonModule, RouterLink],
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
        tap((response: any) => {
          var newArray: any = [];
          response.results.forEach((pokemon: any) => {
            this.pokeApi.getPokemonDetails(pokemon.url).subscribe((details: any) => {
              newArray.push({
                name: pokemon.name,
                url: pokemon.url,
                image: details.sprites.versions["generation-v"]["black-white"].animated.front_default,
                id: details.id,
                types: details.types,
                //image: details.sprites.front_default
              });
            })
          })
          this.pokemonList = newArray;
        }),
      )
      .subscribe({
        error: (error: any) => {
          console.error('Error fetching Pokémon list:', error);
        },
        complete: () => { }
      });
  }
}
