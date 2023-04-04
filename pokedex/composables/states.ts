import {defineStore} from "pinia";
import {ref} from "vue";


export const usePokemonDetailStore = defineStore('pokemonDetail', () => {
    const details = ref();
    return {details};
})

export const usePokemonListStore = defineStore('pokemonList', () => {
    const list = ref();
    return {list};
})

export const usePokemonTeamStore = defineStore('pokemonTeam', () => {
    const team: Ref<any[]> = ref([]);
    return {team};
})
