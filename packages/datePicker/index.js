import DatePicker from './src/main.vue';
import FlatDatePicker from './src/flatPicker.vue';
import MobileScrollDatePicker from './src/mobileScroll/main.vue';

/* istanbul ignore next */
DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker);
};

export {DatePicker, FlatDatePicker, MobileScrollDatePicker};
