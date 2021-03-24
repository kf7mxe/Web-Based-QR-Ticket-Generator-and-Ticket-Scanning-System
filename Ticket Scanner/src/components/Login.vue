<template>
<div class="container">
  <h1>Login</h1>
    <form id="form" v-on:submit.prevent="signIn">
      <div class="form-group row">
        <label for="" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
        <input type="text" id="ticketFirstName" v-model="user.email" class="form-control" placeholder="Email">
        </div>
    </div>
      <div class="form-group row">
        <label for="password" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
        <input type="password" id="ticketFirstName" v-model="user.password" class="form-control" placeholder="Password">
        </div>
      </div>
          <!-- <button href="/SignUp">Create Account</button> -->
        <div clas="row">
          <button @click="signIn()" class="btn btn-primary">Sign In</button>
        </div>
      <div class="row">
      <!-- Error Alert using Vue directives that is activated when the binded variable error is true and shows the binded error messages -->
      <div v-if="error" class="alert alert-danger">
      <a href="#" class="alert-link">{{errorMess}}</a>
    <div class="row">
    </div>
    </div>
          </div>
  </form>
  </div>
  
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  props: {
    msg: String
  },
  // firebase binded variables that contain the data in the ref table referneces
  firebase: {
  // Users:AuthenticatedUsers,
},
  data() {
    return {
      // json object binded var for user
      user:{
      email:'',
      password:''
    },
    error:false, // error is used with the v-if directives to determine to show error or not
    errorMess:'', // stores the error message that is returned from firebase error exceptions or other error messages
  }
  },
  methods: {
    signIn:function(){
      let vueInstance = this
      firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.password)
      .then((userCredentials)=>
      {
        console.log(userCredentials)
        vueInstance.$router.push({name:"CheckTicket"})
      })
      .catch((error)=>{
        console.log(error.message)
        this.error = true
        this.errorMess = error.message
      })
      }
  }
}
</script>
