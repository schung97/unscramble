const User = (function createUserClass () {

  const all = [];

  return class User extends Adapter {

    static url() {
      return ' https://unscrambled-game.herokuapp.com/api/v1/users';
    }

    static all() {
      return all; // Dont copy the array because Adapter needs the ability to modify it
    }

    static findOrCreateByName(firstname, lastname) {
      const found = all.find(item => item.firstname === firstname && item.lastname === lastname);
      if (found) {
        return Promise.resolve(found);
      } else {
        return User.create({ firstname, lastname });
      }
    }
  };

})();
