<template>
  <div>
    <InputText></InputText>
    <Button @click="refreshAll">ADD</Button>
    <DataTable v-model:filters="filters" :value="pokemons2" scrollable scroll-height="600px"
               :virtualScrollerOptions="{ lazy: true, onLazyLoad: loadPokemonsLazy, itemSize: 1, delay: 1, showLoader: true, loading: lazyLoading, numToleratedItems: 1 }"
               tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex justify-content-end">
            <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search"/>
            </span>
        </div>
      </template>
      <Column field="sprite" header="Image">
        <template #body="slotProps">
          <img :src="`${slotProps.data.sprites.front_default}`" :alt="slotProps.data.sprites.front_default"
               class="w-6rem shadow-2 border-round"/>
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
    </DataTable>

  </div>
</template>

<script lang="ts" setup>
import {refreshNuxtData, useFetch} from "#app";
import {ref} from "vue";
import {FilterMatchMode} from "primevue/api";

let maxPokemons: number;

/* Permet de forcer le rafraichissement des données */
const refreshing = ref(false)
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

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const pending2 = ref(true);
const pokemons = ref([]);

let pokemons2 = ref([]);

const getPokemons = (from: number) => {
  pending2.value = true;
  useFetch('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=' + from.toString()).then((pokelist: any) => {
    console.log('pokelist', pokelist, pokelist.data._rawValue);
    maxPokemons = pokelist.data._rawValue.count;
    let promises: any[] = [];
    pokelist.data._rawValue.results.forEach((pokemon: any) => {
      promises.push($fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name));
      // promises.push(useFetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name, {pick: ['name', 'sprites']}));
    });
    Promise.all(promises).then((result_promises: any) => {
      console.log('result_promises', result_promises);
      pokemons2.value = result_promises;
      pokemons.value = result_promises;
      console.log('pokemons', pokemons);
      pending2.value = false;
      // lazyLoading.value = false;
    });
  })
}
getPokemons(0);
const loadLazyTimeout = ref();
const lazyLoading = ref(false);
const loadPokemonsLazy = (event: { first: number, last: number }) => {
  !lazyLoading.value && (lazyLoading.value = true);

  if (loadLazyTimeout.value) {
    clearTimeout(loadLazyTimeout.value);
  }

  //simulate remote connection with a timeout
  loadLazyTimeout.value = setTimeout(() => {
    console.log('pokemons2.value', pokemons2.value);
    console.log('event', event);
    let _pokemons2 = [...pokemons2.value]
    let {first, last} = event;
    last = Math.min(maxPokemons, first + 10);

    const loadedPokemons = pokemons.value.slice(first, last);
    console.log('loadedPokemons', loadedPokemons);
    console.log('loadlazy', lazyLoading.value);

    console.log('_pokemons2 bef', _pokemons2);
    Array.prototype.splice.apply(_pokemons2, [...[first, last - first], ...loadedPokemons]);
    console.log('_pokemons2 af', _pokemons2);
    pokemons2.value = _pokemons2;
    lazyLoading.value = false;
    console.log('loadlazy end', lazyLoading.value);
    console.log('pokemons2', pokemons2);
  }, 0);


}

</script>

<style scoped>

</style>
