import DatePicker from './src/main.vue';

/* istanbul ignore next */
DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;
