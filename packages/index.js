import Button from './button/index';
import Checkbox from './checkbox/index';
import Radio from './radio/index';
import Input from './input/index';
import Swith from './swith/index';
import Tooltip from './tooltip/index';
import Loading from './loading/index';
import Progress from './progress/index';
import Slider from './slider/index';
import DatePicker from './datePicker/index';
import RangeMenu from './rangeMenu/index';
import Shuttle from './shuttle/index';
import Pagebar from './pagebar/index';

import Vue from 'vue';

// 用于组件通信
window.EVENTBUS = new Vue();

const components = [Button, Checkbox, Radio, Input, Swith, Tooltip, Loading, Progress, Slider, DatePicker, RangeMenu, Shuttle, Pagebar];
const install = function (Vue) {
  if (install.installed) return;
  components.map(function (component) {
    Vue.component(component.name, component);
  });
}

export {Button, Checkbox, Radio, Input, Swith, Tooltip, Loading, Progress, Slider, DatePicker, RangeMenu, Shuttle, Pagebar};
