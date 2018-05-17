import Select from './src/main.vue';

/* istanbul ignore next */
Select.install = function (Vue) {
  Vue.component(Select.name, Select);
};

export default Select;
