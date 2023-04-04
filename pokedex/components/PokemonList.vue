<template>
  <div class="component flex justify-content-center flex-wrap main-div-list">
    <div class="card md:w-8 lg:w-7 h-max">
      <DataTable v-if="!pending" v-model:filters="filters" :value="pokemons" scrollable scrollHeight="flex"
                 tableStyle="" class="pokedex-list w-12"
                 :rowClass="()=> 'h-4rem'">
        <template #header>
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search"/>
            </span>
          </div>
        </template>
        <Column field="sprite" header="Image" class="w-10rem ">
          <template #body="slotProps">
            <img :src="`${slotProps.data.sprites.front_default}`" :alt="slotProps.data.sprites.front_default"
                 class="sm:w-3rem md:w-4rem lg:w-6rem"/>
          </template>
        </Column>
        <Column field="name" header="Name" class="pokemon-name"></Column>
        <Column header="" class="w-4rem">
          <template #body="slotProps">
            <NuxtLink :to="`/Details/${slotProps.data.id}`" class="info-button">
              <Button icon="pi pi-info-circle" rounded @click="openDetails(slotProps.data)"></Button>
            </NuxtLink>
          </template>
        </Column>
        <Column header="" class="w-4rem">
          <template #body="slotProps">
            <Button icon="pi pi-plus" @click="addTeam(slotProps.data)" text raised rounded></Button>
          </template>
        </Column>
      </DataTable>
    </div>


  </div>
</template>

<script lang="ts" setup>
import {useFetch} from "#app";
import {ref} from "vue";
import {FilterMatchMode} from "primevue/api";
import {usePokemonDetailStore, usePokemonListStore, usePokemonTeamStore} from "~/composables/states";

const pending = ref(true);
/* La liste de pokémons à afficher dans le Datatable */
let pokemons: any[];

/* Fonction qui ajoute un pokémon à l'équipe. Si l'équipe contient déjà 6 pokémons, on ne peut plus en ajouter */
const addTeam = (pokemon: any) => {
  if (usePokemonTeamStore().team.length < 6) {
    usePokemonTeamStore().team.push(pokemon);
  }
}
/* Fonction qui va permettre d'enregistrer les données du pokémon que l'on veut consulter en détail dans le store */
const openDetails = (pokemon: any) => {
  usePokemonDetailStore().details = ref(pokemon);
}
/* Filtre de la Datatable */
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
});

if (usePokemonListStore().list == null || usePokemonListStore().list == undefined) {
  /* On récupère la liste des 151 premiers pokémons via l'api REST */
  useFetch('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0').then((pokemon_list: any) => {
    let promises: any[] = [];
    pokemon_list.data._rawValue.results.forEach((pokemon_data: any) => {
      /* On prépare une serie de fetch pour récupérer les données complètes des pokémons */
      promises.push($fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon_data.name));
    });
    /* On récupère toutes les données complètes des pokémons en un tableau que l'on transmet à la Datatable */
    Promise.all(promises).then((result_promises: any) => {
      pokemons = result_promises;
      pending.value = false;
      /* On enregistre la liste de pokémon dans le store pour ne pas avoir à refaire d'appel http par la suite */
      usePokemonListStore().list = ref(result_promises);
    });
  })
} else {
  /* On récupère la liste des pokémons dans le store pour éviter de refaire des appels http inutiles */
  pokemons = usePokemonListStore().list;
  pending.value = false;
}

</script>

<style scoped>

</style>
