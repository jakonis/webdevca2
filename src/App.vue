<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/mevnnav.png" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Reviews Web App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/reviews"><i class="fa fa-list" style="padding: 5px"> Manage Reviews</i></b-nav-item>
          <b-nav-item to="/review"><i class="fa fa-comments" style="padding: 5px"> Review</i></b-nav-item>
          <b-nav-item to="/map"><i class="fa fa-globe" style="padding: 5px"> Map</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
<!--    <google-map/>-->
  </div>
</template>

<script>
// import GoogleMap from './components/GoogleMap'

export default {
  name: 'App',
  components: {
    // GoogleMap
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    padding-top: 20px;
    background: url("./assets/bg.jpg") repeat center top;
  }
  .VueTables__sortable {
    cursor: pointer;
  }
  table.VueTables__table.table.table-striped.table-bordered.table-hover {
    color: white;
  }
  h3.vue-title {
    color: white;
  }
  label.form-label {
    color: white;
  }
  label.form__label {
    color: white;
  }
  .table-hover tbody tr:hover {
    color: red;
    background-color: rgba(0, 0, 0, 0.075);
  }
</style>
