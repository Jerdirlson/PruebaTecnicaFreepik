<template>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
  
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Register Team</h3>
                <div class="mt-2">
                  <input v-model="teamName" type="text" placeholder="name of the team" class="border border-gray-300 rounded-md p-2 w-full">
                </div>
                <div class="mt-2">
                  <select v-model="selectedLeague" class="border border-gray-300 rounded-md p-2 w-full">
                    <option disabled value="">Select a League</option>
                    <option v-for="league in leagues" :key="league.league_id" :value="league.league_id">{{ league.name }}</option>
                  </select>
                </div>
                <div class="mt-2">
                  <select v-model="selectedCountry" class="border border-gray-300 rounded-md p-2 w-full">
                    <option disabled value="">Select a Country</option>
                    <option v-for="country in countries" :key="country.country_id" :value="country.country_id">{{ country.name }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="mostrar()" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Register Team
            </button>
            <button @click="emits('onClose')" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    import { useCountryStore } from '../stores/country';
    import { useLeagueStore } from '../stores/league';
    import { defineEmits } from 'vue';
  
    const showDialog = ref(false);
    const teamName = ref('');
    const selectedLeague = ref('');
    const selectedCountry = ref('');
    const leagues = useLeagueStore().league;
    const countries = useCountryStore().country;
    
    function openDialog() {
        showDialog.value = true;
    }
    
    function closeDialog() {
        showDialog.value = false;
    }

    const emits = defineEmits(['onClose', 'toSave'])

    
    
    const mostrar = ()=>{
      const newTeam = {
        name: teamName.value,
        league_id: selectedLeague.value,
        country_id: selectedCountry.value
      };
      emits('toSave', newTeam);
      emits('onClose');
    }
</script>
  