<template>
  <div class="row justify-center" style="font-size: 50px">
    {{ userWord }}
  </div>
  <div
    style="
      height: 70vh;
      width: 200vh;
      background-color: #e1b382;
      border-radius: 5px;
    "
    class="absolute-center"
  >
    <div class="row word-font">
      <div
        v-for="(word, wordsIndex) in words"
        :key="wordsIndex"
        class="q-mx-sm"
        style="color: grey"
        :style="wordsIndex === 0 ? 'color:black' : ''"
      >
        <span
          v-for="(letter, letterIndex) in word"
          :key="letterIndex"
          :class="getLetterColor(letterIndex)"
        >
          {{ letter }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const words = [
  'word',
  'word',
  'word',
  'word',
  'word',
  'word',
  'word',
  'word',
  'word',
  'word',
];

const userWord = ref<string>('');
const lastLetterTyped = ref<string>('');

onMounted(() => {
  window.addEventListener('keypress', appendLetter);
});
onUnmounted(() => {
  window.removeEventListener('keypress', appendLetter);
});

function appendLetter(event: KeyboardEvent) {
  if (event.key === ' ') {
    //logic to check if userWord === words.value[0]?
    return;
  }
  lastLetterTyped.value = event.key;

  userWord.value += event.key;
}

function getLetterColor(letterIndex: number) {
  console.log(letterIndex);
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps:wght@400;700&family=Tilt+Neon&display=swap');

.word-font {
  font-family: 'Tilt Neon', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'XROT' 0, 'YROT' 0;
  font-size: 25px;
}
</style>
