import Vue from 'vue';
import VueRouter from 'vue-router';
import Setup from '../components/Setup.vue';
import Question from '../components/Question.vue';
import Result from '../components/Result.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Setup',
    component: Setup,
    props: true,
    meta: { title: 'Setup - PractQuiz' },
  },
  {
    path: '/question',
    name: 'Question',
    component: Question,
    props: true,
    meta: { title: 'Question - PractQuiz' },
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
    props: true,
    meta: { title: 'Result - PractQuiz' },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
