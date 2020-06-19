<template>
  <section class="question-section" v-if="questions.length > 0">
    <div class="header">
      <h1>{{ seconds }}</h1>
    </div>
    <div class="question">
      <h2 class="questionNo">{{ questionNo }}.</h2>
      <h2 v-html="questions[questionNo].question"></h2>
    </div>
    <div class="choices">
      <div class="multiple" v-if="questions[questionNo].type === 'multiple'">
        <div
          id="multiple"
          class="box"
          :class="{'hover-bg': innerWidth > 768}"
          v-for="(item, index) in answers"
          :key="item.choice"
          @click="submitAnswer(item.value, index)"
        >
          <span>{{ item.choice }}.</span
          ><span class="choice" v-html="item.value"></span>
        </div>
      </div>
      <div class="boolean" v-else>
        <div class="box boolean-box" :class="{'hover-bg': innerWidth > 768}" @click="submitAnswer('True', 0)">
          <span>True</span>
        </div>
        <div class="box boolean-box" :class="{'hover-bg': innerWidth > 768}" @click="submitAnswer('False', 1)">
          <span>False</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Question',
  props: ['questions'],
  data() {
    return {
      questionNo: 1,
      answers: [],
      correctAnswer: '',
      timerCount: 60,
      score: 0,
      seconds: 60,
      started: true,
      innerWidth: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    const items = to.params;
    if (Object.keys(items).length === 0) next({ name: '' });
    else next();
  },
  created() {
    this.setupQuestion();
    setInterval(this.intervalCallback, 1000);
    this.innerWidth = window.innerWidth;
  },
  destroyed() {
    this.started = false;
  },
  methods: {
    intervalCallback() {
      if (!this.started) return false;

      if (this.seconds === 1) {
        this.started = false;
        this.timesUp();
        return false;
      } else {
        this.seconds--;
      }
    },
    timesUp() {
      const element = document.querySelector('.question-section');
      element.style['-webkit-animation'] = 'animRight .3s';

      this.questionNo += 1;

      this.checkQuestionNo();

      this.seconds = 60;
      this.started = true;
    },
    setupQuestion() {
      const answers = this.questions[this.questionNo].incorrect_answers;
      this.correctAnswer = this.questions[this.questionNo].correct_answer;
      const choices = ['A', 'B', 'C', 'D'];
      answers.push(this.correctAnswer);

      const shuffledAnswers = this.shuffleAnswers(answers);

      const modifiedAnswers = shuffledAnswers.reduce((arr, obj, i) => {
        arr.push({ choice: choices[i], value: obj });
        return arr;
      }, []);
      this.answers = modifiedAnswers;
    },
    shuffleAnswers(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    submitAnswer(value, index) {
      const items = document.querySelectorAll(
        this.questions[this.questionNo].type === 'multiple'
          ? '#multiple'
          : '.boolean-box'
      );

      if (value === this.correctAnswer) {
        this.score += 1;
        items[index].classList.add('correct');
      } else {
        items[index].classList.add('wrong');
      }

      setTimeout(() => {
        const element = document.querySelector('.question-section');
        element.style['-webkit-animation'] = 'animRight .3s';

        this.questionNo += 1;
        this.seconds = 60;

        this.checkQuestionNo();

        items[index].classList.remove('correct');
        items[index].classList.remove('wrong');

        setTimeout(() => {
          element.style['-webkit-animation'] = '';
        }, 700);
      }, 700);
    },
    checkQuestionNo() {
      if (this.questionNo === this.questions.length) {
        this.$router.push({
          name: 'Result',
          params: {
            score: this.score,
            totalQuestions: this.questions.length - 1,
          },
        });
      } else {
        this.setupQuestion();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin answerColor($color) {
  background-color: $color;
  border-color: $color !important;
  color: #ffffff;

  &:hover {
    background-color: $color !important;
    border-color: $color !important;
  }
}

.question {
  display: flex;
  text-align: center;

  .questionNo {
    margin-right: 10px;
  }
}

.choices {
  .multiple,
  .boolean {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .box {
      transition: 0.2s;
      min-width: 280px;
      width: 40%;
      height: auto;
      border: 2px solid #000000;
      margin: 5px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      font-weight: bold;
      padding: 20px 10px;
      font-size: 22px;
    }
  }

  .multiple {
    .choice {
      margin-left: 15px;
    }
  }

  .boolean {
    .box {
      min-width: 80px;
      border-radius: 50%;
      justify-content: center;
      margin: 5px 10px;
    }
  }
}

.hover-bg {
  &:hover {
    background: #202020;
    color: #ffffff;
    cursor: pointer;
  }
}

.correct {
  @include answerColor(#32cd56);
}

.wrong {
  @include answerColor(#fe4a49);
}
</style>
