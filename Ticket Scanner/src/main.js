import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
import "firebase/firestore";
require ("firebase/auth")
import VueRouter from 'vue-router'
import CheckTicket from './components/CheckTicket.vue'
import Admin from './components/Admin.vue'
import Login from './components/Login.vue'
import SignUp from './components/signUp.vue'
import AuthenticationError from './components/AuthenticationError.vue'

import jsPDF from 'jspdf'
import VueQrcodeReader from "vue-qrcode-reader";
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(jsPDF)
Vue.use(VueQrcodeReader);
Vue.use(VueLocalStorage)

let app = ''

//router loads different pages or components into the html section that has <router-view></router-view>
const router = new VueRouter({
  mode:'history',
  routes: [
    {
      path: '',
      name: 'CheckTicket',
      component: CheckTicket,
      props:true,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/CheckTicket',
      name: 'CheckTicket',
      component: CheckTicket,
      props:true,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      props:true,
      meta:{
        admin:true
      }
    },
    {
      path:'/Login',
      name:'Login',
      component: Login,
    },
    {
      path:'/SignUp',
      name:'SignUp',
      component: SignUp,
    },
    {
      path:'/AuthenticationError',
      name:'AuthenticationError',
      component: AuthenticationError,
    },

  ]
})


const firebaseConfig = require('./firebaseConfig.json');

firebase.initializeApp(firebaseConfig)



router.beforeEach((to,from,next)=>{
  let vueInstance = this
  const requiresAuth = to.matched.some(record=>record.meta.requiresAuth);
  const admin = to.matched.some(record=>record.meta.admin);

  if(firebase.auth().currentUser==null && (admin || requiresAuth)){
    next('Login')
  } 
  else if(firebase.auth().currentUser!=null) {  
  const currentUser = firebase.auth().currentUser.getIdTokenResult()
  .then((idTokenResult)=>{
    console.log("In here")
    console.log("token admin",idTokenResult.claims.admin)
    console.log("token checker",idTokenResult.claims.checker)
    console.log('admin path',admin)
    console.log(idTokenResult.claims.admin==true && admin)
    if (idTokenResult.claims.admin==true && admin) {
      //vueInstance.signInStatus = "Logout";
        next({
          path:to
        })
   } 
   else if(idTokenResult.claims.admin!=true && admin ){
    next('AuthenticationError')
   }
   else if(idTokenResult.claims.checker==true && requiresAuth){
     console.log("in go to checker")
    next({
      path:to
    })
   }
   else if(idTokenResult.claims.checker!=true && requiresAuth){
     next('AuthenticationError')
    }
   else {
     console.log("Here in the else")
     next()
   }
  });
}
else{
  next()
}
 });


firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
  });