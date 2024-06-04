<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #12343b" class="font">
        <q-toolbar-title> RaceTyper </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page style="background-color: #c89666">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps:wght@400;700&family=Tilt+Neon&display=swap');
.font {
  font-family: 'Tilt Neon', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'XROT' 0, 'YROT' 0;
}
</style>
