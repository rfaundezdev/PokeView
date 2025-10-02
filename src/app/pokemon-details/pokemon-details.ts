import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PokeApi } from '../services/poke-api';
import { tap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-details',
  imports: [RouterLink, MatDividerModule, MatButtonModule],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.scss'
})
export class PokemonDetails implements OnInit {
  public pokemonDetails: any

  constructor(
    private router: Router,
    private pokeApi: PokeApi
  ) { }

  ngOnInit(): void {
    let url = 'https://pokeapi.co/api/v2/pokemon' + this.router.url;
    this.pokeApi.getPokemonDetails(url)
      .pipe(
        tap((data: any) => {
          let newData: any;
          this.pokeApi.getPokemonDetails(data.species.url).subscribe(
            {
              next: (specie: any) => {
                let textList = specie.flavor_text_entries as Array<any>
                let textLang = textList.filter((element: any) => {
                  return element.language.name === 'en';
                });
                newData = {
                  name: data.name,
                  id: data.id,
                  text: textLang,
                  img: {
                    front: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                    back: data.sprites.versions["generation-v"]["black-white"].animated.back_default,
                    front_shiny: data.sprites.versions["generation-v"]["black-white"].animated.front_shiny,
                    back_shiny: data.sprites.versions["generation-v"]["black-white"].animated.back_shiny,
                  },
                  types: data.types
                }
              },
              error: (err: any) => {
                console.error(err)
              },
              complete: () => {
                this.pokemonDetails = newData;
              }
            }
          );
        }),
      ).subscribe({
        complete: () => { }
      })
  }

}
