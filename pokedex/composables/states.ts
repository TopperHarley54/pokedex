import {defineStore} from "pinia";
import {ref} from "vue";

export const useTeam = () => useState<any[]>('team', () => []);

// export const usePokemonDetail = () => useState<any>('pokemonDetail', ()=> )
// export const usePokemonsListStore = defineStore('counter', () => {})
export const usePokemonDetailStore = defineStore('pokemonDetail', () => {
    const informations = ref();
    return {informations};
})
