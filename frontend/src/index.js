
//**************event delegation**********************

function handleEvent(event) { //not to persisted to database
  if (event.target.name === 'delete') {
    event.target.parentElement.remove();
  } else if (event.target.name === 'again') {
    console.log('working');
  } else if (event.target.id === '10s') {
    Timer.countdown(10);
  } else if (event.target.id === '30s') {
    Timer.countdown(30);
  } else if (event.target.id === '1m') {
    Timer.countdown(60);
  }
}


//----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function(event) {

  User.login();
  Timer.showTimer();
  Word.allWords().then(Word.displayQuestion).then(response => Attempt.getSubmitValue(response));

  //
  // attempts.addEventListener('click', function(event) {
  //   handleEvent(event);
  // });



});
