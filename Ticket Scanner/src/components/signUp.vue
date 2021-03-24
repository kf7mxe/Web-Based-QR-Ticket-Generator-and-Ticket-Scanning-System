<template>
<div class="container">
<div class="modal" id="signUpModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h1>Create Account</h1>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <div class="modal-body">
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
      <div class="modal-footer">
            <button class="btn btn-primary" type=""> Sign In</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
// import Firebase from 'firebase'
export default {
  name: 'SignIn',
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
}
</script>
