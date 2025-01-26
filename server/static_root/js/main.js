Vue.mixin({
  delimiters: ["[[", "]]"]
});
new Vue({
  vuetify: new Vuetify,
  el: "#app",
  data: () => ({
   
    snackbar: false,
    
    alert:false,
    dialog:false,
    alertmessage: "",
    type: 'success',
    overlay: false,
    submitted: false,
    selectedItem: 1,
    username:'',
    password:'',
    sessionsarray:[],
    title:'',
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    exe:[],
    multiLine:true,
    sessionsarrayone:[{
                      "id": 1,
                        "title": "exe",
                        "attendance": 50,
                        "date": "exe",
                        "attendants": [
                            {
                                "id": 1,
                                "present": false,
                                "intern_name": {
                                    "id": 1,
                                    "name": "exe",
                                    "tribe": {
                                        "id": 1,
                                        "name": "exe",
                                        "lead": 1
                                    },
                                    "group": {
                                        "id": 1,
                                        "name": "exe"
                                    }
                                }
                            },],}],

    loggedin:false,

    //pages
    choose:true,
    admin:false,
    coach:false,
    sessiondetail:false,
    sessions:false,
    createnewsessionpage:false,
    //endpage

    id:0,

    searchfield:'',
    sessionattendants:[],
    progress:0,
    absent:0,

    alert2:false,
    alertmessage2:'',
    searchfieldsession:'',
    interns:[],
    cardwidth:400,
    selectsection:true,
    internsection:false,
    createsessiontext:'Create a new session.',
    sessioninterncount:0,
    coaches:[],
    mainsessions:[],
    courses:[],
    groups:[],
    groupselected:'',
    formerr:false,
     rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 40 || 'Max 40 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },


  }),
  methods: {
    markimportant(s){
      if(s.important){
        s.important = false;
      }else{
        s.important = true;
      }
    },
          signin(){
            this.alert = true
            this.submitted = true
            this.alertmessage =  'processing...'
            this.type =  'info'
            axios({

                method : "POST",
                url:"/user-login/",
                headers: {'X-CSRFTOKEN': getCookie("csrftoken"), 'Content-Type': 'application/json'},
                data : {
                
                "username":this.username,
                "password":this.password,

                },
              }).then(response => {
                this.alert = true
                this.username = ''
                this.password = ''
               
                this.alertmessage =  'Welcome back!'
                this.type =  'success'

                this.submitted = false
                this.loggedin = true
                this.sessions = true
              }).catch(err => {
                    this.alertmessage =  'Invalid credential. Note : Fields may be case sensetive. If Error persist please refresh page.'
                    this.type =  'error'
                    this.submitted = false
                    this.alert = true
              });

          },

          //pages

          groupname(e){
            console.log(e)
            this.groupselected = e
          },
          // newsession(){
          //   this.sessions=false
          //   this.createnewsessionpage=true
          // },
          sessionsdisplay(){
                this.getsession()
                this.sessions = true;
                this.sessiondetail = false;
                this.createnewsessionpage=false;

              },
          createsession(){
            this.submitted = true
            if(this.date === '' || this.title === '' || this.groupselected === ''){
              this.formerr = true
              this.submitted = false
              return
            }
            axios({

                method : "POST",
                url:"/createsession/",
                headers: {'X-CSRFTOKEN': getCookie("csrftoken"), 'Content-Type': 'application/json'},
                data : {
                
                "title":this.title,
                "date":this.date,
                "group":this.groupselected,

                },
              }).then(response => {
                this.cardwidth = 1000;
                this.selectsection = false;
                this.internsection = true;
                this.createsessiontext = 'Select particapents.'
                this.alert2 = true
                this.title = ''
                this.date = ''
               
                this.alertmessage2 =  'Session created. Please select all particapents.'
                this.type =  'success'

                this.submitted = false
                this.id = response.data['id']
                this.getsession()
              }).catch(err => {
                    this.alertmessage2 =  'Error occured. If Error persist please refresh page.'
                    this.type =  'error'
                    this.submitted = false
                    this.alert2 = true
                    console.log(err)
              });

          },
            addperson(i){
            if(i.add){
                i.add = false;
                this.sessioninterncount = this.sessioninterncount - 1
              }else{
                i.add = true;
                this.sessioninterncount = this.sessioninterncount + 1
              }
            axios({

                method : "POST",
                url:"/addsessionintern/"+ this.id +  "/",
                headers: {'X-CSRFTOKEN': getCookie("csrftoken"), 'Content-Type': 'application/json'},
                data : {
                
                "id":i.id,

                },
              }).then(response => {
                this.getsession()
              }).catch(err => {
                    this.alertmessage2 =  'Error occured. If Error persist please refresh page.'
                    this.type =  'error'
                    this.alert2 = true
                    console.log(err)
              });

          },
          closed(){
            this.createsessiontext ='Create a new session.';
            this.dialog = false;
            this.cardwidth = 400;
            this.internsection = false;
            this.selectsection = true;
            this.alert2 = false;
            this.getinterns();
          },
         
         logout() {
              this.alert = true
              this.alertmessage =  'Logging out...'
              this.type =  'success'
              this.loading = true
                axios
                  .get('/logoutaccount/')
                  .then(response => {
                    this.sessions = false
                    this.sessiondetail = false
                    this.loggedin = false
                    this.alertmessage =  'See you soon :)'
                    this.type =  'success'
                  })
                  .catch(err => console.log(err));
              },
            
            deletesession(s){
              this.alert = true
              this.alertmessage = 'Deleting session...'
              this.type = 'info'
              axios
                .get('/deletesession/' + s.id + '/')
                .then(response => { 
                  this.alert = true
                  this.alertmessage = 'Session deleted!'
                  this.type = 'success'
                  this.getsession()})
                .catch(err => {
                  this.alert = true
                  this.alertmessage = 'Error occured. If Error persist please refresh page.'
                  this.type = 'error'
                  console.log(err)
                  });
            },

            getsession(){
                axios
                  .get('/api/sessions/')
                  .then(response => {
                    this.response = response.data;
                    this.sessionsarray = this.response
                    
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },

             getgroups(){
                axios
                  .get('/api/groups/')
                  .then(response => {
                    this.response = response.data;
                    this.groups = this.response
                    
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },
            getinterns(){
                axios
                  .get('/api/interns/')
                  .then(response => {
                    this.response = response.data;
                    this.interns = this.response
                    
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },
            locksession(s){
              if(s.lock){
                s.lock = false;
                console.log('unlocked')
              }else{
                s.lock = true;
                console.log('locked')
              };
              axios
                .get('/lock/' + s.id + '/')
                .then(response => { })
                .catch(err => {
                  console.log(err)
                  });
            },
             getmainsessions(){
                axios
                  .get('/api/allmainsessions/')
                  .then(response => {
                    this.response = response.data;
                    this.mainsessions = this.response
                    
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },
             getcoaches(){
                axios
                  .get('/api/allcoaches/')
                  .then(response => {
                    this.response = response.data;
                    this.coaches = this.response
                    
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },
             getcourses(){
                axios
                  .get('/api/allcourses/')
                  .then(response => {
                    this.response = response.data;
                    this.courses = this.response
                    
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },

             getsessionOne(s){
              this.id = s.id
              this.overlay = true
                axios
                  .get('/api/sessionsOne/' + s.id + '/')
                  .then(response => {
                    this.response = response.data;
                    this.sessionsarrayone = this.response
                    this.sessionattendants = this.sessionsarrayone.attendants
                    this.sessions = false;
                    this.sessiondetail = true;

                    //progress
                    var num = this.sessionattendants.filter((a)=>{
                      return a.present === true
                    });
                    this.absent = num.length
                    this.progress = parseInt(this.absent / this.sessionattendants.length * 100)
                    console.log(this.progress)
                    this.overlay = false

                  })
                  .catch(err => {
                    console.log(err)
                    this.overlay = false
  
                    });
            },
            calculate(){
                axios
                  .get('/calculate/')
                  .then(response => {
                   
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },

            calculateOne(){
                axios
                  .get('/calculateOne/'+ this.id + '/')
                  .then(response => {
                   
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },

            check(a){
                if(a.present){
                  a.present = false;
                  this.absent = this.absent - 1
                  var c = this.sessionattendants.length
                  this.progress = parseInt((this.absent / c) * 100)
                }else{
                  a.present = true;
                  this.absent = this.absent + 1
                  var c = this.sessionattendants.length
                  this.progress = parseInt((this.absent  / c) * 100)
                };
                axios
                  .get('/api/check/' + a.id + '/')
                  .then(response => {
                   this.calculateOne()
                   
                  })
                  .catch(err => {
                    console.log(err)
  
                    });
            },
            accountauthenticate() {
                axios
                  .get('/userauthentication/')
                  .then(response => {
                    this.loggedin = true
                    this.sessions = true
                    this.sessiondetail = false
                    this.alertmessage =  'Logged out.'
                    this.type =  'success'
                  })
                  .catch(err => {
                    this.loggedin = false
                    this.sessions = false
                    this.sessiondetail = false
                    });
              },
              
  },

   computed:{


      filteredAttendants: function(){
       if (this.sessiondetail === true){
          return this.sessionattendants.filter((a) => {
            return a.intern_name.name.toLowerCase().match(this.searchfield.toLowerCase());
          });}

      },

      filteredSessions: function(){
      
          return this.sessionsarray.filter((s) => {
            console.log(s)
            return s.title.toLowerCase().match(this.searchfieldsession.toLowerCase());
          });}
    },
    mounted:function(){
      window.setInterval(() => {
          jQuery(document).ready(function() {
          jQuery("time.timeago").timeago();
          });
        }, 1000)
    
  },
  created(){
    jQuery(document).ready(function() {
      jQuery("time.timeago").timeago();
    });
    this.accountauthenticate();
    // this.getmainsessions();
    // this.getcourses();
    // this.getcoaches();
    this.getgroups();
    this.calculate();
    this.getsession();
    this.getinterns();
    


  }
});



  $(window).on("load",function(){
     $(".loader-wrapper").fadeOut("slow");
});