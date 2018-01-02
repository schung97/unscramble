
//**************event delegation**********************

// function handleEvent(event) { //not to persisted to database
//   const parent_id = Number(event.target.parentElement.id);
//
//   if (event.target.name === 'delete') {
//     console.log(`[from handleEvent]--> clicked delete [attempt_id:${parent_id}]`)
//     event.target.parentElement.remove();
//     Adapter.deleteAttempt(parent_id);
//     console.log('[from handleEvent]--> delete event ended')
//   } else if (event.target.name === 'play-again') {
//     console.log('[from handleEvent]--> clicked play-again')
//     document.getElementsByClassName('timer')[0].style.display = 'initial';
//     document.getElementById('submission').style.display = 'none';
//     document.getElementsByClassName('wrapper')[0].style.display = 'none';
//     document.getElementsByName('play-again')[0].style.display = 'none';
//     document.getElementsByClassName('new-attempts')[0].innerText = "";
//     document.getElementsByName('submit')[1].disabled = false;
//     Word.allWords().then(Word.displayQuestion).then(Attempt.getSubmitValue)
//     console.log('[from handleEvent]--> play-again ended')
//   } else if (event.target.name === 'try-again') {
//     console.log('[from handleEvent]--> clicked try-again')
//     const attempt_id = Number(document.getElementsByClassName('new-attempts')[0].id)
//     User.redoAttempt(attempt_id);
//     document.getElementsByClassName('timer')[0].style.display = 'initial';
//     document.getElementById('container').style.display = 'none';
//     document.getElementsByClassName('old-attempts')[0].innerText = 'initial';
//     document.getElementsByClassName('new-attempts')[0].innerText = "";
//     document.getElementsByName('submit')[1].disabled = false;
//     console.log('[from handleEvent]--> try-again ended')
//     // Adapter.updateAttempt(parent_id, success, tries)
//   } else if (event.target.id === '10s') {
//     console.log('[from handleEvent]--> clicked 10s')
//
//     Timer.countdown(10);
//     document.getElementsByClassName('timer')[0].style.display = 'none';
//     document.getElementById('container').style.display = 'initial';
//
//     console.log('[from handleEvent]--> 10s event ended')
//   } else if (event.target.id === '30s') {
//     console.log('[from handleEvent]--> clicked 30s')
//
//     Timer.countdown(30);
//     document.getElementsByClassName('timer')[0].style.display = 'none';
//     document.getElementById('container').style.display = 'initial';
//
//     console.log('[from handleEvent]--> 30s event ended')
//   } else if (event.target.id === '1m') {
//
//     console.log('[from handleEvent]--> clicked 1m')
//     Timer.countdown(60);
//     document.getElementsByClassName('timer')[0].style.display = 'none';
//     document.getElementById('container').style.display = 'initial';
//
//     console.log('[from handleEvent]--> 1m event ended')
//   }
// }


//----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function(event) {
  console.log(`[from DOMContentLoaded]--> begining`)

  Word.allWords();
  User.getAllUsers();
  Attempt.allAttempts();
  Event.login();
  Event.selectTime();
  Event.submit()
  Event.crud();
  // User.login();
  // Timer.showTimer(); // listen for clicks
  // Word.allWords().then(Word.randomWordSelector).then(Word.displayQuestion).then(Attempt.getSubmitValue)
  // Attempt.crud(); //listen for clicks
  console.log(`[from DOMContentLoaded]--> end`)
});
