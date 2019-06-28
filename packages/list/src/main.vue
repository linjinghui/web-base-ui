<!-- 
功能介绍：
1、
 -->

<template>
  <ol class="wrap-list">
    <slot name="dt"></slot>
    <slot name="dd" v-for="(item,index) in data" :index="index" :item="item"></slot>
  </ol>
</template>

<script type="text/babel">
  export default {
    name: 'List',
    data: function () {
      return {
        id: 'list_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      data: {
        default: function () {
          return [];
        }
      }
    },
    watch: {},
    computed: {
      // 
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      // 
    },
    methods: {
      // 
    }
  };
</script>

<style scoped lang="scss">
  
  .wrap-list {
    user-select: none;
    background-color: #fff;

    > dt, > dd {
      position: relative;
      display: flex;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
      word-break: break-all;

      > * {
        flex: 1;
      }
      > *:nth-of-type(2) {
				text-align: right;
			}
    }

    > dt {
      padding-top: 4px;
      padding-bottom: 4px;
    }

    // 下划线
    > dt:not(.noline):before, 
		> dd:not(.noline):not(:last-of-type):before {
      content: '';
			position: absolute;
			bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
			width: calc(100% - 20px);
			border-bottom: solid 1px #f3f3f3;
    }

    // 箭头
    > dt.arrow,
    > dd.arrow {
			padding-right: 25px;
		}
		> dt.arrow:after,
		> dd.arrow:after {
			content: '';
			position: absolute;
			top: 0;
			right: 12px;
			bottom: 0;
			margin: auto;
			width: 8px;
			height: 8px;
			border: solid 1px #a3a3a3;
			border-left: 0;
			border-bottom: 0;
			transform: rotate(45deg);
    }
    
    > dd:active {
      background-color: #f4f4f4;
    }

    > dd {

      img {
        border-radius: 5px;
      }
      
      // 上文、下大图
      > div.text-img {
        width: 100%;
        font-size: 0;
        > p {
          line-height: 24px;
          font-size: 14px;
        }

        > img {
          display: inline-block;
          margin-right: 5%;
        }
        > img:last-of-type {
          margin-right: 0;
        }
        
      }

    }
  }
</style>