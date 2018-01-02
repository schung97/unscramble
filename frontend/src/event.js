let loginner= 0;
let guesser= 0;
class Event {


  static login() {
    document.getElementById('login').addEventListener('submit', function(event) {
    console.log(`[from event login]--> submit pressed:${loginner += 1}x`)
      Event.handleEvent(event);
    });
    console.log(`[from eventlogin]--> login ended`)
  }

  static selectTime() {
    document.getElementsByClassName('timer')[0].addEventListener('click', function(event) {
      Event.handleEvent(event);
    })
  }

  static crud() {
    document.getElementById('container').addEventListener('click', function(event) {
         console.log(`[from event crud], i've been executed`)
         Event.handleEvent(event);
    });
  }

  static submit() {
    document.getElementById('submission').addEventListener('submit', function(event) {
       console.log(`[from event submit], you've guessed ${guesser += 1}x`)
       Event.handleEvent(event);
    })
  }




  static handleEvent(event) {

    if (event.target.parentElement.id === 'login') {
        event.preventDefault();
        User.findOrCreateUser(event);
        document.getElementsByClassName('timer')[0].style.display = 'initial';
        document.getElementById('username').style.display = 'initial';
        event.target.parentElement.style.display = 'none';

    } else if (event.target.id === '10s') {
        console.log('[from handleEvent]--> clicked 10s')
        const userID = Number(document.getElementById('username').childNodes[0].id);
        Word.randomWordSelector(event);
        User.attempts(userID);
        Timer.countdown(10);
        document.getElementsByClassName('timer')[0].style.display = 'none';
        document.getElementById('container').style.display = 'initial';
        document.getElementById('submission').style.display = 'initial';
        document.getElementsByClassName('wrapper')[0].style.display = 'initial';
        document.getElementsByName('play-again')[0].style.display = 'none'

      console.log('[from handleEvent]--> 10s event ended')
    } else if (event.target.id === '30s') {
        console.log('[from handleEvent]--> clicked 30s')
        Word.randomWordSelector(event);
        Timer.countdown(30);
        document.getElementsByClassName('timer')[0].style.display = 'none';
        document.getElementById('container').style.display = 'initial';
        document.getElementById('submission').style.display = 'initial';
        document.getElementsByClassName('wrapper')[0].style.display = 'initial';
        document.getElementsByName('play-again')[0].style.display = 'none'
      console.log('[from handleEvent]--> 30s event ended')
    } else if (event.target.id === '1m') {
        console.log('[from handleEvent]--> clicked 1m')
        Word.randomWordSelector(event);
        Timer.countdown(60);
        document.getElementsByClassName('timer')[0].style.display = 'none';
        document.getElementById('container').style.display = 'initial';
        document.getElementById('submission').style.display = 'initial';
        document.getElementsByClassName('wrapper')[0].style.display = 'initial';
        document.getElementsByName('play-again')[0].style.display = 'none'

        console.log('[from handleEvent]--> 1m event ended')
    } else if (event.target.name === 'delete') {
        const parent_id = Number(event.target.parentElement.id);
        console.log(`[from handleEvent]--> clicked delete [attempt_id:${parent_id}]`)
        Attempt.deleteAttempt(parent_id);
        event.target.parentElement.remove();
        console.log('[from handleEvent]--> delete event ended')
    } else if (event.target.name === 'play-again') {
        console.log('[from handleEvent]--> clicked play-again')
        document.getElementsByClassName('timer')[0].style.display = 'initial';
        document.getElementById('submission').style.display = 'none';
        document.getElementsByClassName('wrapper')[0].style.display = 'none';
        document.getElementsByName('play-again')[0].style.display = 'none';
        document.getElementsByClassName('new-attempts')[0].innerText = "";
        document.getElementsByName('submit')[1].disabled = false;

      console.log('[from handleEvent]--> play-again ended')
    } else if (event.target.name === 'try-again') {
        console.log('[from handleEvent]--> clicked try-again')
        const attempt_id = Number(document.getElementsByClassName('new-attempts')[0].id)
        // User.redoAttempt(attempt_id);
        document.getElementsByClassName('timer')[0].style.display = 'initial';
        // document.getElementById('container').style.display = 'none';
        // document.getElementsByClassName('old-attempts')[0].innerText = 'initial';
        // document.getElementsByClassName('new-attempts')[0].innerText = "";
        document.getElementsByName('submit')[1].disabled = false;
        console.log('[from handleEvent]--> try-again ended')
        // Adapter.updateAttempt(parent_id, success, tries)
    } else if (event.target.parentElement.id === 'submission') {
        event.preventDefault();
        Attempt.getSubmitValue(event);
        console.log('[from handleEvent]--> submit ')
    }


  }



}
