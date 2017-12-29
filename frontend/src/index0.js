
function findOrCreateUser(event) { //the finding part not implemented
  const username = document.createElement('div');
  const body = event.target.parentElement.parentElement;
  const firstname = event.target.firstname.value;
  const lastname = event.target.lastname.value;
  // if (response.ok) {
  //
  // } else {
  //   // Adapter.createUser(firstname, lastname);
  // }

  login.style.display = 'none';
  username.setAttribute('id', 'username');
  username.innerHTML = `Hey ${firstname} ${lastname}, Wanna Play?`;
  body.insertBefore(username, document.getElementsByClassName('timer')[0]);
}


function randomWordSelector() {
  const words = Word.all();
  const i = Math.floor(Math.random() * (words.length - 1));
  const random = words[i];
  const word = random['word'];
  const word_id = random['id'];
  const jumbled = word.split('').sort(function(){return .5 - Math.random()}).join('');
  return [jumbled, word, word_id];
}

function wordToDisplay(obj) {
  const question = obj[0];
  return question;
}

function isItCorrect(guess, obj) {
  const answer = obj[1];

  if (guess === answer) {
    return true
    console.log("yes you smarty")
  } else {
    return false;
    console.log("try again")
  }
}

function cardMaker(guess, id, boolean) {
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
//**************event delegation*******************

function handleEvent(event) { //not to persisted to database
  if (event.target.name === 'delete') {
    event.target.parentElement.remove();
  } else if (event.target.name === 'again') {
    console.log('working');
  } else if (event.target.id === '10s') {

    countdown(10);

  } else if (event.target.id === '30s') {
    countdown(30);
  } else if (event.target.id === '1m') {
    countdown(60);
  }

}








//----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function(event) {
  //*********RETRIEVING ALL THE WORDS FROM THE DATABASE********
  Adapter.getAllWords().then( objects => {
    objects.forEach(function(object) {
      new Word(object.word, object.id);
    });
  });

  const container = document.getElementById('container');
  const login = document.getElementById('login');
  const submission = document.getElementById('submission');
  const attempts = document.getElementsByClassName('attempts')[0];
  const timer = document.getElementsByClassName('timer')[0];
  container.style.display = 'none';
  timer.style.display = 'none';

  login.addEventListener('submit', function(event) {
    event.preventDefault();
    findOrCreateUser(event);
    timer.style.display = 'initial';

    const question = document.getElementById('question');
    randomWord = randomWordSelector(); //must be global
    question.innerText = wordToDisplay(randomWord);

  });

  timer.addEventListener('click', function(event) {
    timer.style.display = 'none';
    container.style.display = 'initial';
    handleEvent(event);
  });

  attempts.addEventListener('click', function(event) {
    handleEvent(event);
  });





  //******************submit*****************onst getSubmitValue = (function() {
  let count = 0;


  document.getElementById('submission').addEventListener('submit', function(event) {


    count +=1
    console.log(count)
    event.preventDefault();
    const guess = event.target.guess.value;
    event.target.guess.value = "";

    if (isItCorrect(guess, randomWord)) {
      cardMaker(guess, randomWord[2], true);
      return guess;
    } else {
      //  cardMaker(guess, randomWord[2], false);
      return guess;
    }

  })


  //******************submit***********************************
  //  count = 0;
  // //******************submit***********************************
  //
  //   submission.addEventListener('submit', function(event) {
  //     count +=1
  //     console.log(count)
  //     event.preventDefault();
  //     const guess = event.target.guess.value;
  //     event.target.guess.value = "";
  //
  //     if (isItCorrect(guess, randomWord)) {
  //       cardMaker(guess, randomWord[2], true);
  //     } else {
  //       cardMaker(guess, randomWord[2], false);
  //     }
  //   });
  //
  //   //******************submit***********************************





});
