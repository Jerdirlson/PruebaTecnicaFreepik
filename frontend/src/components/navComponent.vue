<template>
    <nav class="border-gray-200 bg-gray-800 dark:border-gray-700 w-full relative">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../assets/freepik-logo.svg" class="h-12" alt="Freepik Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">FreePik</span>
        </a>
        <button @click="toggleMenu" type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div :class="{ 'absolute': showMenu, 'hidden': !showMenu }" class="top-full right-0 w-full z-30" id="navbar-hamburger">
          <ul v-if="!loggedIn" class="flex flex-col font-medium rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <router-link to="/" exact class="block py-2 px-3 rounded dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :class="{ 'text-white bg-blue-700 dark:bg-blue-600': $route.path === '/' }">Home</router-link>
            </li>
            <li>
              <router-link to="/Login" exact class="block py-2 px-3 rounded dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :class="{ 'text-white bg-blue-700 dark:bg-blue-600 ': $route.path === '/Login' }">Login</router-link>
            </li>
          </ul>

          <ul v-else class="flex flex-col font-medium rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <router-link to="/teams" class="block py-2 px-3 rounded dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :class="{ 'text-white bg-blue-700 dark:bg-blue-600 ': $route.path === '/teams' }">Teams</router-link>
            </li>
            <li>
              <router-link to="/players" class="block py-2 px-3 rounded dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :class="{ 'text-white bg-blue-700 dark:bg-blue-600 ': $route.path === '/players' }">Players</router-link>
            </li>
            <li>
              <button @click="logout" class=" w-full text-start block py-2 px-3 rounded dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import router from '@/router';
  const loggedIn = ref(false);

  
  const showMenu = ref(false)
  
  function toggleMenu() {
    showMenu.value = !showMenu.value
  }

  function logout() {
    localStorage.removeItem('token');
    router.push('/Login');
}

  if (localStorage.getItem('token')) {
    loggedIn.value = true;
  }

  </script>
  