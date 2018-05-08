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
import Echarts from './echarts/index';
import ImageCrop from './imageCrop/index';
import Table from './table/index';
import Sidebar from './sidebar/index';
import Textarea from './textarea/index';

const components = [Loading];
const install = function (Vue) {
  if (install.installed) return;
  components.map(function (component) {
    Vue.component(component.name, component);
  });
}

export {install, Button, Checkbox, Radio, Input, Swith, Tooltip, Loading, Progress, Slider, DatePicker, RangeMenu, Shuttle, Pagebar, Echarts, ImageCrop, Table, Sidebar, Textarea};
