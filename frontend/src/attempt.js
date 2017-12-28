//note to self: pass in all the key's values
const Attempt = (function createAttemptClass() {

  const all = [];

  return class Attempt {

    constructor(success, tries, user, word) {
      this.success = success;
      this.tries = tries;
      this.user = user;
      this.word = word
      all.push(this);
    }

    static all() {
      return [...all];
    }

  }
})();
