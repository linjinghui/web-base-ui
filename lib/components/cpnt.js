var components = {
  /*====================== button ======================*/
  'cmpButton': {
    template:
      '<button class="button" v-if="typeof fileoption===\'undefined\'" :style="{\'background-color\': backColor}" :id="id" :disabled="pdisabled" :data-clipboard-text="copydata" @click="clk">' +
        '<template v-if="value > 0"><span style="font-size: 14px;">{{value}}</span> s</template>' +
        '<slot v-else></slot>' +
      '</button>' +
      '<label class="button" v-else :style="{\'background-color\': backColor}" :id="id" :disabled="pdisabled" :for="\'file_\' + id">' +
        '<input type="file" :id="\'file_\' + id" :disabled="pdisabled" :accept="fileoption.accept" :multiple="fileoption.multiple" @change="file_change">' +
        '<slot></slot>' +
      '</label>',
    props: {
      theme: {
        type: String,
        default: 'primary'
      },
      disabled: {
        default: false
      },
      copydata: '',
      fileoption: '',
      // 计时器
      value: {
        type: Number,
        default: 0
      }
    },
    data: function() {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100),
        pdisabled: ''
      }
    },
    watch: {
      disabled: function(val) {
        this.pdisabled = this.parseDisabled();
      },
      value: function(val) {
        if (val > 0) {
          // 开始计时
          this.pdisabled = true;
          this.sub_count_down();
        } else {
          // 结束计时
          this.pdisabled = false;
        }
      }
    },
    computed: {
      backColor: function() {
        let obj = {
          primary: '#0079ff',
          success: '#67c23a',
          info: '#909399',
          warning: '#e6a23c',
          danger: '#f56c6c'
        };

        return obj[this.theme] || this.theme;
      }
    },
    mounted: function () {
      this.pdisabled = this.parseDisabled();
    },
    methods: {
      clk: function () {
        // 控制复制和倒计时状态不允许点击
        if (!this.copydata) {
          this.$emit('click');
        }
      },
      parseDisabled: function () {
        let result = '';

        if (typeof this.disabled === 'string') {
          result = this.disabled === 'true';
        } else {
          result = this.disabled;
        }
        return result;
      },
      init_copy_btn: function () {
        let _this = this;

        if (this.copydata) {
          this.clipboard = new ClipboardJS('#' + this.id);
          this.clipboard.on('success', function (e) {
            _this.$emit('cbk_copy', _this.copydata);
          });

          this.clipboard.on('error', function (e) {
            _this.$emit('cbk_copy', 'error');
          });
        }
      },
      file_change: function (e) {
        let el = e.target;
        let files = [];

        if (el.files) {
          for (let i = 0;i < el.files.length;i++) {
            let file = el.files[i];
            let name = file.webkitRelativePath || file.relativePath || file.name;
            let suffix = (name && name.split('.').length > 1) ? (name.split('.')[name.split('.').length - 1]) : '';

            files.push({
              size: file.size,
              name: name,
              type: file.type,
              suffix: suffix,
              file,
              el
            });
          }
        }
        this.$emit('cbk_file', files);
        // 清除input记录
        el.value = '';
      },
      sub_count_down: function () {
        let _this = this;

        setTimeout(function () {
          _this.$emit('input', _this.value - 1);
        }, 1000);
      }
    }
  },
  /*====================== input ======================*/
  'cmpInput': {
    template:
      '<span class="input" :class="{\'pdlt\': _pdlt, \'pdrt\': _showClear || _pdrt}">' +
        '<input autoComplete="off" ref="ipt" v-model.trim="val" :id="id" :type="type" :disabled="(disabled+\'\')===\'true\'" :maxlength="maxlength" :placeholder="placeholder" :onpaste="(nopaste+\'\'===\'true\')?\'return false\':\'\'" :readonly="(readonly+\'\')===\'true\'" @focus="evn_focus" @blur="evn_blur" @keyup="evn_keyup" @keyup.enter="evn_enter">' +
        '<slot>' +
          '<slot name="left"></slot><slot name="right"></slot>' +
          '<i class="cicon-cross-crle-chr-cpt center-v" v-if="_showClear" @click="clk_del"></i>' +
        '</slot>' +
      '</span>',
    props: {
      id: {
        default: ''
      },
      value: '',
      type: {
        default: 'text'
      },
      maxlength: '',
      readonly: '',
      placeholder: '',
      nopaste: '',
      autofocus: '',
      disabled: '',
      clear: {
        default: true
      },
      // number|mobile|fix|email|url|letter|chinese
      rule: ''
    },
    data: function () {
      return {
        val: this.value
      };
    },
    watch: {
      val: function (val) {
        this.$emit('input', val);
      },
      value: function (val) {
        this.val = val;
      },
      autofocus: function () {
        this.is_auto_focus();
      }
    },
    computed: {
      _showClear: function () {
        let slotLeft = this.$slots.left;
        let slotRight = this.$slots.right;
        let result = '';

        if (slotLeft && slotRight) {
          result = false;
        } else if (slotRight) {
          result = false;
        } else {
          // result = ((this.clear + '') !== 'false') && ((this.disabled + '') !== 'true') && this.val.length > 0;
          result = ((this.clear + '') !== 'false') && ((this.disabled + '') !== 'true') && ((this.readonly + '') !== 'true') && this.val && this.val.length > 0;
        }
        return result;
      },
      _pdlt: function () {
        return this.$slots.left;
      },
      _pdrt: function () {
        return this.$slots.right;
      }
    },
    beforeDestroy: function () {},
    mounted: function () {
      this.is_auto_focus();
    },
    methods: {
      clk_del: function () {
        this.val = '';
        this.do_focus();
      },
      evn_focus: function () {
        this.$emit('focus');
      },
      evn_blur: function () {
        this.do_reg_value();
        this.$emit('blur');
      },
      evn_keyup: function (event) {
        this.$emit('keyup', event.keyCode);
      },
      evn_enter: function () {
        this.$emit('enter');
      },
      do_focus: function () {
        this.$refs.ipt.focus();
      },
      is_auto_focus: function () {
        if (this.autofocus + '' === 'true') {
          this.do_focus();
        }
      },
      do_reg_value: function () {
        let value = this.val || '';

        if (this.rule === 'number') {
          this.val = value.replace(/[\D]+/g, '');
        } else if (this.rule === 'mobile') {
          value = value.replace(/[\D]+/g, '');
          if (value.indexOf('1') !== 0) {
            this.val = '1' + value.substring(0, 10);
          } else {
            this.val = value.substring(0, 11);
          }
        } else if (this.rule === 'fix') {
          this.val = value.replace(/[^0-9-]+/g, '');
        } else if (this.rule === 'email') {
          value = value.replace(/^@+|@+$/g, '').replace(/\s+/g, '');
          if (value.indexOf('@') < 0) {
            this.val = value + '@qq.com';
          }
        } else if (this.rule === 'url') {
          if (value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
            this.val = 'http://' + value;
          }
        } else if (this.rule === 'letter') {
          this.val = value.replace(/[^a-zA-Z]+/g, '');
        } else if (this.rule === 'chinese') {
          this.val = value.replace(/[^\u4e00-\u9fa5]+/g, '');
        } else if (typeof this.rule === 'string') {
          this.val = value.replace(new RegExp(this.rule, 'g'), '');
        }
      }
    }
  },
  /*====================== checkbox ======================*/
  'cmpCheckbox': {
    template:
      '<label class="checkbox" :disabled="(disabled+\'\')===\'true\'" @click="clk">' +
        '<i :class="{\'cicon-tick-cbdr\': _select, \'cicon-tick-cbdr-cemt\': !_select}" :style="_select?_style:\'\'"></i>' +
        '<slot></slot>' +
      '</label>',
    props: {
      disabled: '',
      value: '',
      val: '',
      theme: {
        type: String,
        default: '#0079ff'
      },
      beforeclk: {
        type: Function
      }
    },
    data: function () {
      return {};
    },
    watch: {},
    computed: {
      _style: function () {
        return {
          borderColor: this.theme,
          backgroundColor: this.theme
        };
      },
      _select: function () {
        var result = this.value;

        if (typeof this.value === 'boolean') {
          result = this.value;
        } else if (this.value instanceof Array) {
          var index = result.indexOf(this.val);
          result = index >= 0 && result[index] !== '';
        } else {
          result = this.value + '' === 'true';
        }
        return result;
      }
    },
    beforeDestroy: function () {},
    mounted: function () {},
    methods: {
      clk: function () {
        if (this.disabled + '' !== 'true') {
          if (this.beforeclk) {
            if (this.beforeclk()) {
              this.emt(this.val);
            }
          } else {
            this.emt(this.val);
            this.$emit('click');
          }
        }
      },
      emt: function (val) {
        if (typeof val === 'undefined') {
          this.$emit('input', !this.value);
        } else {
          var arr = JSON.parse(JSON.stringify(this.value));
          var index = arr.indexOf(val);

          if (index >= 0) {
            // 存在，需要删除
            arr.splice(index, 1);
          } else {
            // 不存在，添加
            arr[arr.length] = val;
          }
          this.$emit('input', arr);
        }
      }
    }
  },
  /*====================== radio ======================*/
  'cmpRadio': {
    template:
      '<label class="radio" :disabled="(disabled+\'\')===\'true\'" @click="clk">' +
        '<i :class="{\'selected\': value!==\'\'&&value===val}" :style="(value!==\'\'&&value===val) ? _style : \'\'"></i>' +
        '<slot></slot>' +
      '</label>',
    props: {
      disabled: '',
      value: '',
      theme: {
        type: String,
        default: '#0079ff'
      },
      beforeclk: {
        type: Function
      },
      val: ''
    },
    data: function () {
      return {};
    },
    watch: {},
    computed: {
      _style: function () {
        return {
          borderColor: this.theme,
          backgroundColor: this.theme
        };
      }
    },
    beforeDestroy: function () {},
    mounted: function () {},
    methods: {
      clk: function () {
        if (this.disabled + '' !== 'true') {
          if (this.beforeclk) {
            this.beforeclk() && this.$emit('input', this.val);
          } else {
            this.$emit('input', this.val);
          }
        }
      }
    }
  },
  /*====================== switch ======================*/
  'cmpSwith': {
    template: '<button class="swith" :disabled="(disabled+\'\')===\'true\'" :class="(value+\'\')===\'true\'?\'on\':\'off\'" :style="(value+\'\')===\'true\'?_style:\'\'" @click="clk"></button>',
    props: {
      disabled: '',
      value: '',
      theme: {
        default: '#0079ff'
      },
      beforeclk: {
        type: Function
      }
    },
    data: function () {
      return {};
    },
    watch: {},
    computed: {
      _style: function () {
        return {
          'backgroundColor': this.theme
        };
      }
    },
    beforeDestroy: function () {},
    mounted: function () {},
    methods: {
      clk: function () {
        if (this.beforeclk) {
          this.beforeclk() && this.$emit('input', !this.value);
        } else {
          this.$emit('input', !this.value);
        }
      }
    }
  },
  /*====================== datePicker ======================*/
  'cmpDatePicker': {
    template:
      '<cmp-input type="text" maxlength="20" v-model="value" :class="id" :placeholder="placeholder" :disabled="(disabled+\'\')===\'true\'">' +
        '<i class="cicon-calendar-cpt-chr center-v" slot="right" style="font-size: 26px;color: #999;background-color: transparent;"><span></span></i>' +
      '</cmp-input>',
    props: {
      value: '',
      placeholder: {
        default: '请选择日期'
      },
      disabled: {
        default: false
      }
    },
    data: function () {
      return {
        id: 'datepick_' + new Date().getTime() + parseInt(Math.random() * 100),
        fpicker: ''
      };
    },
    watch: {
      value: function (val) {
        this.fpicker && this.fpicker.setDate(val, false);
      },
      disabled: function (val) {
        if (val + '' !== 'true') {
          this.initDatePicker();
        }
      }
    },
    computed: {},
    created: function () {
      var domCss = this.innerCssLink('./plugins/dataPicker/flatpickr.min.css');
      var domJs = this.innerJsLink('./plugins/dataPicker/flatpickr.min.js');
    },
    beforeDestroy: function () {},
    mounted: function () {
      var _this = this;
      setTimeout(function () {
        if (_this.disabled + '' !== 'true') {
          _this.initDatePicker();
        }
      }, 500);
    },
    methods: {
      emtIpt: function (val) {
        this.$emit('input', val);
      },
      callback: function (date, dateStr) {
        this.$emit('callback', {
          date: date,
          str: dateStr
        });
      },
      initDatePicker: function () {
        var _this = this;
        var myInput = document.querySelector('.' + _this.id);

        _this.fpicker = flatpickr(myInput, {
          locale: {
            weekdays: {
              shorthand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
              longhand: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            },
            months: {
              shorthand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              longhand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            rangeSeparator: ' 至 ',
            weekAbbreviation: '周',
            scrollTitle: '滚动切换',
            toggleTitle: '点击切换 12/24 小时时制'
          },
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
          onChange: function (selectedDates, dateStr, instance) {
            _this.emtIpt(dateStr);
            _this.callback(selectedDates, dateStr);
          }
        });
      },
      innerCssLink: function (href) {
        var domHead = document.querySelector('head');
        var domLink = document.createElement('link');
        domLink.setAttribute('type', 'text/css');
        domLink.setAttribute('rel', 'stylesheet');
        domLink.setAttribute('href', href);
        domHead.appendChild(domLink);
        return domLink;
      },
      innerJsLink: function (src) {
        var domHead = document.querySelector('head');
        var domScript = document.createElement('script');
        domScript.setAttribute('type', 'text/javascript');
        domScript.setAttribute('src', src);
        domHead.appendChild(domScript);
        return domScript;
      }
    }
  },
  /*====================== selector ======================*/
  'cmpSelector': {
    template:
      '<section class="rangeMenu" :disabled="disabled+\'\'===\'true\'">' +
        '<a v-for="(item, index) in value" :key="item.id">' +
          '<label><slot :item="item">{{item}}</slot></label>' +
          '<i class="cicon-cross-cpt-crle-chr cross" @click="clk_del(index)"></i>' +
        '</a>' +
        '<a class="add" @click="clk_add">添加</a>' +
      '</section>',
    props: {
      value: {
        default: function () {
          return [];
        }
      },
      disabled: {
        default: false
      }
    },
    data: function () {
      return {};
    },
    watch: {},
    computed: {},
    beforeDestroy: function () {},
    mounted: function () {},
    methods: {
      emtVal: function (val) {
        this.$emit('input', val);
      },
      clk_add: function () {
        if (this.disabled + '' !== 'true') {
          this.clk_selector();
        }
      },
      clk_del: function (index) {
        if (this.disabled + '' !== 'true') {
          var data = '';

          try {
            data = JSON.parse(JSON.stringify(this.value));
            data.splice(index, 1);
            this.emtVal(data);
          } catch (e) {
            //
          }
        }
      },
      clk_selector: function () {
        var _this = this;
        var params = {
          //  [String, String, ...],已选用户
          // 'selectedUsers': _this.value,
          // 'selectedDeparts': '',
          // 选择联系人范围：1 - 最近联系人, 2 - 企业组织架构，4 - 群组， 8 - 好友， 16 - 通讯录  注：如果需要多选，则加法运算，比如全选为31（1+2+4+8+16）
          'area': 31,
          // 要选择的号码类型. 可多选. 提供如下选项：1 - 用户id(userid)，2 - 手机号码，4 -
          'type': 1,
          //（可选，默认不限制人数） 最大选择人数
          'max': 200,
          // 是否要返回传入的初始化成员，1:要 0:不要
          'retInit': 1
          // （可选，默认显示所有组织）组织id列表， 当area包含2时生效，在选择器中显示的可选择组织
          // 'entIds': entIds,
          // 'entId': parseInt(enterId),
          // // 是否显示多组织，1:多组织 0:单组织
          // 'multiEnt': parseInt(multiEnt),
        };

        if (window.WebViewJavascriptBridge) {
          params.selectedUsers = function () {
            var arr = [];
            _this.value.forEach(function (item) {
              if (item.id) {
                arr[arr.length] = item.id;
              }
            });
            return arr;
          }();
          params.selectedDeparts = function () {
            var arr = [];
            _this.value.forEach(function (item) {
              if (item.departId) {
                arr[arr.length] = item.departId ;
              }
            });
            return arr;
          }();
          window.WebViewJavascriptBridge.callHandler('chooseUsers', params, function (data) {
            data = JSON.parse(data);
            var users = data.responseData.selectedUsers || [];
            var departs = data.responseData.selectedDeparts || [];
            _this.emtVal(users.concat(departs));
          });
        } else if (window.external.chooseUsers) {
          params.selectedUsers = _this.value;
          window.external.chooseUsers(JSON.stringify(params), function (data) {
            data = JSON.parse(data);
            data.responseData && _this.emtVal(data.responseData);
          });
        } else {
          alert('请在客户端中使用此功能！');
        }
      },
    }
  },
  /*====================== textarea ======================*/
  'cmpTextarea': {
    template:
      '<div class="text-area" :class="{\'focus\': isFocus, \'disabled\': disabled+\'\'===\'true\'}">' +
        '<textarea :placeholder="placeholder" :rows="rows" :maxlength="maxlength" v-model="pvalue" :onpaste="noPaste ? \'return false\' : \'\'" :disabled="disabled+\'\'===\'true\'" @focus="fun_focus" @blur="fun_blur"></textarea>' +
        '<p v-if="residualSize >= 0">还能输入{{residualSize}}个字</p>' +
      '</div>',
    props: {
      value: {
        default: ''
      },
      placeholder: {
        default: ''
      },
      rows: {
        default: 10
      },
      maxlength: '',
      noPaste: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        isFocus: false,
        pvalue: this.value
      };
    },
    watch: {
      value: function (val) {
        this.pvalue = val;
      },
      pvalue: function (val) {
        this.$emit('input', val);
      }
    },
    computed: {
      residualSize: function () {
        var result;

        if (this.maxlength) {
          result = this.maxlength - this.value.length;
        }
        return result;
      }
    },
    beforeDestroy: function () {},
    mounted: function () {},
    methods: {
      fun_focus: function () {
        this.isFocus = true;
        this.$emit('focus');
      },
      fun_blur: function () {
        this.isFocus = false;
        this.$emit('blur');
      }
    }
  },
  /*====================== form ======================*/
  'cmpForm': {
    template:
      '<div class="ds-form" :class="{\'inline\': value.inline, \'mobileClient\': isMobileClient}">' +
        '<fieldset v-for="(item, idx) in value.itemList" :class="{\'active\': model.active===idx}" :key="item.key" @click="clk_item(idx)">' +
            '<p :class="{\'star\': (item.required+\'\')===\'true\'}" v-show="value.inline||item.label">{{item.label?(item.label+\'：\'):\'\'}}</p>' +
            '<div :class="[item.type,item.align]" :style="{\'text-align\': item.align}">' +
                '<cmp-input v-if="item.type===\'_input\'||item.type===\'_password\'" v-model="item.value" :type="item.type.slice(1)" :maxlength="item.maxlength" :placeholder="item.placeholder" :nopaste="item.nopaste" :autofocus="item.autofocus" :disabled="edit||item.disabled" :rule="item.rule" :readonly="item.readonly"></cmp-input>' +
                '<cmp-textarea v-if="item.type===\'_textarea\'" v-model="item.value" :placeholder="item.placeholder" :rows="item.rows" :maxlength="item.maxlength" :noPaste="item.noPaste" :disabled="edit||item.disabled"></cmp-textarea>' +
                '<cmp-checkbox v-if="item.type===\'_checkbox\'" v-for="info in item.option" v-model="item.value" :val="info.val" :disabled="edit||info.disabled">{{info.label}}</cmp-checkbox>' +
                '<cmp-radio v-if="item.type===\'_radio\'" v-for="info in item.option" v-model="item.value" :val="info.val" :disabled="edit||info.disabled">{{info.label}}</cmp-radio>' +
                '<cmp-swith v-if="item.type===\'_swith\'" v-model="item.value" :disabled="edit||item.disabled"></cmp-swith>' +
                '<template v-if="item.type===\'_datepicker\'" v-for="(info, index) in item.option">' +
                    '<template v-if="index>0">&nbsp;&nbsp;{{item.join}}&nbsp;&nbsp;</template>' +
                    '<cmp-date-picker v-model="item.value[index]" :placeholder="info.placeholder" :disabled="edit||item.disabled"></cmp-date-picker>' +
                '</template>' +
                '<cmp-selector v-if="item.type===\'_selector\'" v-model="item.value" :disabled="edit||item.disabled">' +
                    '<template slot-scope="props">{{props.item.name||props.item.departName}}</template>' +
                '</cmp-selector>' +
                '<cmp-button v-if="item.type===\'_button\'" v-for="info in item.option" :theme="info.theme" :disabled="edit||info.disabled" :class="info.type" @click="clk_btn(info.type)">{{info.label}}</cmp-button>' +
                '<small class="error-tip" v-if="starCheck&&(item.required+\'\'===\'true\')&&item.value.length===0">必填项，请输入或选择内容。</small>' +
            '</div>' +
        '</fieldset>' +
      '</div>',
    props: {
      // 是否编辑状态
      edit: {
        dafault: false
      },
      value: {
        type: Object,
        default: function () {
          return {};
        }
      },
      model: {
        type: Object,
        default: function () {
          return {
            active: ''
          };
        }
      }
    },
    data: function () {
      return {
        dataInfo: {},
        // active: '',
        // 是否开始表单验证
        starCheck: false,
        isMobileClient: ''
      };
    },
    watch: {
      'value.itemList': {
          deep: true,
          handler: function (val) {
              var _this = this;
              for (var i = 0;i < val.length;i++) {
                  var item = val[i];
                  var result = item.value ? JSON.parse(JSON.stringify(item.value)) : item.value;
                  if (item.key) {
                      _this.$set(_this.dataInfo, item.key + '', result);
                  }
              }
          }
      }
    },
    computed: {},
    beforeDestroy: function () {},
    mounted: function () {
      var client = this.browerVersion();
      this.isMobileClient = (client.ios || client.android);
    },
    methods: {
      clk_item: function (index) {
          if (this.edit) {
              // this.active = index;
              this.model.active = index;
              this.$emit('clkitem', index);
          }
      },
      clk_btn: function (type) {
          if (type === 'commit') {
              var _this = this;
              _this.starCheck = true;
              setTimeout(function () {
                var errors = document.querySelector('.error-tip');
                if (!errors) {
                  _this.$emit('commit', _this.dataInfo);
                }
              }, 100);
          } else if (type === 'cancel') {
              this.starCheck = false;
              this.$emit('cancel');
          }
      },
      browerVersion: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
          // IE内核
          trident: u.indexOf('Trident') > -1,
          // opera内核
          presto: u.indexOf('Presto') > -1,
          // 苹果、谷歌内核
          webKit: u.indexOf('AppleWebKit') > -1,
          // 火狐内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
          // 是否为移动终端
          mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
          // ios终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          // android终端或者uc浏览器
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
          // 是否为iPhone或者QQHD浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
          // 是否iPad
          iPad: u.indexOf('iPad') > -1,
          // 是否web应该程序，没有头部与底部
          webApp: u.indexOf('Safari') == -1,
          // 加mobile和这个属性一起，可以判断uc浏览器
          linux: u.indexOf('linux') > -1,
          // trident IE内核 并且包含WP7标示 windows phone7手机
          wp7: (u.indexOf('WP7') > -1) || (u.indexOf('Windows Phone OS') > -1)
        }
      }
    }
  },
  /*====================== demo ======================*/
  'demo': {
    template: '',
    props: {},
    data: function () {
      return {};
    },
    watch: {},
    computed: {},
    beforeDestroy: function () {},
    mounted: function () {},
    methods: {}
  }
}

var install = function (Vue) {
  if (install.installed) return;
  for (var key in components) {
    Vue.component(key, components[key]);
  }
}

install(Vue);
