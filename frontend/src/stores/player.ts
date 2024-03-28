import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useplayerStore = defineStore('player', () => {
  
  const player: Ref<Array<any>> = ref([ ])

  const setplayers = (values : any) => {
    player.value = values
  }

  const addplayer = (value: any) => {
    player.value.push(value)
  }

  const removeplayer = (id: string) => {
    player.value = player.value.filter((team) =>team.player_id !== parseInt(id))
  }

  return { player, setplayers, addplayer, removeplayer }

})

