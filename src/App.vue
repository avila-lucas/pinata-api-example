<script setup>
import Signature from "./components/Signature.vue";
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Signature msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  height: 100vh;
  background-color: #1a202c;
  overflow: scroll;
  text-align: center;
}
</style>
