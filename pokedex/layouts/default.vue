<template>

  <div>
    <div class="header sm:w-full md:w-full">
      <Button icon="pi pi-chevron-left" @click="backward()" text rounded class="navigation-back-button"></Button>
      <img src="/svg/logo.svg" class="main-logo"/>
      <div class="team">
        <Button class="team-button" text raised rounded>
          <img src="/img/pokeballs-48.png"/>
        </Button>

      </div>
    </div>
    <!--    <strong>Custom layout</strong>-->
    <!--    Header slot:-->
    <!--    <slot name="header">-->
    <!--      Default slot content for <code>Custom</code> layout-->
    <!--    </slot>-->
    <!--    <slot/>-->
  </div>
</template>

<script setup>

const router = useRouter();
// router.back();
const backward = () => {
  router.back();
}
</script>

<style scoped>

</style>
