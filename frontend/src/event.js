let count = 0;
let currentTime;
class Event {

  static setup() {
    document.getElementById('login').addEventListener('submit', Event.login);
    document.getElementsByClassName('timer')[0].addEventListener('click', Event.selectTime);
    document.getElementById('container').addEventListener('click', Event.crud);
    document.getElementById('submission').addEventListener('submit', Event.submit);
  }


  static login(event) {
    event.preventDefault();
    document.getElementsByClassName('timer')[0].style.display = 'initial';
    document.getElementById('username').style.display = 'initial';
    event.target.parentElement.style.display = 'none';
    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    User.findOrCreateByName(firstname, lastname).then(function(user) {
      const username = document.getElementById('username');
      const name = document.createElement('p');
      name.setAttribute('data-user-id', `${user.id}`);
      name.innerText = `Hey ${firstname} ${lastname}, Wanna Play?`;
      username.insertBefore(name, username.firstChild);
      Attempt.all()
        .filter(attempt => attempt.user.id === user.id)
        .forEach(Attempt.cardMaker);
    });
  }

  static selectTime(event) {
    currentTime = Number(event.target.getAttribute('data-time'));
    const jumbled = Word.selectRandomWord(currentTime);
    Timer.countdown(currentTime, Event.whenZero);
    document.getElementsByName('question')[0].innerText = jumbled;
    document.getElementsByClassName('timer')[0].style.display = 'none';
    document.getElementById('container').style.display = 'initial';
    document.getElementById('submission').style.display = 'initial';
    document.getElementsByClassName('wrapper')[0].style.display = 'initial';
    document.getElementsByName('play-again')[0].style.display = 'none';
  }

  static crud(event) {
    if (event.target.name === 'delete') {
        const parent_id = Number(event.target.parentElement.id);
        Attempt.delete(parent_id);
        event.target.parentElement.remove();
    } else if (event.target.name === 'play-again') {
        document.getElementsByClassName('timer')[0].style.display = 'initial';
        document.getElementById('container').style.display = 'none';
        document.getElementById('submission').style.display = 'none';
        document.getElementsByClassName('wrapper')[0].style.display = 'none';
        document.getElementsByName('play-again')[0].style.display = 'none';
        document.getElementsByClassName('new-attempts')[0].innerText = "";
        document.getElementsByName('submit')[1].disabled = false;
    } else if (event.target.name === 'try-again') {
        const parent_id = Number(event.target.parentElement.id);
        const time = Attempt.all().find(attempt => attempt.id === parent_id).time;
        Attempt.delete(parent_id);
        event.target.parentElement.remove();
        document.getElementsByClassName('new-attempts')[0].innerText = "";
        document.getElementsByName('submit')[1].disabled = false;
        document.getElementsByName('play-again')[0].style.display = 'none';
        Timer.countdown(time, Event.whenZero);
    }
  }

  static submit() {
    event.preventDefault();
    const word = Word.currentWord();
    const guess = document.getElementById('guess');
    count += 1;
    if (guess.value === word.word) {
      Timer.stop();
      Attempt.displayResult(guess.value, word.id, true, currentTime, count);
      count = 0;
      document.getElementsByName('play-again')[0].style.display = 'initial';
      document.getElementsByName('submit')[1].disabled = true;
    }
    guess.value = "";
  }

  static whenZero() {
    const word = Word.currentWord();
    const guess = document.getElementById('guess');
    Attempt.displayResult(guess.value, word.id, false, currentTime, count);
    count = 0;
    guess.value = "";
    document.getElementsByName('play-again')[0].style.display = 'initial';
    document.getElementsByName('submit')[1].disabled = true;
  }

}
