import GamePt from './src/main.vue';

/* istanbul ignore next */
GamePt.install = function (Vue) {
  Vue.component(GamePt.name, GamePt);
};

export default GamePt;
