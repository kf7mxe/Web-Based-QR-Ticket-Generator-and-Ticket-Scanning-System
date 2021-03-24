<template>
<div class="container">
    <div class="alert alert-danger mt-2" role="alert">
  <h1>Authentication Error Only Admin or Checker can view this page.</h1>
  <h2>Please Sign in with a Admin account if you are trying to access the admin page, else sign in with a Checker account</h2>
</div>
</div>
</template>

<script>
export default {
  name: 'AuthenticationError',
  props: {
    msg: String
  },
  data() {
    return {
      // json object binded var for user
  }
  },
}
</script>