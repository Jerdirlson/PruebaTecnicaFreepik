<template>
    <section class="bg-gray-900 h-full min-h-screen bg-fixed flex flex-col">
        <div class="flex w-full ">
            <navComponent />
        </div>
        <div class="flex w-full items-end justify-end">
            <button @click="teamDialogVisible = true" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Add player
            </button>
        </div>
        <div v-for="player in players.player" :key="player.player_id" class="flex justify-center">
            <PlayerCard :player="player" @delete-player-socket="deletePlayer(player.player_id)" />
        </div>
        <div v-if="!players.player[0]" class="">
            <h1 class="text-white text-2xl text-center">There are no players available...</h1>
        </div>
        <DialogPlayer v-if="teamDialogVisible" @on-close="teamDialogVisible = false" @to-save="save($event)"/>
    </section>

</template>

<script setup lang="ts">
import navComponent from '@/components/navComponent.vue';
import PlayerCard from '@/components/CardPlayer.vue';
import DialogPlayer from '@/components/DialogPlayer.vue';
import { useplayerStore } from '../stores/player';
import { useNationalityStore } from '../stores/nationality';
import { usePlayerPositionStore } from '../stores/player_position';
import { useTeamsStore } from '../stores/teams';
import SocketSingleton from '../SocketSingleton';
import { onBeforeMount , ref} from 'vue';
import axios from 'axios';

interface Player {
  player_id: number;
  age : number;
  name: string;
  position_id: number;
  nationality_id: number;
  squad_number: number;
  team_id : number;
}

const socket = SocketSingleton.getInstance();
const url = SocketSingleton.getServerUrl();
const players = useplayerStore();
const nationalities = useNationalityStore();
const playerPositions = usePlayerPositionStore();
const teams = useTeamsStore();


onBeforeMount(async() =>{
    const responseTeams = await axios.get(`${url}/team/getTeams`)
    teams.setTeams(responseTeams.data.teams);
    const response = await axios.get(`${url}/player/getPlayers`);
    players.setplayers(response.data.players);

    const responseNationalities = await axios.get(`${url}/nationality/getNationalities`);
    nationalities.setnationalitys(responseNationalities.data.nationalities);

    const responsePlayerPosition = await axios.get(`${url}/playerPosition/getPlayerPositions`);
    playerPositions.setplayerPositions(responsePlayerPosition.data.playerPosition);

    socket.on('updatePlayer', (data: any) => {
        players.setplayers(data.players);
    })

    socket.on('newPlayer', (data: any) => {
        players.addplayer(data.players);
    });

    socket.on('deletePlayerSocket', (data: any) => {
        players.removeplayer(data);
      });

})



const save = async (player : Player) => {
      const response = await axios.post(`${url}/player/createPlayer`, player);
  }
  
  // Variable para controlar la visibilidad del diálogo
  const teamDialogVisible = ref(false);
  
  const openTeamDialog = () => {
    // Cambiar el valor para mostrar el diálogo
    teamDialogVisible.value = true;
  }
  
  const deletePlayer = async (player_id : number) => {
      const response = await axios.delete(`${url}/player/deletePlayer/${player_id}`);
  }

</script>