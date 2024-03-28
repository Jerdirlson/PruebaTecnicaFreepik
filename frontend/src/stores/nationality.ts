import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useNationalityStore = defineStore('nationality', () => {
  
  const nationality: Ref<Array<any>> = ref([ ])

  const setnationalitys = (values : any) => {
    nationality.value = values
  }

  const addnationality = (value: any) => {
    nationality.value.push(value)
  }

  const removenationality = (id: string) => {
    nationality.value = nationality.value.filter((team) =>team.nationality_id !== parseInt(id))
  }

  return { nationality, setnationalitys, addnationality, removenationality }

})

