//note to self: only user, pass in string values
const User = (function createUserClass() {
  const all = [];

  return class User {

    constructor(firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
      all.push(this)
    }

    static all() {
      return [...all];
    }

    static findOrCreateUser(event) { //the finding part not implemented
      const username = document.createElement('div');
      const body = event.target.parentElement.parentElement;
      const firstname = event.target.firstname.value;
      const lastname = event.target.lastname.value;
      // if (response.ok) {
      //
      // } else {
      //   // Adapter.createUser(firstname, lastname);
      // }

      login.style.display = 'none';
      username.setAttribute('id', 'username');
      username.innerHTML = `Hey ${firstname} ${lastname}, Wanna Play?`;
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
