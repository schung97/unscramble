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

  }

})();
