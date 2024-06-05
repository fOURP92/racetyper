import { defineStore } from 'pinia';

export const useTextStore = defineStore('text', {
  state: () => ({
    text: `Ut rerum vel voluptatem qui totam Tempore dolores eum expedita adipisci dolorem id quia Maiores laudantium nam harum consequatur asperiores autem sit quia`
      .toLowerCase()
      .split(' '),
  }),
  getters: {
    getText: (state) => state.text,
  },
});
