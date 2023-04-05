<template>
  <div>
    <div class="header sm:w-full md:w-full">
      <Button icon="pi pi-chevron-left" @click="backward()" text rounded class="navigation-back-button"></Button>
      <img src="/svg/logo.svg" class="main-logo"/>
      <div class="team">
        <PokemonTeam/>

      </div>
    </div>
  </div>
</template>

<script setup>

import PokemonTeam from "../components/PokemonTeam";

const router = useRouter();
/* Fonction qui permet de revenir en arrière dans l'historique de navigation */
const backward = () => {
  router.back();
}
</script>

<style scoped>

</style>
