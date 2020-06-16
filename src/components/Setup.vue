<template>
  <section>
    <div class="setup-container" v-if="showSetup">
      <div class="top-img">
        <img src="../assets/img/idea.svg" width="100" />
      </div>
      <div>
        <input type="number" placeholder="Number of Questions" />
      </div>
      <div>
        <select v-model="category">
          <option disabled value="">Select Category</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div>
        <select v-model="difficulty">
          <option disabled value="">Select Difficulty</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div>
        <select v-model="type">
          <option disabled value="">Select Type</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div>
        <button class="primary" @click="start">Start</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Setup',
  data() {
    return {
      category: '',
      difficulty: '',
      type: '',
      showSetup: true,
    };
  },
  created() {
    this.getData();
    console.log(this.value);
  },
  methods: {
    getData() {
      fetch(`https://opentdb.com/api.php?amount=13`)
        .then((result) => {
          return result.json();
        })
        .then((results) => {
          console.log(results);
        });
    },
    start() {
      const element = document.querySelector('.setup-container');
      element.style['-webkit-animation'] = 'animRight .3s forwards';

      setTimeout(() => {
        this.$router.push({
          name: 'Question',
        });
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.setup-container {
  .top-img {
    margin-bottom: 25px;
    text-align: center;
  }

  div {
    margin: 10px 0;
  }

  div select,
  div input {
    width: 250px;
    height: 40px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  div button {
    width: 250px;
    margin-top: 20px;
    border: 0;
    border-radius: 20px;
    padding: 10px;
    background: #3fd8f3;
    color: #ffffff;
    transition: 0.5s;

    &:hover {
      background: #0eb9d8;
    }
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
