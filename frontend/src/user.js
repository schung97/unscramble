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


    static findOrCreateUser(event) {
      const username = document.getElementById('username');
      const name = document.createElement('p');


      let first = event.target.firstname.value;
      let last = event.target.lastname.value;

      Adapter.getUsers()
        .then(arr => arr.find(user => user.firstname === first && user.lastname === last ))
        .then(function(user) {
          if (user !== undefined) {
            name.setAttribute('id', `${user.id}`);
          } else {
            Adapter.createUser(first, last);
            let id = Adapter.getUsers().then(obj => obj[obj.length - 1].id);
            name.setAttribute('id', `${id}`);
          }
        })

      login.style.display = 'none';
      name.innerText = `Hey ${first} ${last}, Wanna Play?`;
      username.insertBefore(name, username.firstChild);
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
