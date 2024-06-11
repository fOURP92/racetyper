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
import { useTextStore } from 'src/stores/textStore';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const store = useTextStore();

//declare variables

//words = the text/words generated for the race
const words = ref<Array<string>>([...store.getText]);
//userWord = the current string with what user types
const userWord = ref<string>('');
//
const userIndex = ref<number>(0);
//
const previousWords = ref<Array<string>>([]);
//lastLetterTyped self-explanatory
const lastLetterTyped = ref<string>('');
//correctWords/wrongWords = keep count of correct and wrong words typed, after user pressed "SPACE"
const correctWords = ref<number>(0);
const wrongWords = ref<number>(0);

//add the listener on mount and remove on unmount
onMounted(() => {
  window.addEventListener('keydown', appendLetter);
  init();
});
onUnmounted(() => {
  window.removeEventListener('keydown', appendLetter);
});

function appendLetter(event: KeyboardEvent) {
  if (event.key === 'Delete' || event.key === 'Backspace') {
    userWord.value = userWord.value.slice(0, userWord.value.length - 1);
    return;
  }

  const isAlphaRegex = /^[A-Za-z]$/;
  //check if last key pressed is a valid en-US printable char. i.e "abcdefg..." and not "CTRL", "ALT" etc..
  if (!isAlphaRegex.test(event.key) && event.key !== ' ') {
    return;
  }

  if (event.key === ' ') {
    //handle "SPACEBAR" action, meaning we have to check word equality
    if (userWord.value.length === 0) {
      //if the word is empty and user presses spacebar nothing happens
      return;
    }
    //logic to check if userWord === words.value[0]?

    let wordToCheck = words.value.shift();

    if (!wordToCheck) {
      return;
    }

    previousWords.value.push(wordToCheck);

    //compare user type vs current word
    wordToCheck === userWord.value ? correctWords.value++ : wrongWords.value++;

    userWord.value = '';
    checkEnd();
    return;
  }
  userIndex.value++;
  lastLetterTyped.value = event.key;
  userWord.value += event.key;
}

//check if race ended/if word we checked is the last
function checkEnd() {
  if (words.value.length === 0) {
    alert(
      `THE END. Correct: ${correctWords.value} - Wrong: ${wrongWords.value}`
    );
    init();
  }
}

//init variable values
function init() {
  correctWords.value = 0;
  wrongWords.value = 0;
  words.value = [...store.getText];
  console.log(words.value);
  userIndex.value = 0;
  userWord.value = '';
}

//
const getWordColor = computed<string>(() => {
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
.inactive {
  color: grey;
}
</style>
