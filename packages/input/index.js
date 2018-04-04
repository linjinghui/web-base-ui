import Input from './src/input.vue';
import InputIcon from './src/inputIcon.vue';
import InputSearch from './src/inputSearch.vue';
import InputPlaceholder from './src/inputPlacehold.vue';

/* istanbul ignore next */
Input.install = function (Vue) {
  Vue.component(Input.name, Input);
};

InputIcon.install = function(Vue) {
  Vue.component(InputIcon.name, InputIcon);
};

InputSearch.install = function(Vue) {
  Vue.component(InputSearch.name, InputSearch);
};

InputPlaceholder.install = function(Vue) {
  Vue.component(InputPlaceholder.name, InputPlaceholder);
};

export {Input, InputIcon, InputSearch, InputPlaceholder};
