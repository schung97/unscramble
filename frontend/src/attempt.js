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

    static cardMaker(guess, word_id, boolean, count) {
      const attempts = document.getElementsByClassName('attempts')[0];
      const card = document.createElement('div');
      const user_id = Number(document.getElementById('username').childNodes[0].id)
      const button = document.createElement('button');
      button.setAttribute('name', 'delete');
      button.innerText = 'x';
      card.insertBefore(button, card.firstChild);
      card.setAttribute('id', `${word_id}`);

      if (boolean === true) {
        card.innerHTML += `<dl>YOU'RE RIGHT!</dl>
                          <dl>You got it with ${count} tries!</dl>`;
        attempts.appendChild(card);

      } else {
        card.innerHTML += `<dl>YOU'RE WRONG!</dl>
                          <dl>${guess}</dl>
                          <dl>a</dl>
                          <button name="again">Try Again?</button>
                          `;
        attempts.appendChild(card);
      }

      Adapter.createAttempt(boolean, count, user_id, word_id);
    }

    static getSubmitValue(response) {
        let count = 0;

        document.getElementById('submission').addEventListener('submit', function(event) {
          event.preventDefault();
          count +=1

          const guess = event.target.guess.value;
          event.target.guess.value = "";
          
          if (Word.isItCorrect(guess, response)) {
            Attempt.cardMaker(guess, response[2], true, count);
            clearTimeout(t);
            document.getElementsByName('submit')[1].disabled = true
          } else if (!(Word.isItCorrect(guess, response)) && off) {
            Attempt.cardMaker(guess, response[2], false, count);
          }
        });
      }

      static crud() {
        document.getElementsByClassName('attempts')[0].addEventListener('click', function(event) {
          handleEvent(event);
        });
      }

      static tryAgain(id) {
        const attempt_ids = [];
        Adapter.getUser(id).then(ele => ele.attempts.forEach(e => attempt_ids.push(e.id)));
      }


  }
})();
