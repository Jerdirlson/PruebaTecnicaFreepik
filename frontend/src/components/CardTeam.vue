<template>
  <div class="relative flex bg-white shadow-md rounded-lg p-6 w-11/12 flex-col mt-7">
    <!-- Contenido del equipo -->
    <div class="flex mb-4 flex-wrap justify-between">
      <div class="flex flex-col overflow-hidden space-y-2">
        <input v-model="localTeam.team_name" @blur="showChanges" class="text-xl font-semibold text-black overflow-hidden whitespace-nowrap overflow-ellipsis">
        <select v-model="localTeam.league_id"  @blur="showChanges" class="text-gray-500">
          <option v-for="league in leagues.league" :key="league.league_id" :value="league.league_id">{{ league.name }}</option>
        </select>
        <select v-model="localTeam.country_id"  @blur="showChanges" class="text-gray-500">
          <option v-for="country in countrys.country" :key="country.country_id" :value="country.country_id">{{ country.name }}</option>
        </select>
      </div>
      <div class="flex w-full items-center justify-center sm:w-1/2 sm:justify-end">
        <button @click="togglePlayers" class="flex mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Ver jugadores</button>
        <button @click="emits('deleteTeamSocket')" class="absolute top-0 right-0 transform  text-red-500 hover:text-red-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="showPlayers" class="mt-4">
      <h3 class="text-lg font-semibold mb-2">Jugadores:</h3>
      <ul>
        <li v-for="player in props.team.players" :key="player.player_id" class="flex items-center justify-between py-2 border-b border-gray-200">
          <div>
            <div class="text-gray-800">{{ player.player_name }}</div>
            <div class="text-gray-500">{{ player.position_name }}</div>
          </div>
          <div class="text-gray-500">{{ player.squad_number }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, onBeforeMount, watchEffect } from 'vue';
import { useLeagueStore } from '../stores/league';
import { useCountryStore } from '../stores/country';
import SocketSingleton from '../SocketSingleton';
import axios from 'axios';
import { useTeamsStore } from '../stores/teams';

interface Player {
  player_id: number;
  age : number;
  player_name: string;
  position_name: string;
  squad_number: number;
}

interface Team {
  team_id: number;
  team_name: string;
  country_id: number;
  league_id : number;
  players: Player[];
}

const leagues = useLeagueStore();
const countrys = useCountryStore();
const socket = SocketSingleton.getInstance();
const teams = useTeamsStore();
const url = SocketSingleton.getServerUrl();

const emits = defineEmits(['deleteTeamSocket'])



const props = defineProps<{
  team: Team;
}>();

const localTeam = ref(props.team);

const showPlayers = ref(false);

function togglePlayers() {
  showPlayers.value = !showPlayers.value;
}

async function showChanges() {
  const values ={ 
    team_id: localTeam.value.team_id,
    name: localTeam.value.team_name,
    country_id: localTeam.value.country_id,
    league_id: localTeam.value.league_id
  }
  await axios.put(`${url}/team/updateTeam`, values);
}


watchEffect(() => {
  localTeam.value = props.team;
});

</script>