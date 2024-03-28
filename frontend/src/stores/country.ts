import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', () => {
  
  const country: Ref<Array<any>> = ref([ ])

  const setCountry = (values : any) => {
    country.value = values
  }

  const addCountry = (value: any) => {
    country.value.push(value)
  }

  const removeCountry = (id: string) => {
    country.value = country.value.filter((team) =>team.country_id !== parseInt(id))
  }

  return { country, setCountry, addCountry, removeCountry }

})

