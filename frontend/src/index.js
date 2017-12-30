
//**************event delegation**********************

function handleEvent(event) { //not to persisted to database
  const parent_id = Number(event.target.parentElement.id);

  if (event.target.name === 'delete') {
    event.target.parentElement.remove();
    Adapter.deleteAttempt(parent_id);
  } else if (event.target.name === 'again') {
    // Adapter.updateAttempt(parent_id, success, tries)
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
  Word.allWords().then(Word.displayQuestion).then(response => Attempt.getSubmitValue(response))
  Attempt.crud();

});
