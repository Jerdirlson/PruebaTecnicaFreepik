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
            <div class="sm:flex sm:items-start items-center justify-center">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Register Player</h3>
                <div class="mt-2">
                  <input v-model="playerName" type="text" placeholder="Player's name" class="border border-gray-300 rounded-md p-2 w-full">
                </div>
                <div class="mt-2">
                  <select v-model="selectedPosition" class="border border-gray-300 rounded-md p-2 w-full">
                    <option disabled value="">Select a position</option>
                    <option v-for="position in positions" :key="position.position_id" :value="position.position_id">{{ position.name }}</option>
                  </select>
                </div>
                <div class="mt-2">
                  <select v-model="selectedNationality" class="border border-gray-300 rounded-md p-2 w-full">
                    <option disabled value="">Select a nationality</option>
                    <option v-for="nationality in nationalities" :key="nationality.nationality_id" :value="nationality.nationality_id">{{ nationality.name }}</option>
                  </select>
                </div>
                <div class="mt-2">
                  <select v-model="selectedAge" class="border border-gray-300 rounded-md p-2 w-full">
                    <option disabled value="">Select the age of the player</option>
                    <option v-for="age in ages" :key="age" :value="age">{{ age }}</option>
                  </select>
                </div>
                <div class="mt-2">
                  <select v-model="selectedTeam" class="border border-gray-300 rounded-md p-2 w-full">
                    <option disabled value="">Select the team</option>
                    <option v-for="team in teams" :key="team.team_id" :value="team.team_id">{{ team.team_name }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
            <button @click="savePlayer" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Register Player
            </button>
            <button @click="closeDialog" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { usePlayerPositionStore } from '../stores/player_position';
  import { useNationalityStore } from '../stores/nationality';
  import { useTeamsStore } from '@/stores/teams';
  
  interface Player {
    player_id: number;
    age: number;
    name: string;
    position_id: number;
    nationality_id: number;
    squad_number: number;
    team_id: number;
  }
  
  const playerName = ref('');
  const selectedPosition = ref('');
  const selectedNationality = ref('');
  const selectedAge = ref('');
  const squadNumber = ref('');
  const selectedTeam = ref('');
  
  const positions = usePlayerPositionStore().playerPosition;
  const nationalities = useNationalityStore().nationality;
  const teams = useTeamsStore().teams;
  
  const ages = Array.from({ length: 100 }, (_, i) => i + 1); // Generar un array de edades del 1 al 100
  
  const emits = defineEmits(['onClose', 'toSave']);
  
  function savePlayer() {
    const newPlayer: Player = {
      player_id: 0,
      name: playerName.value,
      age: parseInt(selectedAge.value),
      position_id: parseInt(selectedPosition.value),
      nationality_id: parseInt(selectedNationality.value),
      squad_number: parseInt(squadNumber.value),
      team_id: parseInt(selectedTeam.value)
    };
    emits('toSave', newPlayer);
    closeDialog();
  }
  
  function closeDialog() {
    emits('onClose');
  }
  </script>
  