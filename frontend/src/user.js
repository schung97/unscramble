//note to self: only user, pass in string values
let logincount = 0;
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
        .then(response => { response.forEach(function(user) {
          new User(user);
        })
      })
    }

    static findOrCreateUser(event) {
      const username = document.getElementById('username');
      const name = document.createElement('p');
      const first = event.target.firstname.value;
      const last = event.target.lastname.value;
      const person = User.all().find(ele => ele.user.firstname === first && ele.user.lastname === last);
      console.log(`[from findOrCreateUser]--> right before database`)

        if (person !== undefined) {
          name.setAttribute('id', `${person.user.id}`);
          // User.attempts(person.user.id);
          console.log(`[from findOrCreateUser/inside User.all]--> existing:${person.user.id}`)
        } else {
          Adapter.createUser(first, last).then(function(user) {
            name.setAttribute('id', `${Number(user.id)}`);
            console.log(`[from findOrCreateUser/inside Adapter.getUsers]--> creating new user:${user.id}`)
          })
        }
        console.log(`[from findOrCreateUser]--> right after database `)
        name.innerText = `Hey ${first} ${last}, Wanna Play?`;
        username.insertBefore(name, username.firstChild);
      }

    static attempts(userID) {
      const attempts = Attempt.all().filter(attempt=> attempt.user.id === userID);
      debugger
      attempts.forEach(function(attempt) {
        Attempt.savedCardMaker(attempt.success, attempt.tries, attempt.word.word, attempt.word.id);
      });
    }



    //
    // static redoAttempt(id) {
    //   Adapter.getAttempt(id).then(function(response) {
    //     const attempt_id = response.id;
    //     const boolean = response.success;
    //     const tries = response.tries;
    //     const wordID = response.word.id;
    //     const word = response.word.word;
    //     const userID = response.user.id;
    //     const jumbled = Word.wordShuffle(word);
    //     const question = Word.displayQuestion([jumbled, word, wordID]);
    //     Attempt.reSubmitValue(question, attempt_id);
    //   });
    // }
  }

})();
