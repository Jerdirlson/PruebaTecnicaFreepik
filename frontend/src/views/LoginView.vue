<template>
    <section class="bg-gray-900 h-screen flex flex-col">
        <div class="flex w-full ">
            <navComponent />
        </div>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
            <div class="flex w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-bg-gray-800 border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6"  @submit.prevent="formSubmit">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-white">Your email</label>
                            <input v-model="dataForm.email" type="email" name="email" id="email" class=" border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                            <input v-model="dataForm.password" type="password" name="password" id="password" placeholder="••••••••" class="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" >
                        </div>
                        <button type="submit" class="w-full focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Sign in</button>
                        
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import router from '@/router';
import navComponent from '../components/navComponent.vue';

const dataForm = reactive({
    email: '',
    password: ''
})
const formSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8081/auth/signin', dataForm, {
    headers: {
        'Content-Type': 'application/json',
    }});
    const token = response.data.token;
    if (token) {
        localStorage.setItem('token', token); // Almacenar el token JWT en el localStorage
        router.push('/teams');
    } else {
        console.error('No se recibió un token JWT en la respuesta del servidor.');
    }
  } catch (error : any) {
    console.error('Error al enviar la solicitud de inicio de sesión:', error.response.data.message);
  }
};



</script>