const Attempt = (function createAttemptClass () {

  const all = [];

  return class Attempt extends Adapter {

    static url() {
      return 'http://localhost:3000/api/v1/attempts';
    }

    static all() {
      return all; // Dont copy the array because Adapter needs the ability to modify it
    }

    static cardMaker(attempt) {
      const attemptHistory = document.getElementsByClassName('old-attempts')[0];
      const card = document.createElement('div');
      const tryOrTries = attempt.tries === 1 ? 'try' : 'tries';

      if (attempt.success) {
        card.innerHTML = `
          <dl>GOOD JOB!</dl>
          <dl>You figured out ${attempt.word.word}.</dl>
          <dl>You got it with ${attempt.tries} ${tryOrTries}!</dl>
          <button name='delete'>x</button>`;
      } else {
        card.innerHTML = `
          <dl>NOPE!</dl>
          <dl>You couldn't figure out ${attempt.question}.</dl>
          <dl>You failed even after ${attempt.tries} ${tryOrTries}.</dl>
          <button name='delete'>x</button>
          <button name='try-again'>Try Again?</button>`;
      }

      card.id = attempt.id;
      attemptHistory.insertBefore(card, attemptHistory.firstChild);
    }

    static displayResult(guess, word_id, success, time, tries) {
      // const newAttempt = document.getElementsByClassName('new-attempts')[0];
      const user_id = Number(document.getElementById('username').childNodes[0].getAttribute('data-user-id'));
      const questionHTML = document.getElementsByName('question')[0];
      const question = questionHTML.innerText;
      if (success) {
        questionHTML.innerHTML = `GOOD JOB!`;
      } else {
        questionHTML.innerHTML = `INCORRECT!`;
      }
      Attempt.create({ success, tries, question, time, user_id, word_id }).then(Attempt.cardMaker);
    }

  };

})();
