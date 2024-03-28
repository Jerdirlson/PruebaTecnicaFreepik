import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useTeamsStore = defineStore('counter', () => {
  
  const teams: Ref<Array<any>> = ref([ ])

  const setTeams = (values : any) => {
    values.sort((a: any, b: any) => a.team_name.localeCompare(b.team_name));
    teams.value = values;
  }

  const addTeams = (value: any) => {
    teams.value.push(value)
  }

  const removeTeam = (id: string) => {
    teams.value = teams.value.filter((team) =>team.team_id !== parseInt(id))
  }
  

  return { teams, setTeams, addTeams, removeTeam }

})

