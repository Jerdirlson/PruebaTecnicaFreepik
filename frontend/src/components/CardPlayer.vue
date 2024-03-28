<template>
    <div class="relative flex bg-white shadow-md rounded-lg p-6 w-11/12 flex-col mt-7">
      <!-- Contenido del jugador -->
      <div class="flex mb-4 flex-wrap justify-between">
        <div class="flex flex-col overflow-hidden space-y-2">
            <input v-model="localPlayer.name" @blur="showChanges" class="text-xl font-semibold text-black overflow-hidden whitespace-nowrap overflow-ellipsis">
            <!-- Campo editable para la posicion del jugador -->
            <select v-model="localPlayer.position_id" @blur="showChanges" class="text-gray-500">
              <option v-for="playerPosition in playerPositions.playerPosition" :key="playerPosition.position_id" :value="playerPosition.position_id">{{ playerPosition.name }}</option>
            </select>
            <!-- Campo editable para la nacionalidad del jugador -->
            <select v-model="localPlayer.nationality_id" @blur="showChanges" class="text-gray-500">
              <option v-for="nationality in nationalitys.nationality" :key="nationality.nationality_id" :value="nationality.nationality_id">{{ nationality.name }}</option>
            </select>
            <!-- Campo editable para el equipo del jugador -->
            <select v-model="localPlayer.team_id" @blur="showChanges" class="text-gray-500">
              <option v-for="team in teams.teams" :key="team.team_id" :value="team.team_id">{{ team.team_name }}</option>
            </select>
        </div>
        <div class="flex w-full items-center justify-center sm:w-1/2 sm:justify-end">
          <!-- Botón para eliminar jugador -->
          <button @click="emits('deletePlayerSocket')" class="absolute top-0 right-0 transform  text-red-500 hover:text-red-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div class="flex flex-col">
            <label for="age" class="text-gray-500">Age:</label>
            <!-- Campo editable para la edad del jugador -->
            <input id="age" v-model="localPlayer.age" type="number" @blur="showChanges" class="text-gray-500 w-1/2">
          </div>
          <div class="flex flex-col">
            <label for="squadNumber" class="text-gray-500">Jersey number:</label>
            <!-- Campo editable para el número de camiseta del jugador -->
            <input id="squadNumber" v-model="localPlayer.squad_number" type="number" @blur="showChanges" class="text-gray-500">
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, onBeforeMount , watchEffect} from 'vue';
import { usePlayerPositionStore } from '../stores/player_position';
import { useNationalityStore } from '../stores/nationality';
import SocketSingleton from '../SocketSingleton';
import axios from 'axios';
import { useTeamsStore } from '../stores/teams';

interface Player {
  player_id: number;
  age : number;
  name: string;
  position_id: number;
  nationality_id: number;
  squad_number: number;
  team_id : number;
}

interface Team {
  team_id: number;
  team_name: string;
  country_id: number;
  league_id : number;
  players: Player[];
}
const socket = SocketSingleton.getInstance();
const playerPositions = usePlayerPositionStore();
const nationalitys = useNationalityStore();
const teams = useTeamsStore();
const url = SocketSingleton.getServerUrl();

const emits = defineEmits(['deletePlayerSocket'])

onBeforeMount(async() =>{
  socket.on('updateTeam', (data: any) => {
    // teams.updateTeam(localPlayer.value);
  })
})

const props = defineProps<{
  player: Player;
}>();

const localPlayer = ref(props.player);


async function showChanges() {
  const values ={ 
    player_id: localPlayer.value.player_id,
    age : localPlayer.value.age,
    name: localPlayer.value.name,
    position_id: localPlayer.value.position_id,
    nationality_id: localPlayer.value.nationality_id,
    squad_number: localPlayer.value.squad_number,
    team_id : localPlayer.value.team_id
  }
  await axios.put(`${url}/player/updatePlayer`, values);
}

watchEffect(() => {
  localPlayer.value = props.player;
});

</script>
