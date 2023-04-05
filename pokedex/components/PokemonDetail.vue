<template>

  <div class="component flex justify-content-center flex-wrap main-div-detail">
    <div class="card sm:w-12 md:w-10 lg:w-7">
      <div v-if="!pending" class="grid h-full">
        <div v-if="pokemon" class="pokemon-sprite col-12 normal" :class="{ fire: is_type('fire', pokemon.types),
        water: is_type('water', pokemon.types), grass:is_type('grass', pokemon.types),
        rock:is_type('rock', pokemon.types), electric:is_type('electric', pokemon.types),
        ghost: is_type('ghost', pokemon.types)}">

          <img :src="pokemon.sprites.front_default"
               class="sm:w-8rem md:w-8rem lg:w-10rem"/>
        </div>
        <div class="pokemon-data col-12">
          <div class="pokemon-caracteritics grid">
            <h3 class="col-4 col-offset-2 data">{{ pokemon.name }}</h3>
            <h3 class="col-4 col-offset-2 data">N°{{ pokemon.id }}</h3>
          </div>
          <Divider/>
          <div class="pokemon-caracteritics grid">
            <div class="col-4 col-offset-2">
              <h4>Taille</h4>
              <div class="data">
                <div>{{ convertHeight(pokemon.height) }} m</div>
              </div>
            </div>
            <div class="col-4 col-offset-2">
              <h4>{{ pokemon.types.length > 1 ? 'Catégories' : 'Catégorie' }}</h4>
              <ul class="data list-none">
                <li v-for="type_data in pokemon.types"> {{ type_data.type.name }}</li>
              </ul>
            </div>
            <div class="col-4 col-offset-2">
              <h4>Poids</h4>
              <div class="data">
                <div>{{ convertWeight(pokemon.weight) }} kg</div>
              </div>
            </div>
            <div class="col-4 col-offset-2">
              <h4>{{ pokemon.abilities.length > 1 ? 'Talents' : 'Talent' }}</h4>
              <ul class="data list-none">
                <li v-for="ability_data in pokemon.abilities"> {{ ability_data.ability.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {usePokemonDetailStore} from "~/composables/states";
import {useRoute} from "#app";

const route = useRoute()
const pending = ref(true);
const pokemon_id = route.params.id;

/* Fonction qui permet de déterminer si le pokémon est du type spécifié en paramètre */
const is_type = (type: string, pokemon_types: any[]): boolean => {
  return pokemon_types.map((type) => type.type.name).includes(type);
};
/* Le pokémon dont on veut afficher les informations */
let pokemon;

/* Si les données du pokémon sont absentes du store (suite à un refresh par ex.), on va chercher les données par l'api */
if (usePokemonDetailStore().details == null || usePokemonDetailStore().details == undefined) {
  console.log('get pokemon from api');
  Promise.all([$fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon_id)]).then((data) => {
    pokemon = data[0];
    pending.value = false;
  });
} else {
  console.log('get pokemon from store');
  pokemon = usePokemonDetailStore().details;
  pending.value = false;
}
/* Les données de tailles en input sont en décimètres, on les retourne en mètre */
const convertHeight = (value: number) => {
  return value / 10;
}

/* Les données de poids en input sont en hectogrammes, on les retourne en kilogrammes */
const convertWeight = (value: number) => {
  return value / 10;
}
</script>
