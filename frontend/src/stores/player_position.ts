import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerPositionStore = defineStore('playerPosition', () => {
  
  const playerPosition: Ref<Array<any>> = ref([ ])

  const setplayerPositions = (values : any) => {
    playerPosition.value = values
  }

  const addplayerPosition = (value: any) => {
    playerPosition.value.push(value)
  }

  const removeplayerPosition = (id: string) => {
    playerPosition.value = playerPosition.value.filter((team) =>team.playerPosition_id !== parseInt(id))
  }

  return { playerPosition, setplayerPositions, addplayerPosition, removeplayerPosition }

})

