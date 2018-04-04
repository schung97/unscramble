const Attempt = (function createAttemptClass () {

  const all = [];

  return class Attempt extends Adapter {

    static url() {
      return ' https://unscrambled-game.herokuapp.com/api/v1/attempts';
    }

    static all() {
      return all; // Dont copy the array because Adapter needs the ability to modify it
    }

    static cardMaker(attempt) {
      const attemptHistory = document.getElementsByClassName('old-attempts')[0];
      const card = document.createElement('div');
      const tryOrTries = attempt.tries === 1 ? 'time' : 'times';

      if (attempt.success) {
        card.innerHTML = `
          <strong>GOOD JOB!</strong>
          <p>You figured out <strong>${attempt.word.word}</strong>.</p>
          <p>You got it with <strong>${attempt.tries}</strong> ${tryOrTries}!</p>
          <button name='delete'>x</button>`;
      } else {
        card.innerHTML = `
          <strong>NOPE!</strong>
          <p>You couldn't figure out</p>
          <strong>${attempt.question}</strong>
          <p>Guessed <strong>${attempt.tries}</strong> ${tryOrTries}.</p>
          <button name='delete'>x</button>
          <button name='try-again'>Redo</button>`;
      }

      card.id = attempt.id;
      attemptHistory.insertBefore(card, attemptHistory.firstChild);
    }

    static displayResult(guess, word_id, success, time, tries) {
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
