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

    static cardMaker(guess, id, boolean) {
      const attempts = document.getElementsByClassName('attempts')[0];
      const card = document.createElement('div');
      const button = document.createElement('button');
      button.setAttribute('name', 'delete');
      button.innerText = 'x';
      card.insertBefore(button, card.firstChild);
      card.setAttribute('id', `${id}`);

      if (boolean === true) {
        card.innerHTML += `<dl>YOU'RE RIGHT!</dl>
                          <dl>${guess}</dl>`;
        attempts.appendChild(card);

      } else {
        card.innerHTML += `<dl>YOU'RE WRONG!</dl>
                          <dl>${guess}</dl>
                          <button name="again">Try Again?</button>
                          `;
        attempts.appendChild(card);
      }
    }

    static getSubmitValue(response) {
        let count = 0;

        document.getElementById('submission').addEventListener('submit', function(event) {
          event.preventDefault();
          count +=1
          console.log(count)
          const guess = event.target.guess.value;
          event.target.guess.value = "";

          if (Word.isItCorrect(guess, response)) {
            Attempt.cardMaker(guess, response[2], true);
            clearTimeout(t);
            console.log(`correct: ${guess}`)
            return guess;
          } else {
            Attempt.cardMaker(guess, response[2], false);
            console.log(`wrong: ${response}`)
            return guess;
          }
        });
      }



  }
})();
