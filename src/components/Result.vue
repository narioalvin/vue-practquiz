<template>
  <section class="result">
    <img src="../assets/img/idea.svg" width="120" />
    <h1 v-if="score === totalQuestions">Wow! Perfect Score! :)</h1>
    <h1 v-else-if="score === totalQuestions - 1">Almost Perfect! :)</h1>
    <h1 v-else-if="score < 3 && totalQuestions >= 5">Could be better! :)</h1>
    <h1 v-else-if="score === 0">Sad. But you can try again! :)</h1>
    <h1 v-else>Awesome! :)</h1>
    <h1>{{ score }}/{{ totalQuestions }}</h1>
    <button class="primary" @click="tryAgain">
      TRY AGAIN
    </button>
  </section>
</template>

<script>
export default {
  name: 'Result',
  props: ['score', 'totalQuestions'],
  mounted() {
    const element = document.querySelector('.result');
    element.style['-webkit-animation'] = 'animLeft .3s';
  },
  beforeRouteEnter(to, from, next) {
    const items = to.params;
    if (Object.keys(items).length === 0) next({ name: '' });
    else next();
  },
  methods: {
    tryAgain() {
      this.$router.push({ name: 'Setup' });
    },
  },
};
</script>

<style lang="scss" scoped></style>
