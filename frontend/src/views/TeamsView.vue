<template>
    <section class="bg-gray-900 h-full min-h-screen bg-fixed flex flex-col">
      <div class="flex w-full">
        <navComponent />
      </div>
      <div class="flex w-full items-end justify-end">
        <button @click="teamDialogVisible = true" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Agregar equipos
        </button>
      </div>
      <div v-for="team in teams.teams" :key="team.team_id" class="flex justify-center">
        <TeamCard :team="team" @delete-team-socket="deleteTeam(team.team_id)" />
      </div>
      <div v-if="!teams.teams[0]" class="">
        <h1 class="text-white text-2xl text-center">There are no soccer teams available...</h1>
      </div>
      <DialogTeam v-if="teamDialogVisible" @on-close="teamDialogVisible = false" @to-save="save($event)"/>
    </section>
  </template>
  
  <script setup lang="ts">
  import navComponent from '@/components/navComponent.vue';
  import TeamCard from '@/components/CardTeam.vue';
  import DialogTeam from '@/components/DialogTeam.vue';
  import { useTeamsStore } from '../stores/teams';
  import { useLeagueStore } from '../stores/league';
  import { useCountryStore } from '../stores/country';
  import SocketSingleton from '../SocketSingleton';
  import { onBeforeMount , ref } from 'vue';
  import axios from 'axios';
  
  export interface Team {
      team_id? : number;
      name : string;
      league_id : number;
      country_id : number
  }
  
  const teams = useTeamsStore();
  const leagues = useLeagueStore();
  const country = useCountryStore();
  const socket = SocketSingleton.getInstance();
  const url = SocketSingleton.getServerUrl();
  
  onBeforeMount(async() =>{
      const response = await axios.get(`${url}/team/getTeams`)
      teams.setTeams(response.data.teams);
  
      const responseLeagues = await axios.get(`${url}/league/getLeague`)
      leagues.setLeagues(responseLeagues.data.leagues);
  
      const responseCountry = await axios.get(`${url}/country/getCountry`)
      country.setCountry(responseCountry.data.countrys);
  
      socket.on('newTeam', (data: any) => {
        const firstTeam = data[0];
            // Cambiamos la clave 'name' a 'name_team' en el primer equipo
            const modifiedTeam = {
                ...firstTeam,
                team_name: firstTeam.name
            };
          teams.addTeams(modifiedTeam);
      });

  
      socket.on('deleteTeamSocket', (data: any) => {
          teams.removeTeam(data);
      });
  
      socket.on('testSocket', (data) => {
          console.log('Respuesta recibida desde el backend:', data);
      });

      socket.on('updateTeam', (data: any) => {
        teams.setTeams(data.teams);
      })
  
  });
  
  const save = async (team : Team) => {
      const response = await axios.post(`${url}/team/createTeam`, team);
  }
  
  // Variable para controlar la visibilidad del diálogo
  const teamDialogVisible = ref(false);
  
  const openTeamDialog = () => {
    // Cambiar el valor para mostrar el diálogo
    teamDialogVisible.value = true;
  }
  
  const deleteTeam = async (team_id : number) => {
      const response = await axios.delete(`${url}/team/deleteTeam/${team_id}`);
  }

  </script>
  