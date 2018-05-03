<template>
  <div class='table-cont' id='table-cont' ref="wrapTable">
    <table class="table table-striped">
      <thead ref="head">
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    name: 'Table',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    data: function () {
      return {
        // 滚动速度，默认1
        settings: {
          wheelSpeed: 1
        },
        head: '',
        wrapTable: ''
      };
    },
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    watch: {
      //
    },
    mounted: function () {
      this.head = this.$refs.head;
      this.wrapTable = this.$refs.wrapTable;
      this.wrapTable.addEventListener('scroll', this.scrollHandle);
    },
    methods: {
      scrollHandle: function (e) {
        let scrollTop = e.target.scrollTop;
        let dmHead = e.target.querySelector('thead');

        dmHead.style.transform = 'translateY(' + scrollTop + 'px)';
      }
    },
    filters: {
      //
    }
  };
</script>

<style lang="scss">
  .table-cont {
    /**make table can scroll**/
    max-height: 200px;
    overflow: auto;
    /** add some style**/
    /*padding: 2px;*/
    background: #ddd;
    margin: 20px 10px;
    box-shadow: 0 0 1px 3px #ddd;
  }
  thead{
    background-color: #ddd;
  }
</style>