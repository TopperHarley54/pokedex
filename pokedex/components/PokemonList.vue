<template>
  <div class="component flex justify-content-center flex-wrap">
    <!--        <Button @click="refreshAll">ADD</Button>-->
    <div class="card lg:w-7">
      <DataTable v-if="!pending2" v-model:filters="filters" :value="pokemons2" scrollable scrollHeight="550px"
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
            <NuxtLink to="/Details" class="info-button">
            <Button icon="pi pi-info-circle"  rounded @click="openDetails(slotProps.data)"></Button>
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
import {refreshNuxtData, useFetch} from "#app";
import {ref} from "vue";
import {FilterMatchMode} from "primevue/api";
import {usePokemonDetailStore, useTeam} from "~/composables/states";
import {usePinia} from "#imports";

const team = useTeam();
/* Permet de forcer le rafraichissement des données */
const refreshing = ref(false)
const pinia = usePinia();
const refreshAll = () => {
  console.log('REFRESH ALL');
  refreshing.value = true
  try {
    /* Force le rafraichissement des données avec un wipe des caches */
    refreshNuxtData('pokemons2')
  } finally {
    refreshing.value = false
  }
}

const addTeam = (pokemon: any) => {
  console.log('AJOUT', pokemon);
  team.value.push(pokemon);
  console.log('team', team.value);
}

const openDetails = (pokemon: any) => {
  console.log('openDetails', pokemon);
  usePokemonDetailStore().informations = ref(pokemon);
  console.log('usePokemonDetailStore', usePokemonDetailStore().informations, usePokemonDetailStore().informations.value);
}

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const pending2 = ref(true);

let pokemons2: any[];
useFetch('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0').then((pokelist: any) => {
  console.log('pokelist', pokelist, pokelist.data._rawValue);
  let promises: any[] = [];
  pokelist.data._rawValue.results.forEach((pokemon: any) => {
    promises.push($fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name));
    // promises.push(useFetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name, {pick: ['name', 'sprites']}));
  });
  Promise.all(promises).then((result_promises: any) => {
    console.log('result_promises', result_promises);
    pokemons2 = result_promises;
    pending2.value = false;
  });
})

</script>

<style scoped>

</style>
