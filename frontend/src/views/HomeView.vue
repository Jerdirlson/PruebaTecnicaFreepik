<template>
  <section class="bg-gray-900 h-screen flex flex-col">
    <div>
      <navComponent />
    </div>
    <div class="flex flex-col w-full h-1/2 items-center justify-center">
        <p class="flex text-4xl text-white"> PRUEBA TECNICA JERDIRLSON SANTAMARIA</p>
        <p class="flex text-2xl text-white"> Inicia sesión con el desplegable de arriba a la derecha</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import navComponent from '../components/navComponent.vue'

const msg = 'Welcome to Your Vue.js + TypeScript App'

</script>
