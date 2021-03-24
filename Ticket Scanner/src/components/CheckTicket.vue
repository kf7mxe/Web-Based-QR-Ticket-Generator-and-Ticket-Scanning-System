<template>
<div class="container">
  <div id="checkTicket" class="container">
    <div class="row mt-2 mb-2">
      <div class="col-sm-12">
        <h1 class="text-center">Enter Ticket Number Or Scan QR Code</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <!-- Drop down menu to select Event when selected it calls selectThisEvent function -->
        <div class="dropdown btn-group-justified">
          <div class="text-center" role="group">
            <button class="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{selectedEvent}}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div v-for="event in events" :key="event">
                <a class="dropdown-item" v-on:click="selectThisEvent(event)">{{event.name}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-sm-12 text-center">
        <qrcode-capture class="btn-primary justified" v-if="noStreamApiSupport" @decode="onDecode" />
        <qrcode-stream :camera="camera" v-if="noStreamApiSupport==false" @decode="onDecode" @init="onInit">
          <div v-if="validationSuccess" class="validation-success">
            <h2>Checked</h2>
          </div>
          <div v-if="pleaseChooseEvent" class="validation-failure">
            <h2>Please Choose Event</h2>
          </div>
          <div class="row">
            <div v-if="validationFailure" class="validation-failure">
              <h2>Not found</h2>
            </div>
          </div>

          <div v-if="validationPending" class="validation-pending">
            Long validation in progress...
          </div>
        </qrcode-stream>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12">
        <div v-if="error==true" class="alert alert-danger">
          <p>{{errorMes}}</p>
        </div>
      </div>
    </div>
    <form id="form" onsubmit="return false;">
      <!-- input form to recieve code -->
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <input type="text" onsubmit="return false;" @input="found='test'" id="ticketFirstName" v-model="searchId"
              class="form-control" placeholder="Enter Ticket number">
          </div>
        </div>
      </div>
      <!-- Using vue.js directives to show an alert if the variable fond is equal to true. It is binded so when it changes it changes if the alert is shown and which allert -->
      <div class="row">
        <div class="col-sm-12">
          <div v-if="found==true" class="alert alert-success">
            <p>Approved</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div v-if="found==false" class="alert alert-danger">
            <p>Not found</p>
            <p>{{errorMes}}</p>
          </div>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col-sm-12">
        <button class="btn btn-info" v-on:click="checkId"> Check Ticket</button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12">
        <!-- Input that when you enter text it calles a function everytime the text changes and passes in the updated value -->
        <div class="form-group">
          <!-- <label for="searchTicketLabel">Search Ticket</label> -->
          <input type="text" :value="searchString" @input="searchString = $event.target.value" id=""
            class="form-control" placeholder="Search Tickets">
        </div>
      </div>
    </div>
    <!-- Table that shows the tickets of the selected events
    depending on the state of the ticket it will show weather it has been checked or not using Vue.directives v-if -->
    <div class="row">
      <div class="col-sm-12 mt-2"> 

        <div class="panel-body table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Checked</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Amount</th>
                <th>Amount Checked</th>
                <th>Email</th>
                <th>Submitted Time</th>
                <th>Timestamp</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>

              <tr v-for="ticket in tickets" :key="ticket">
                <td data-label="Checked" v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN"><i class="fa fa-check fa-2x" aria-hidden="false"></i></td>
                <td v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN">{{ticket.firstName}}</td>
                <td v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN">{{ticket.lastName}}</td>
                <td v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN">{{ticket.amount}}</td>
                <td v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN">{{ticket.amountChecked}}</td>
                <td v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN">{{ticket.email}}</td>
                <td v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN">{{ticket.timeStamp.toDate()}}</td>
                <td v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN">{{ticket.submittedTime.toDate()}}</td>
                <td v-if="ticket.amount==ticket.amountChecked" bgcolor="LIGHTGREEN">{{ticket.ticketId}}</td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow"><span v-on:click="onTapCheck(ticket)"
                    ><i class="fa fa-remove fa-2x"></i>
</span></td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow">{{ticket.firstName}}</td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow">{{ticket.lastName}}</td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow">{{ticket.amount}}</td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow">{{ticket.amountChecked}}</td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow">{{ticket.email}}</td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow">{{ticket.timeStamp.toDate()}}</td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow">{{ticket.submittedTime.toDate()}}</td>
                <td v-if="ticket.amount>ticket.amountChecked && ticket.amountChecked!=0" bgcolor="yellow">{{ticket.ticketId}}</td>
                
                <td v-if="ticket.amountChecked==0"><span v-on:click="onTapCheck(ticket)"><i class="fa fa-remove fa-2x"></i></span></td>
                <td v-if="ticket.amountChecked==0">{{ticket.firstName}}</td>
                <td v-if="ticket.amountChecked==0">{{ticket.lastName}}</td>
                <td v-if="ticket.amountChecked==0">{{ticket.amount}}</td>
                <td v-if="ticket.amountChecked==0">{{ticket.amountChecked}}</td>
                <td v-if="ticket.amountChecked==0">{{ticket.email}}</td>
                <td v-if="ticket.amountChecked==0">{{ticket.timeStamp.toDate()}}</td>
                <td v-if="ticket.amountChecked==0">{{ticket.submittedTime.toDate()}}</td>
                <td v-if="ticket.amountChecked==0">{{ticket.ticketId}}</td>

                <!--<td><span class="glyphicon glyphicon-trash" aria-hidden="true" v-on:click="removeLesson(checker)"></span></td>-->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';
import {
  QrcodeStream,
  //QrcodeDropZone,
  QrcodeCapture
} from 'vue-qrcode-reader'

export default {
  name: 'Check Ticket',
  // firebase binded variables that contain the data in the ref table referneces
  components: {
     QrcodeCapture,
     //QrcodeDropZone,
     QrcodeStream
  },
  data() {
    return {
//data:{
      color: '',
      found: 'nothing', // store wether ticket has been found. State of wether it is found or not
      searchString: '', // stores the string you typed in an are searching the tickets for
      searchId: '', // stores the ID you typed in an are searching the tickets for
      selectedEvent: "Select Event", // Stores the selected Event you select from the drop down
      tickets: [], // array to store the tickets
      allTickets:[],
      events:[],
      error: false,
      errorMes: '',
      result: '',
      noStreamApiSupport: false,
      isValid: undefined,
      pleaseChooseEvent:true,
      camera: 'auto',
      testUpload: '',
      db:'',
    }
  },
  props: {
    msg: String
  },
  // built in Vue function that runs the statements when tghe page is first opened
  created() {
      let vueInstance = this;
      this.db = firebase.firestore();
      this.db.collection('events')
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc)=>{
            vueInstance.events.push(doc.data())
          })
          console.log(vueInstance.events)
          //vueInstance.tickets = events;
        });
    
  },
  //Vue object to store methods in
  mounted(){

  },

  computed: {
    validationPending() {
      return this.isValid === undefined &&
        this.camera === 'off'
    },

    validationSuccess() {
      return this.isValid === true
    },

    validationFailure() {
      return this.isValid === false
    }
  },
  watch: {
    searchString:function(){
       this.errorMesTest
    let temp
    this.tickets = [];
    for (var i=0; i< this.allTickets.length; i++)
    {
      console.log("in search")

      if((this.allTickets[i].firstName.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1) || (this.allTickets[i].lastName.toLowerCase().indexOf(this.searchString.toLowerCase())> -1) || (this.allTickets[i].email.toLowerCase().indexOf(this.searchString.toLowerCase())> -1))
      {
        //this.tickets.push(this.allTickets[i])
        this.$set(this.tickets,this.tickets.length,this.allTickets[i])

      }
    }
    },
    deep:true
  },
  methods: {
    //checks id of the tickets in the Firebase Database if they are valid
    checkId: function(){
      this.found=false
        //go through the tickets checking for same id
      for(var i=0;i< this.tickets.length;i++)
      {
        if(this.tickets[i].ticketId===this.searchId)
        {
          this.found = true
          this.incrementTicket(this.selectedEvent,this.searchId)
        }
      }
    },
  
  // takes in the event that is selected from the dropdown and gets the name and then does a firebase query for that name
  // and adds the results to the TicketVar array
    selectThisEvent:function(event)
    {
      this.tickets = []
      this.allTickets = []
      this.selectedEvent=event.name
      this.pleaseChooseEvent = false
      console.log("test event",event)
      let vueInstance = this
      this.db.collection(event.name)
        .onSnapshot((snapshot) => {
          vueInstance.tickets = []
          vueInstance.allTickets = []
          snapshot.forEach((doc)=>{
              if (!doc.data().empty) {
                vueInstance.tickets.push(doc.data())
                vueInstance.allTickets.push(doc.data())
              }
          })
        });
  },
  // Upodates the ticket when it is taped on in the table
  //it takes the ticket that was tapped on and uses a query to find the matched ID and then update the amount checked and the wether it has been checked
  onTapCheck: function(ticket){
    this.incrementTicket(this.selectedEvent,ticket.ticketId)
  },

  async onDecode (result) {
      if(this.noStreamApiSupport==true)
      {
        console.log("in the decode"+result)
        this.searchId = result;
        this.checkId();
      }
      else{
        this.turnCameraOff()
        this.result = result
        await this.timeout(1000)
        this.searchId = result;
        this.checkId();
        console.log("after check id test")
        this.isValid = this.found
        console.log("after check id test set")
        console.log("test found",this.found)
        await this.timeout(2000)
        this.turnCameraOn()

      }
      },
      logErrors (promise) {
        promise.catch(console.error)
      },

      async onInit (promise) {

    try {
      await promise.then(this.resetValidationState())
    } catch (error) {
      this.error=true
      this.noStreamApiSupport=true
      this.errorMes = "Unable to get camera stream. Please upload file"
      console.log(error.name)
      if (error.name === 'StreamApiNotSupportedError') {
        console.log(error.name)
        this.errorMes="For IOS devices i.e. Iphones Ipads or other computers without Webcam use choose file Option and choose photo of qr code"
        this.noStreamApiSupport = true
      }
       else if (error.name === 'NotFoundError') {
          this.errorMes = "No camera on this device Please Use the Choose file"
          this.noStreamApiSupport = true
        } else if (error.name === 'NotSupportedError') {
          this.errorMes = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.errorMes = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.errorMes = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.errorMes = "ERROR: Stream API is not supported in this browser please use file upload"
          this.noStreamApiSupport = true
        }
    }
  },
  turnCameraOn () {
        this.camera = 'auto'
      },

      turnCameraOff () {
        this.camera = 'off'
      },
  resetValidationState () {
        this.isValid = undefined
      },
      timeout (ms) {
        return new Promise(resolve => {
          window.setTimeout(resolve, ms)
        });
      },


  incrementTicket:function(collection,ticketId){
    console.log("in incrementTicket",ticketId)
          const increment = firebase.firestore.FieldValue.increment(1);
          let vueInstance = this
          this.db.collection(collection).where("ticketId", "==", ticketId).get()
          .then((querySnapshot) =>{
              querySnapshot.forEach((doc)=>{
                console.log(doc.data().ticketId)
                console.log(doc.data().ticketId == ticketId)
                  if(doc.data().ticketId == ticketId){
                    console.log("in if statement")
                      const dbRef = vueInstance.db.collection(collection).doc(doc.id)
                      dbRef.update({amountChecked:increment})
                      .then(()=>{
                        console.log("succesfully Incremented ticket")
                      })
                      .catch((error)=>{
                        console.log(error)
                      })
                  }
              })
            });
      }
  }
}
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #0F2439;
}

