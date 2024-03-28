import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useLeagueStore = defineStore('league', () => {
  
  const league: Ref<Array<any>> = ref([ ])

  const setLeagues = (values : any) => {
    league.value = values
  }

  const addLeague = (value: any) => {
    league.value.push(value)
  }

  const removeLeague = (id: string) => {
    league.value = league.value.filter((team) =>team.league_id !== parseInt(id))
  }

  return { league, setLeagues, addLeague, removeLeague }

})

