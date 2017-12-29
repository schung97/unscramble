//note to self: only user, pass in string values
const User = (function createUserClass() {
  const all = [];

  return class User {

    constructor(user) {
      this.user = user;
      all.push(this);
    }

    static all() {
      return [...all];
    }
    static getAllUsers() {
      return Adapter.getUsers()
        .then(response => response.forEach(function(user) {
          new User(user);
        }));
    }


    // static findUser(element) {
    //   Adapter.getUsers().then(arr => arr.find(function(user) {
    //     return user.firstname === first && user.lastname === last;
    //   }));


    static findOrCreateUser(event) { //the finding part not implemented
      const username = document.createElement('div');
      const body = event.target.parentElement.parentElement;
      let first = event.target.firstname.value;
      let last = event.target.lastname.value;

      Adapter.getUsers()
        .then(arr => arr.find(user => user.firstname === first && user.lastname === last ))
        .then(function(user) {
          if ( user === undefined ) {
            Adapter.createUser(firstname, lastname);
          }
        });
      
      login.style.display = 'none';
      username.setAttribute('id', 'username');
      username.innerHTML = `Hey ${first} ${last}, Wanna Play?`;
      body.insertBefore(username, document.getElementsByClassName('timer')[0]);
    }

    static login() {
      const login = document.getElementById('login');
      const timer = document.getElementsByClassName('timer')[0];
      const container = document.getElementById('container');

      container.style.display = 'none';
      timer.style.display = 'none';

      login.addEventListener('submit', function(event) {
        event.preventDefault();
        User.findOrCreateUser(event);
        timer.style.display = 'initial';

      });
    }
  }

})();
