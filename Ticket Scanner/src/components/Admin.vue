<template>
  <div id="app" class="container">
    <!-- -->
    <div class="row">
      <div class="col-sm-12">
        <h1>Admin</h1>
      </div>
    </div>
    <div id="error-message" class="alert alert-danger mt-3 d-none d-lg-none" role="alert">
      <h2></h2>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <h2 class="panel-title">Approved Checkers</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 table-responsive">
        <!--Table to hold the Available Checkers -->
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="checker in checkers" :key="checker">
              <td class="approvedCheckersItem">{{checker.name}}</td>
              <td class="approvedCheckersItem">{{checker.email}}</td>
              <td class="approvedCheckersItem">{{checker.admin}}</td>
              <td class="approvedCheckersItem"><span v-on:click="openRemoveModal(checker,'checkers')" class=""><i
                    class="fa fa-remove"></i></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add checker to  -->
    <div class="row">
      <div class="col-sm-12">
        <button data-toggle="modal" data-target="#addCheckerModal" class="btn btn-info" type=""> Add Checker</button>
        <button data-toggle="modal" data-target="#addAdminModal" class="btn btn-info ml-2" type=""> Add Admin</button>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h2 class="panel-title">Events</h2>
        <!-- button to referesh the events -->
        <span v-on:click="getAllEventsInformation()" class="glyphicon glyphicon-refresh"></span>
      </div>
      <div class="panel-body table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <!-- Cycle through events -->
            <tr v-for="event in events" :key="event">
              <td class="eventItem">{{event.name}}</td>
              <td class="eventItem"><span v-on:click="openRemoveModal(event,'events')"><i
                    class="fa fa-remove"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button data-toggle="modal" data-target="#addEventModal" class="btn btn-info" type="">Add Event</button>
    </div>
    <h2>Event Details</h2>
    <!-- Create a new table for each of the event filled with the tickets for each event -->
    <div v-for="event in eventsDetails" :key="event" class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{event.name}}</h3>
      </div>
      <div v-if="event.details.length==0">
        <div id="" class="alert alert-success mt-3" role="alert">
          <h2>No Tickets in this Event</h2>
        </div>
      </div>
      <div class="panel-body table-responsive" v-if="event.details.length!=0">
        <table class="table table-striped">
          <thead>

            <tr>

              <th>Checked</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Submitted Time</th>
              <th>Time Stamp</th>
              <th>ID</th>
              <th>Event</th>
              <th>PDF</th>
              <th>remove</th>
            </tr>

          </thead>
          <tbody>

            <tr v-for="eventDetail in event.details.slice().reverse()" :key="eventDetail">
              <td class="eventTicketInfo">{{eventDetail.checked}}</td>
              <td class="eventTicketInfo">{{eventDetail.firstName}}</td>
              <td class="eventTicketInfo">{{eventDetail.lastName}}</td>
              <td class="eventTicketInfo">{{eventDetail.email}}</td>
              <td class="eventTicketInfo">{{eventDetail.amount}}</td>
              <td class="eventTicketInfo">{{eventDetail.submittedTime}}</td>
              <td class="eventTicketInfo">{{eventDetail.timeStamp}}</td>
              <td class="eventTicketInfo">{{eventDetail.ticketId}}</td>
              <td class="eventTicketInfo">{{eventDetail.event}}</td>
              <td class="eventTicketInfo"><a :href="eventDetail.PDFLocation">View Pdf</a></td>
              <td class="eventTicketInfo"> <span v-on:click="openRemoveModal(eventDetail,'eventDetails')"><i
                    class="fa fa-remove"></i></span></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="addCheckerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCheckerModal">Add Checker</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="usr">Name:</label>
              <input type="text" v-model="newCheckerName" placeholder="Enter Name" class="form-control" id="usr">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Enter Checkers Email</label>
              <input type="email" v-model="newCheckerEmail" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Enter email">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="addChecker()">Add Checker</button>
            <div class="row">
              <div id="success-make-checker-message" class="alert alert-success mt-3 d-none d-lg-none" role="alert">
                <h2>Request successfully Sent</h2>
              </div>
              <div id="error-make-checker-message" class="alert alert-danger mt-3 d-none d-lg-none" role="alert">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="addAdminModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCheckerModal">Add Admin</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="usr">Name:</label>
              <input type="text" v-model="newAdminName" placeholder="Enter Name" class="form-control" id="usr">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Enter Admin Email</label>
              <input type="email" v-model="newAdminEmail" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Enter email">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="addAdmin()">Add Admin</button>
            <div class="row">
              <div id="success-make-admin-message" class="alert alert-success mt-3 d-none d-lg-none" role="alert">
                <h2>Request successfully Sent</h2>
              </div>
              <div id="error-make-admin-message" class="alert alert-danger mt-3 d-none d-lg-none" role="alert">
                <h2></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="modal fade" id="addEventModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCheckerModal">Add Event</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="usr">Event Name:</label>
              <input type="text" v-model="newEventName" placeholder="Enter Event Name" class="form-control" id="usr">
            </div>

            <div id="" class="alert alert-info mt-3" role="alert">
              <h5>This only adds a Collection to Firstore and event name to the event collection.</h5>
              <p>You will still need to set up code to add the tickets to the collection with the exact name</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="addEvent()">Add Event</button>
            <div class="row">
              <div id="success-add-event-message" class="alert alert-success mt-3 d-none d-lg-none" role="alert">
                <h2>Event successfully Created</h2>
              </div>
              <div id="error-add-event-message" class="alert alert-danger mt-3 d-none d-lg-none" role="alert">
                <h2></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="confirmRemoveModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCheckerModal">Confirm Remove {{confirmRemoveItemName}} from
              {{confirmRemoveItemCategory}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
              v-on:click="closeConfirmModal()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <p>Are you sure you want to remove {{confirmRemoveItemName}}</p>
            </div>
            <div id="" v-if="confirmRemoveItemCategory=='events'" class="alert alert-info mt-3" role="alert">
              <h5>This is only removes Event from the Event Collection. </h5>
              <p>"{{confirmRemoveItemName}}" collection still exists on firstore and has to be removed from the console
                manually.</p>
            </div>
            <div id="" v-if="confirmRemoveItemCategory=='checkers'" class="alert alert-info mt-3" role="alert">
              <p>This removes tokens from thier account and removes their name and email address from the checkers
                collection. So that they no longer have access.</p>
              <p>"{{confirmRemoveItemName}}" account has to be removed from the firebase console. </p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" v-on:click="closeConfirmModal()">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="removeItem()">Remove
              {{confirmRemoveItemName}}</button>
            <div class="row">
              <div id="success-remove-message" class="alert alert-success mt-3 d-none" role="alert">
                <h2>{{confirmRemoveItemName}} successfully Removed</h2>
              </div>
              <div id="error-remove-message" class="alert alert-danger mt-3 d-none" role="alert">
                <h2></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="modal-backdrop" class="modal-backdrop fade d-none"></div>
  </div>
</template>
<script>
  import firebase from 'firebase'


  export default {
    name: 'Admin',
    // firebase binded variables that contain the data in the ref table referneces
    data() {
      return {
        events: [],
        eventsDetails: [], // eventsDetail binded array
        checkers: [],
        newCheckerEmail: '',
        newCheckerName: '',
        newAdminEmail: '',
        newAdminName: '',
        newEventName: '',
        confirmRemoveItemCategory: '',
        confirmRemoveItem: '',
        confirmRemoveItemName: ''
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
          vueInstance.events = []
          vueInstance.eventsDetails = []
          snapshot.forEach((doc) => {
            vueInstance.events.push(doc.data())
            vueInstance.events[vueInstance.events.length - 1].key = doc.id
            this.db.collection(doc.data().name)
              .onSnapshot((snapshot) => {
                let tempEventDetails = doc.data();
                tempEventDetails.details = [];
                //vueInstance.eventsDetails = []
                snapshot.forEach((detailDoc) => {
                  if (!detailDoc.data().empty) {
                    tempEventDetails.details.push(detailDoc.data())
                    tempEventDetails.details[tempEventDetails.details.length - 1].key = detailDoc.id
                    tempEventDetails.details[tempEventDetails.details.length - 1].event = doc.data().name
                  }
                })
                let findEventInEventDetails = -1
                for (let i = 0; i < vueInstance.eventsDetails.length; i++) {
                  if (vueInstance.eventsDetails[i].name == doc.data().name) {
                    findEventInEventDetails = i
                  }
                }
                if (findEventInEventDetails != -1) {
                  vueInstance.$set(vueInstance.eventsDetails, findEventInEventDetails, tempEventDetails)
                  //eventsDetails[findEventInEventDetails] = tempEventDetails
                } else {
                  //vueInstance.eventsDetails.push(tempEventDetails)
                  vueInstance.$set(vueInstance.eventsDetails, vueInstance.eventsDetails.length,
                    tempEventDetails)
                }
              })
          })
          //vueInstance.tickets = events;
        });


      this.db = firebase.firestore();
      this.db.collection('checkers')
        .onSnapshot((snapshot) => {
          vueInstance.checkers = []
          snapshot.forEach((doc) => {
            vueInstance.checkers.push(doc.data())
            vueInstance.checkers[vueInstance.checkers.length - 1].key = doc.id
          })
          //vueInstance.tickets = events;
        });
    },
    methods: {

      removeItem: function () {
        switch (this.confirmRemoveItemCategory) {
          case 'events':
            this.removeEvent(this.confirmRemoveItem)
            break;
          case 'checkers':
            this.removeChecker(this.confirmRemoveItem)
            break;
          case 'eventDetails':
            this.removeEventDetail(this.confirmRemoveItem)
            break;
        }
      },
      removeEvent: function (item) {
        console.log(item.key)
        this.db.collection('events').doc(item.key).delete()
          .then((result) => {
            document.querySelector('#success-remove-message').classList.remove('d-none');
          })
          .catch((error) => {
            document.querySelector('#error-remove-message').classList.remove('d-none');
            document.querySelector('#error-remove-message').innerHTML = `<h2>${error}</h2>`
          })
      },
      removeEventDetail: function (item) {
        this.db.collection(item.event).doc(item.key).delete()
          .then((result) => {
            document.querySelector('#success-remove-message').classList.remove('d-none');

          })
          .catch((error) => {
            document.querySelector('#error-remove-message').classList.remove('d-none');
            document.querySelector('#error-remove-message').innerHTML = `<h2>${error}</h2>`
          })
      },
      openRemoveModal: function (item, itemCategory) {
        if (!document.querySelector('#success-remove-message').classList.contains("d-none")) {
          document.querySelector('#success-remove-message').classList.add('d-none')
        }
        this.confirmRemoveItemCategory = itemCategory
        this.confirmRemoveItem = item
        switch (itemCategory) {
          case 'events':
            this.confirmRemoveItemName = item.name
            break;
          case 'checkers':
            this.confirmRemoveItemName = item.name
            break;
          case 'eventDetails':
            this.confirmRemoveItemName = item.firstName + " " + item.lastName
        }
        //document.querySelector(".modal-backdrop").style.display = "block"
        //console.log(document.querySelector(".modal-backdrop"))
        document.getElementById("modal-backdrop").classList.remove("d-none")
        document.getElementById("modal-backdrop").classList.add("show")
        document.getElementById("confirmRemoveModal").style.display = "block"
        document.getElementById("confirmRemoveModal").className += "show"
      },
      closeConfirmModal: function () {
        //document.querySelector(".modal-backdrop").style.display = "none"
        document.getElementById("modal-backdrop").classList.remove("show")
        document.getElementById("modal-backdrop").classList.add("d-none")
        document.getElementById("confirmRemoveModal").style.display = "none"
        document.getElementById("confirmRemoveModal").className += document.getElementById("confirmRemoveModal")
          .className.replace("show", "")
      },

      //open the signUp Function to allow admin to add users to check tickets
      addChecker: function () {
        if (!document.querySelector('#success-make-checker-message').classList.contains('d-none')) {
          document.querySelector('#success-make-checker-message').classList.add('d-none')
        }
        if (!document.querySelector('#error-make-checker-message').classList.contains('d-none')) {
          document.querySelector('#error-make-checker-message').classList.add('d-none')
        }
        var functions = firebase.functions();
        const addCheckerfunction = functions.httpsCallable('addCheckerRole');
        let vueInstance = this;
        addCheckerfunction({
            email: vueInstance.newCheckerEmail
          })
          .then(result => {
            if (result.data.errorInfo) {
              document.querySelector('#error-make-checker-message').classList.remove('d-none');
              document.querySelector('#error-make-checker-message').innerHTML =
                `<h2>Error ${result.data.errorInfo.message}</h2>`
            }

            if (result.data.message) {
              let vueInstance = this;
              if (this.newCheckerEmail != '') {
                this.db.collection('checkers').add({
                    name: vueInstance.newCheckerName,
                    email: vueInstance.newCheckerEmail,
                    admin: false
                  })
                  .then(() => {

                  })
                  .catch(() => {

                  })
              }
              document.querySelector('#success-make-checker-message').classList.remove('d-none');
              document.querySelector('#success-make-checker-message').innerHTML =
                `<h2>${result.data.message}</h2>`
            }
          }).catch(error => {
            document.querySelector('#error-make-checker-message').classList.remove('d-none');
            document.querySelector('#error-make-checker-message').classList.remove('d-lg-none');
            document.querySelector('#error-make-checker-message').innerHTML = `<h2>Error ${error.message}</h2>`
          });
      },

      addAdmin: function () {
        if (!document.querySelector('#success-make-admin-message').classList.contains('d-none')) {
          document.querySelector('#success-make-admin-message').classList.add('d-none')
        }
        if (!document.querySelector('#error-make-admin-message').classList.contains('d-none')) {
          document.querySelector('#error-make-admin-message').classList.add('d-none')
        }
        var functions = firebase.functions();
        let vueInstance = this
        const adminRolefunction = functions.httpsCallable('addAdminRole');
        adminRolefunction({
            email: vueInstance.newAdminEmail
          })
          .then(result => {
            if (result.data.errorInfo) {
              document.querySelector('#error-make-admin-message').classList.remove('d-none');
              document.querySelector('#error-make-admin-message').classList.remove('d-lg-none');
              document.querySelector('#error-make-admin-message').innerHTML =
                `<h2>${result.data.errorInfo.message}</h2>`
            }
            if (result.data.message) {
              let vueInstance = this;
              if (this.newAdminEmail != '') {
                this.db.collection('checkers').add({
                    name: vueInstance.newAdminName,
                    email: vueInstance.newAdminEmail,
                    admin: true
                  })
                  .then(() => {
                    document.querySelector('#success-make-admin-message').classList.remove('d-none');
                    document.querySelector('#success-make-admin-message').classList.remove('d-lg-none');
                  })
                  .catch((error) => {
                    document.querySelector('#error-make-admin-message').classList.remove('d-none');
                    document.querySelector('#error-make-admin-message').classList.remove('d-lg-none');
                    document.querySelector('#error-make-admin-message').innerHTML =
                      `<h2>Error ${error.message}</h2>`
                  })
              }
              document.querySelector('#success-make-admin-message').classList.remove('d-none');
              document.querySelector('#success-make-admin-message').classList.remove('d-lg-none');
            }
          }).catch(error => {
            document.querySelector('#error-make-admin-message').classList.remove('d-none');
            document.querySelector('#error-make-admin-message').classList.remove('d-lg-none');
            document.querySelector('#error-make-admin-message').innerHTML = `<h2>Error ${error.message}</h2>`
          });
      },


      // //Remove checker. Deletes user from the authenticated users database
      removeChecker: function (checker) {
        console.log(checker)
        var functions = firebase.functions();
        const removeCheckerfunction = functions.httpsCallable('removeCheckerRole');
        let vueInstance = this;
        removeCheckerfunction({
            email: checker.email
          })
          .then(result => {
            if (result.data.errorInfo) {
              document.querySelector('#error-remove-message').classList.remove('d-none');
              document.querySelector('#error-remove-message').classList.remove('d-lg-none');
              document.querySelector('#error-remove-message').innerHTML =
                `<h2>Error ${result.data.errorInfo.message}</h2>`
            }
            if (result.data.message) {
              console.log("in here to delete")
              let vueInstance = this;
              console.log(checker.key)
              this.db.collection('checkers').doc(checker.key).delete()
                .then(() => {
                  document.querySelector('#success-remove-message').classList.remove('d-none');
                  document.querySelector('#success-remove-message').classList.remove('d-lg-none');
                  document.querySelector('#success-remove-message').innerHTML = `<h2>${result.data.message}</h2>`
                })
                .catch(() => {
                  document.querySelector('#error-remove-message').classList.remove('d-none');
                  document.querySelector('#error-remove-message').classList.remove('d-lg-none');
                  document.querySelector('#error-remove-message').innerHTML =
                    `<h2>Error ${result.data.error}</h2>`
                })

            }
          }).catch(error => {
            document.querySelector('#error-remove-message').classList.remove('d-none');
            document.querySelector('#error-remove-message').classList.remove('d-lg-none');
            document.querySelector('#error-remove-message').innerHTML = `<h2>Error ${error.message}</h2>`
          });
      },

      addEvent: function () {
        this.db.collection(this.newEventName).add({
          empty: true,
        }).then(result => {
          document.querySelector('#success-add-event-message').classList.remove('d-none');
          document.querySelector('#success-add-event-message').classList.remove('d-lg-none');
        }).catch(error => {
          console.log(error)
        })
        this.db.collection("events").add({
          name: this.newEventName
        }).then(result => {

        }).catch(error => {

        })
      },
      //Removes event from event databse table events
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
    color: #42b983;
  }

  @media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {

    table thead {
      display: none;
    }

    table td {
      display: flex;
    }

    .approvedCheckersItem:nth-of-type(1) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .approvedCheckersItem:nth-of-type(1)::before {
      content: "Name";
      font-weight: bold;
    }

    .approvedCheckersItem:nth-of-type(2) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .approvedCheckersItem:nth-of-type(2)::before {
      content: "Email";
      font-weight: bold;
    }

    .approvedCheckersItem:nth-of-type(3) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .approvedCheckersItem:nth-of-type(3)::before {
      content: "Admin";
      font-weight: bold;
    }

    .approvedCheckersItem:nth-of-type(4) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .approvedCheckersItem:nth-of-type(4)::before {
      content: "Remove";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(1) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(1)::before {
      content: "Checked";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(2) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(2)::before {
      content: "First Name";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(3) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(3)::before {
      content: "Last Name";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(4) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(4)::before {
      content: "Email";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(5) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(5)::before {
      content: "Amount";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(6) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(6)::before {
      content: "Submitted Time";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(7) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(7)::before {
      content: "Time Stamp";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(8) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(8)::before {
      content: "ID";
      font-weight: bold;
    }

    .eventTicketInfo:nth-of-type(9) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(9)::before {
      content: "Event";
    }

    .eventTicketInfo:nth-of-type(10) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(10)::before {
      content: "PDF";
    }

    .eventTicketInfo:nth-of-type(11) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventTicketInfo:nth-of-type(11)::before {
      content: "Remove";
      font-weight: bold;

    }

    .eventItem:nth-of-type(1) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventItem:nth-of-type(1)::before {
      content: "Name";
      font-weight: bold;

    }

    .eventItem:nth-of-type(2) {
      flex-flow: column nowrap;
      text-align: center;
    }

    .eventItem:nth-of-type(2)::before {
      content: "Remove";
      font-weight: bold;
    }
  }
</style>