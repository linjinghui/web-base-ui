<!-- 
功能介绍：
1、
 -->

<template>
  <ol class="wrap-list">
    <slot name="dt"></slot>
    <slot name="dds"></slot>
  </ol>
</template>

<style scoped lang="scss">
  
  .wrap-list {
    border: solid 1px #f3f3f3;
    border-left: 0;
    border-right: 0;
    user-select: none;

    > dt, > dd {
      position: relative;
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      align-items: center;
      padding-top: 8px;
      padding-bottom: 8px;
      width: 100%;
      line-height: 22px;
      word-break: break-all;

      > p {
        width: 100%;
      }

      > .flex-1 {
        flex: 1;
      }

      // 输入框
      > input {
        border: 0;
        padding: 0;
        background-color: transparent;
      }

      // 文本向右
      .txt-r {
        text-align: right;
      }

      // 箭头
      .arrow {
        position: relative;
        display: inline-block;
        width: 12px;
        height: 12px;
      }
      .arrow:after {
        content: '';
        position: absolute;
        top: 0;
        right: 4px;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 6px;
        height: 6px;
        color: inherit;
        border: solid 1px;
        border-left: 0;
        border-bottom: 0;
        transform: rotate(45deg);
      }
    }

    // 下划线
    > dt:not(.noline):after, 
		> dd:not(.noline):not(:last-of-type):after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
			border-bottom: solid 1px #f3f3f3;
    }
    
    > dd:active {
      background-color: #f4f4f4;
    }

  }
</style>