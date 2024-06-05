<template>
  <div class="container">
    <div class="row justify-center" style="font-size: 25px; height: 5vh">
      *{{ userWord }}*
    </div>

    <div class="row justify-center items-center">
    <div
      style="
          width: 80%;
        background-color: #e1b382;
        border-radius: 5px;
          height: 70vh;
      "
      class="q-my-xl q-mx-xl shadow-12"
    >
      <div class="row word-font">
        <div
          v-for="(word, wordsIndex) in words"
          :key="wordsIndex"
          class="q-mx-sm"
            :style="wordsIndex === 0 ? 'color:black' : ''"
          style="color: grey"
            :class="getWordColor"
        >
            <span v-for="(letter, letterIndex) in word" :key="letterIndex">
            {{ letter }}
          </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-center">
      <q-btn
        label="Restart"
        no-caps
        push
        class="shadow-10"
        style="background-color: #12343b; color: white"
        @click="init"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const words = ref<Array<string>>([
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
]);

const userWord = ref<string>('');
const userIndex = ref<number>(0);
const lastLetterTyped = ref<string>('');

onMounted(() => {
  window.addEventListener('keypress', appendLetter);
  init();
});
onUnmounted(() => {
  window.removeEventListener('keypress', appendLetter);
});

function appendLetter(event: KeyboardEvent) {
  const isAlphaRegex = /^[A-Za-z]+$/;

  if (!isAlphaRegex.test(event.key) && event.key !== ' ') {
    return;
  }

  if (event.key === ' ') {
    //logic to check if userWord === words.value[0]?
    return;
  }
  userIndex.value++;
  lastLetterTyped.value = event.key;

  userWord.value += event.key;
}

function init() {
  words.value = [
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
  userIndex.value = 0;
  userWord.value = '';
}

const getLetterColor = computed<string>(() => {
  if (words.value[0][userIndex.value] === lastLetterTyped.value) {
    return 'correct';
  }
  return 'wrong';
});
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

.correct {
  color: green;
}
.wrong {
  color: red;
}
</style>
