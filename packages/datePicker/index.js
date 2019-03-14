import DatePicker from './src/main.vue';
import FlatDatePicker from './src/flatPicker.vue';
import MobileScrollDatePicker from './src/mobileScroll/main.vue';
import Laydate from './src/laydate.vue';

/* istanbul ignore next */
DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker, Laydate);
};

export {DatePicker, FlatDatePicker, MobileScrollDatePicker, Laydate};
