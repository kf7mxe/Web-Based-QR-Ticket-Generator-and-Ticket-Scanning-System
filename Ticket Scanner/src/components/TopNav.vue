<template>
<!-- Navigation bar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
<div class="container">
  <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
          <a id="add-admin" :class="checkTicketActiveState" href="/CheckTicket">Check Ticket</a>
      </li>
      <li class="nav-item">
          <a id="add-admin" :class="adminActiveState" href="/Admin">Admin</a>
      </li>
      <li class="nav-item">
        <a :class="logInActiveState" @click="signInSignOut" id="navbarLoginLink">{{signInStatus}}</a>
      </li>
    </ul>
  </div>
</div>
</nav>
</template>

<script> 
import firebase from 'firebase'
export default {
name: 'TopNav',
data() {
return {
  signInStatus:'Login',
  currentRoute:'',
  checkTicketActiveState:'nav-link',
  adminActiveState:'nav-link',
  logInActiveState:'nav-link'
}
},
  mounted(){
    const currentUser = firebase.auth().currentUser
    console.log(currentUser)
    if(currentUser==null){
      this.signInStatus = "Login";
    }
    if(currentUser!=null){
      this.signInStatus = "Logout";
    }
  },
  methods: {
    signInSignOut(){
      let vueInstance = this
      if(vueInstance.signInStatus=="Logout"){
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          vueInstance.signInStatus = "Login"
          vueInstance.$router.push("Login")

        }).catch((error) => {
          // An error happened.
        });
      }
      if(vueInstance.signInStatus=="Login"){
        vueInstance.$router.push("Login")
      }
    }
  },
  watch: {
    currentRouteName: function() {
        // this.$route.name
        switch(this.$route.name){
      case 'CheckTicket':
        this.checkTicketActiveState = 'nav-link active'
        break;
      case 'Admin':
        this.adminActiveState = 'nav-link active'
        break;
      case 'Login':
        this.logInActiveState = 'nav-link active'
    }
    }
},
computed: {
    currentRouteName() {
        return this.$route.name;
    }
}
}
</script>
