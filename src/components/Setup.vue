<template>
  <section class="setup">
    <div class="loading" v-if="pageLoading">
      <img src="../assets/img/idea.svg" width="100" />
      <b-spinner class="spinner" large></b-spinner>
    </div>
    <div class="setup-container" v-if="!pageLoading">
      <div class="top-img">
        <img src="../assets/img/idea.svg" width="100" />
        <h3>Let's PractQuiz!</h3>
      </div>
      <div class="select-container">
        <label for="numbers">Number of Questions</label>
        <b-form-select
          v-model="number"
          name="numbers"
          :options="numbers"
        ></b-form-select>
      </div>
      <div class="select-container">
        <label for="categories">Select Category</label>
        <b-form-select
          v-model="category"
          name="categories"
          :options="categories"
          value-field="id"
          text-field="name"
        ></b-form-select>
      </div>
      <div class="select-container">
        <label for="difficulties">Select Difficulty</label>
        <b-form-select
          v-model="difficulty"
          name="difficulties"
          :options="difficulties"
        ></b-form-select>
      </div>
      <div class="select-container">
        <label for="difficulties">Select Type</label>
        <b-form-select
          v-model="type"
          name="types"
          :options="types"
        ></b-form-select>
      </div>
      <div>
        <button class="primary" @click="start">
          START
          <b-spinner class="spinner" v-if="busy" small></b-spinner>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Setup',
  data() {
    return {
      opentbAPI: 'https://opentdb.com/api.php?',
      numbers: [],
      categories: [],
      difficulties: [
        { value: '', text: 'Any Difficulty' },
        { value: 'easy', text: 'Easy' },
        { value: 'medium', text: 'Medium' },
        { value: 'hard', text: 'Hard' },
      ],
      types: [
        { value: '', text: 'Any Type' },
        { value: 'multiple', text: 'Multiple Choice' },
        { value: 'boolean', text: 'True / False' },
      ],
      number: '10',
      category: '',
      difficulty: '',
      type: '',
      busy: false,
      pageLoading: true,
    };
  },
  created() {
    for (let i = 1; i <= 50; i++) {
      this.numbers.push(i);
    }
    this.getCategories();
  },
  methods: {
    getCategories() {
      fetch('https://opentdb.com/api_category.php/')
        .then((result) => {
          return result.json();
        })
        .then((results) => {
          results.trivia_categories.unshift({ id: '', name: 'Any Category' });
          this.categories = results.trivia_categories;
          this.pageLoading = false;
        });
    },
    start() {
      this.busy = true;
      fetch(
        `${this.opentbAPI}amount=${this.number}&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}`
      )
        .then((result) => {
          return result.json();
        })
        .then((value) => {
          const results = value.results;
          const dummyQuestion = { name: 'dummy' };
          results.unshift(dummyQuestion);

          const element = document.querySelector('.setup-container');
          element.style['-webkit-animation'] = 'animRight .3s forwards';

          setTimeout(() => {
            this.$router.push({
              name: 'Question',
              params: { questions: results },
            });
          }, 500);

          this.busy = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.setup-container {
  .top-img {
    margin-bottom: 15px;
    text-align: center;

    img {
      margin-bottom: 15px;
    }
  }

  div {
    margin: 10px 0;
  }

  div select {
    width: 280px;
    height: 50px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 17px;

    &:focus {
      outline: none;
    }
  }

  .select-container {
    display: flex;
    flex-direction: column;
    font-size: 18px;
  }
}

// .shake2 {
//   -webkit-animation-name: wobble;
//   animation-name: wobble;
//   animation-duration: 1s;
//   animation-iteration-count: infinite;
//   animation-timing-function: linear;
//   transform-origin: 50% 100%;
// }

// @keyframes wobble {
//   0% {
//     -webkit-transform: none;
//     transform: none;
//   }

//   15% {
//     -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
//     transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
//   }

//   30% {
//     -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
//     transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
//   }

//   45% {
//     -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
//     transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
//   }

//   60% {
//     -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
//     transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
//   }

//   75% {
//     -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
//     transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
//   }

//   100% {
//     -webkit-transform: none;
//     transform: none;
//   }
// }
</style>
