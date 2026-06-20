# PokeView

Aplicación web que consume la [PokeAPI](https://pokeapi.co/) para mostrar un listado de los 151 Pokémon originales con su sprite animado y tipo(s), y permite ver el detalle de cada uno con su descripción oficial.

## Estado del proyecto

✅ **Funcional y desplegado.** El flujo completo (listado y detalle de cada Pokémon) está terminado y operativo.

## Demo en vivo

🔗 **[rfaundezdev.github.io/PokeView](https://rfaundezdev.github.io/PokeView/)**

No requiere cuenta ni configuración: es de acceso público y libre.

## Funcionalidades

- **Listado de Pokémon** obtenido en tiempo real desde la PokeAPI, mostrando sprite animado, número, nombre y tipo(s) de cada uno.
- **Vista de detalle** por Pokémon (ruta dinámica `/:id`), que combina datos de dos endpoints distintos de la API: ficha técnica (sprites, tipos) y descripción de especie, filtrando el texto en inglés entre los múltiples idiomas que entrega la API.
- **Sprites animados** (generación V, estilo Black/White) para frente, espalda y sus variantes shiny.
- **Routing dinámico** entre el listado y el detalle de cada Pokémon.

## Stack técnico

| Categoría | Tecnologías |
|---|---|
| Frontend | Angular 20 (componentes standalone), Angular Material, Angular CDK |
| Datos | HttpClient consumiendo la [PokeAPI](https://pokeapi.co/) (REST) |
| Reactividad | RxJS (`tap`, composición de llamadas HTTP anidadas) |
| Testing | Karma + Jasmine |
| Lenguaje | TypeScript, SCSS |
| Despliegue | angular-cli-ghpages |

## Arquitectura

- **Componentes standalone**, sin `NgModules`.
- **`PokeApi`**: servicio único que centraliza el consumo de la PokeAPI (listado y detalle), reutilizado tanto en el listado como en la vista de detalle.
- **Composición de datos asíncronos**: la vista de detalle encadena una segunda llamada HTTP (a `species.url`) para obtener la descripción del Pokémon, y filtra entre los distintos idiomas devueltos por la API para quedarse solo con el texto en inglés.
- **Componentes compartidos** (`shared/header`, `shared/footer`) reutilizados entre vistas.

## Cómo ejecutar el proyecto localmente

```bash
git clone https://github.com/rfaundezdev/PokeView.git
cd PokeView
npm install
ng serve -o
# Abrir http://localhost:4200
```

No requiere configuración adicional ni claves de API: la PokeAPI es pública y de acceso libre.

## Estructura del proyecto

```
src/app/
├── home/                  # Vista principal con el listado de Pokémon
│   └── list/               # Componente de listado (cards con sprite y tipos)
├── pokemon-details/         # Vista de detalle por Pokémon
├── services/
│   └── poke-api.ts           # Servicio de consumo de la PokeAPI
└── shared/                    # Header y footer reutilizables
```

## Autor

**Ramón Faúndez Bravo**
[LinkedIn](https://linkedin.com/in/faundezramon92) · [GitHub](https://github.com/rfaundezdev)
