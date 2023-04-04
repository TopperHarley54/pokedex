<template>

  <Button @click="open = !open" class="team-button" text raised rounded>
    <img src="/img/pokeballs-48.png"/>
  </Button>
  <Teleport to="body">
    <div v-if="open">
      <div class="background"></div>
      <div class="pre-modal">
        <div class="modal card md:w-8 lg:w-7">
          <div class="grid">
            <h2 class="col-12">Mon équipe</h2>
            <div class="col-12" v-if="pokemon_team.length > 0">
              <DataTable v-model:filters="filters" :value="pokemon_team" scrollable
                         scrollHeight="550px"
                         tableStyle="" class="pokedex-list w-12"
                         :rowClass="()=> 'h-4rem'">
                <template #header>
                </template>
                <Column field="sprite" header="Image" class="w-10rem ">
                  <template #body="slotProps">
                    <img :src="`${slotProps.data.sprites.front_default}`" :alt="slotProps.data.sprites.front_default"
                         class="sm:w-2rem md:w-3rem lg:w-3rem"/>
                  </template>
                </Column>
                <Column field="name" header="Nom" class="pokemon-name"></Column>
                <Column header="" class="w-e4rem">
                  <template #body="slotProps">
                    <Button icon="pi pi-times" severity="danger" @click="removePokemonFromTeam(slotProps.data)" text
                            raised
                            rounded></Button>
                  </template>
                </Column>
              </DataTable>
            </div>
            <div class="col-12" v-else>Vous n'avez pas de pokémon dans votre équipe...</div>
            <Divider/>
            <Button @click="open = false">Fermer</Button>
          </div>


        </div>
      </div>

    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {Ref, ref} from "vue";
import {usePokemonTeamStore} from "~/composables/states";

let open: Ref<boolean> = ref(false);
let pokemon_team = usePokemonTeamStore().team;

/* Fonction qui permet de retirer un pokémon de la liste, de manière très basique en se basant uniquement sur l'id du pokémon */
const removePokemonFromTeam = (pokemon: any) => {
  let index: number = usePokemonTeamStore().team.findIndex((pokemon_from_list: any) => {
    return pokemon_from_list.id === pokemon.id;
  });
  usePokemonTeamStore().team.splice(index, 1);
  pokemon_team = usePokemonTeamStore().team;
}

</script>

<style scoped>
.pre-modal {
  position: absolute;
  top: 80px;
  width: 100%;
  padding: 2rem;
}

.modal {
  position: absolute;
  z-index: 999;
  /*top: 20%;*/
  left: 50%;
  transform: translateX(-50%);
}
</style>