.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.validation-success {
  color: green;
}

.validation-failure {
  color: red;
}



@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px) {
table thead {
    display: none;
  }

   table td {
    display: flex;
  }

  /* td:nth-of-type(1):before {
    content: "Checked";
  } */

td:nth-of-type(1){
  flex-flow: column nowrap;
  text-align: center;
}

    td:nth-of-type(1)::before {
    content: "Checked";
  font-weight: bold;
  }
td:nth-of-type(2){
  flex-flow: column nowrap;
  text-align: center;
}
  td:nth-of-type(2)::before {
    content: "First Name: ";
    font-weight: bold;

  }
td:nth-of-type(3){
  flex-flow: column nowrap;
  text-align: center;
}
  td:nth-of-type(3)::before {
    content: "Last Name: ";
    font-weight: bold;
  }
td:nth-of-type(4){
  flex-flow: column nowrap;
  text-align: center;
}

  td:nth-of-type(4)::before {
    content: "Amount Name: ";
    font-weight: bold;
  }
td:nth-of-type(5){
  flex-flow: column nowrap;
  text-align: center;
}
  td:nth-of-type(5)::before {
    content: "Amount Checked: ";
    font-weight: bold;
  }
td:nth-of-type(6){
  flex-flow: column nowrap;
  text-align: center;
}
  td:nth-of-type(6)::before {
    content: "Email: ";
    font-weight: bold;

  }
td:nth-of-type(7){
  flex-flow: column nowrap;
  text-align: center;
}
  td:nth-of-type(7)::before {
    content: "Submitted time: ";
    font-weight: bold;

  }
td:nth-of-type(8){
  flex-flow: column nowrap;
  text-align: center;
}
  td:nth-of-type(8)::before {
    content: "Time Stamp: ";
    font-weight: bold;

  }
td:nth-of-type(9){
  flex-flow: column nowrap;
  text-align: center;
}
  td:nth-of-type(9)::before {
    content: "ID: ";
    font-weight: bold;

  }
}
</style>