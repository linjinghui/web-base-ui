// import '../src/style/main.css';

import {Input, InputIcon, InputSearch, InputPlaceholder} from './input/index';
import {Dialog, Contact, Alert, Confirm} from './dialog/index';
import Button from './button/index';
import Tip from './tip/index';
import Loading from './loading/index';
import CheckBox from './checkBox/index';
import Radio from './radio/index';
import Sidebar from './sidebar/index';
import Pagebar from './pagebar/index';
import DrapMenu from './dropMenu/index';
import RangeMenu from './rangeMenu/index';
import Switch from './switch/index';
import Echarts from './echarts/index';
import {Tabel, ScrollTabel} from './tabel/index';
import Selector from './selector/index';
import Vtree from './vtree/index';
import Contextmenu from './contextmenu/index';
import Textarea from './textarea/index';
import Search from './search/index';
import Multiselect from './multiselect/index';
import Banner from './banner/index';
import ImageCrop from './imageCrop/index';

import Vue from 'vue';

// 用于组件通信
window.EVENTBUS = new Vue();

const components = [Input, InputIcon, InputSearch, InputPlaceholder, Dialog, Button, Alert, Confirm, Tip, Loading, CheckBox, Sidebar, Pagebar, DrapMenu, RangeMenu, Radio, Switch, Echarts, Tabel, ScrollTabel, Selector, Vtree, Contextmenu, Textarea, Search, Multiselect, Banner, ImageCrop];
const install = function (Vue) {
  if (install.installed) return;
  components.map(function (component) {
    Vue.component(component.name, component);
  });
}

export {install, Input, InputIcon, InputSearch, InputPlaceholder, Dialog, Contact, Button, Alert, Confirm, Tip, Loading, CheckBox, Sidebar, Pagebar, DrapMenu, RangeMenu, Radio, Switch, Echarts, Tabel, ScrollTabel, Selector, Vtree, Contextmenu, Textarea, Search, Multiselect, Banner, ImageCrop};
