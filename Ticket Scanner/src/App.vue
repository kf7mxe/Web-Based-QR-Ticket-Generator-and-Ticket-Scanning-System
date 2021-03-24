<template>
  <div id="app">
<!-- Top Banner -->
    <div class="container">
      <div class="row mt-2 mb-2 banner-container">
        <div class=" col-sm ">
          <a href=""><img class="img-smaller" width="100%" src="@/assets/200x100-logo-placeholder.png" alt=""></a>
        </div>
        <div class="col-sm mt-3 banner">
        <p class="mt-3 h4 center text-center" href="index.html">PDF Ticket System</p>
        </div>
        <div class="col-sm mt-3">
        </div>
        <div class="col-sm mt-3">
        </div>
      </div>
    </div>
<TopNav></TopNav>
          <!-- router-view is where the components which are in the components folder are put into the vue app.  -->
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import TopNav from "./components/TopNav.vue"
import Footer from "./components/Footer.vue"
export default {
  name: 'app',
    components: {
    TopNav,
    Footer
    //Home,
   
  },
  data() {
    return {
      checkTicketString:"CheckTicket",
      adminString:"Admin",
    }
  },
  created(){
  
  },
  methods:{

  }
}
</script>

<style>
@media only screen and (max-width: 768px) {
    .img-smaller{
      width:50%;
    }
    .banner-container{
      text-align: center;
      margin: 0;
      margin-bottom:0;
      margin-top:0;
            padding: 0;

    }
    .banner{
            margin: 0;
      margin-bottom:0;
      margin-top:0;
      padding: 0;
    }
}
</style>
