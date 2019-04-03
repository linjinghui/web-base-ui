// import DatePicker from './src/main.vue';
// import FlatDatePicker from './src/flatPicker.vue';
// import MobileScrollDatePicker from './src/mobileScroll/main.vue';
import Laydate from './src/laydate.vue';

/* istanbul ignore next */
Laydate.install = function (Vue) {
  Vue.component(Laydate.name, Laydate);
};

export default Laydate;
