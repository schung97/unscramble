//note to self: pass in all the key's values
const Attempt = (function createAttemptClass() {

  const all = [];

  return class Attempt {

    constructor(id, success, tries, user, word) {
      this.id = id
      this.success = success;
      this.tries = tries;
      this.user = user;
      this.word = word
      all.push(this);
    }

    static all() {
      return [...all];
    }

    static allAttempts() {
      return Adapter.getAllAttempts().then(objects => {
        objects.forEach(function(object) {
          new Attempt(object.id, object.success, object.tries, object.user, object.word);
        });
      });
    }




    static savedCardMaker(success, tries, word, wordID) {

        const attempts = document.getElementsByClassName('old-attempts')[0];
        const card = document.createElement('div');

        const button = document.createElement('button');
        button.setAttribute('name', 'delete');
        button.innerText = 'x';
        card.insertBefore(button, card.firstChild);
        card.setAttribute('id', `${wordID}`);
        console.log(`[from database] --> word_id:${wordID} <--[from savedCardMaker]`)
        if (success) {
          card.innerHTML += `<dl>Successful!</dl>
                            <dl>${word}</dl>`;
          attempts.insertBefore(card, attempts.firstChild);

        } else {
          card.innerHTML += `<dl>Failed!</dl>
                            <dl>${Word.shuffle(word)}</dl>
                            <dl>You tried ${tries} times.</dl>
                            <button name='redo'>Try Again</button>`;
          attempts.insertBefore(card, attempts.firstChild);
        }

    }

    static getSubmitValue(event) {
      let count = 0;
      const guess = event.target.guess.value;
      const wordID = Number(document.getElementsByName('question')[0].id);
      const found = Word.all().find(word => word.id === wordID);

      if (found !== undefined) {
        count +=1
        clearTimeout(t);

        Attempt.cardMaker(guess, wordID, true, count);
        console.log(`submit from correct, pressed: ${count} times`)
        console.log(`[from getSubmitValue, correct]-- [my guess:${guess}] [correct:${found.word}]`)
        document.getElementsByName('submit')[1].disabled = true;
        document.getElementsByName('play-again')[0].style.display = 'initial';
      } else if (found === undefined && !off) {
        count +=1
        Attempt.cardMaker(guess, wordID, false, count);
        console.log(`submit from incorrect, pressed: ${count} times`)
        console.log(`[from getSubmitValue, incorrect]--[my guess:${guess}] [correct:${found.word}]`)
      }
        event.target.guess.value = "";
    }


    static cardMaker(guess, word_id, boolean, count) {
      const attempt = document.getElementsByClassName('new-attempts')[0];
      const attempts = document.getElementsByClassName('old-attempts')[0];
      const user_id = Number(document.getElementById('username').childNodes[0].id);
      const card = document.createElement('div')

      if (boolean === true) {
        console.log(`[from cardMaker]--> true == with word id :${word_id}`)
          attempt.innerHTML = `<dl>GOOD JOB!</dl>`;
          card.innerHTML = `<dl>GOOD JOB!</dl>
          <dl>${guess}</dl>
          <dl>You got it with ${count} tries!</dl>`;
          attempts.insertBefore(card, attempts.firstChild);
          Adapter.createAttempt(true, count, user_id, word_id);

      } else if (boolean === false) {
        console.log(`[from cardMaker]--> false == word id :${word_id}`)
          card.innerHTML = `<dl>NOPE!</dl>
          <dl>Your guess is "${guess}".</dl>
          <dl>This is your ${count} try.</dl>`;
      }

    }
    static deleteAttempt(wordID) {
      // const wordID = Number(event.target.parentElement.id);
      const userID = Number(document.getElementById('username').childNodes[0].id);
      // const attemptID = Number(Attempt.all().filter(obj => obj.word.id === wordID && obj.user.id === userID)[0].id);
      const attempt= Attempt.all().filter(obj => obj.word.id === wordID && obj.user.id === userID);

      if (attempt.length === 1) {
        Adapter.deleteAttempt( Number(attempt[0].id));
      }
      // else {
      //
      //   attempt.forEach(att => Adapter.deleteAttempt(Number(att.id)))
      // }

    }

    static whenZero() {
      const div = document.getElementsByClassName('new-attempts')[0];
      const user_id = document.getElementById('username').childNodes[0].id;
      const word_id = Number(document.getElementsByName('question')[0].id);
      let guess = 'blank';
      let count = 0;

      if (div.innerText.length !== 0) {
        count = Number(document.getElementsByClassName('new-attempts')[0].lastChild.innerText.split(' ')[3]);
        guess = String(document.getElementsByClassName('new-attempts')[0].childNodes[2].innerText.split(' ')[3]);
        document.getElementsByClassName('new-attempts')[0].setAttribute('id', `${word_id}`)
        Adapter.createAttempt(false, count, user_id, word_id)
        console.log(`[from whenZero]-->ran out of time. attempt_id: ${word_id}`)
      } else {
        Adapter.createAttempt(false, 0, user_id, word_id);
          document.getElementsByClassName('new-attempts')[0].setAttribute('id', `${word_id}`)
          console.log(`[from whenZero]-->left blank. attempt_id: ${word_id}`)
      }
      console.log(`[from whenZero]--> right before [try-again button] [guess: ${guess}] [count: ${count}]`)
      div.innerHTML = `<dl>NOPE!</dl>
                        <dl>Your guess is ${guess}</dl>
                        <dl>This is your ${count} try.</dl>
                        <button name="try-again">Try Again?</button>`;

    }



      //
      // static updateCardMaker(guess, word_id, boolean, count, correct, id) {
      //   const attempts = document.getElementsByClassName('new-attempts')[0];
      //
      //     if (boolean === true) {
      //       console.log(`[from updatecardMaker]--> true == with word id :${word_id}`)
      //       attempts.innerHTML = `<dl>GOOD JOB!</dl>
      //                         <dl>${correct}</dl>
      //                         <dl>You got it with ${count} tries!</dl>`;
      //                         Adapter.updateAttempt(id, true, count);
      //
      //     } else if (boolean === false) {
      //       console.log(`[from updatecardMaker]--> false == word id :${word_id}`)
      //       attempts.innerHTML = `<dl>NOPE!</dl>
      //                         <dl>Your guess is "${guess}".</dl>
      //                         <dl>This is your ${count} try.</dl>`;
      //     }
      // }



    // static getSubmitValue(response) {
    //     let count = 0;
    //
    //     document.getElementById('submission').addEventListener('submit', function(event) {
    //       event.preventDefault();
    //       count +=1
    //       console.log(`submit pressed: ${count} times`)
    //       const guess = event.target.guess.value;
    //
    //       if (Word.isItCorrect(guess, response)) {
    //         Attempt.cardMaker(guess, response[2], true, count, response[1]);
    //         clearTimeout(t);
    //       console.log(`[from getSubmitValue, correct]-- [my guess:${guess}] [correct:${response}]`)
    //         document.getElementsByName('submit')[1].disabled = true;
    //         document.getElementsByName('play-again')[0].style.display = 'initial';
    //       } else if (!(Word.isItCorrect(guess, response)) && !off) {
    //           console.log(`[from getSubmitValue, incorrect]--[my guess:${guess}] [correct:${response}]`)
    //         Attempt.cardMaker(guess, response[2], false, count, response[1]);
    //       }
    //       event.target.guess.value = "";
    //     });
    //   }
    //
    //   static updateCardMaker(guess, word_id, boolean, count, correct, id) {
    //     const attempts = document.getElementsByClassName('new-attempts')[0];
    //
    //       if (boolean === true) {
    //         console.log(`[from updatecardMaker]--> true == with word id :${word_id}`)
    //         attempts.innerHTML = `<dl>GOOD JOB!</dl>
    //                           <dl>${correct}</dl>
    //                           <dl>You got it with ${count} tries!</dl>`;
    //                           Adapter.updateAttempt(id, true, count);
    //
    //       } else if (boolean === false) {
    //         console.log(`[from updatecardMaker]--> false == word id :${word_id}`)
    //         attempts.innerHTML = `<dl>NOPE!</dl>
    //                           <dl>Your guess is "${guess}".</dl>
    //                           <dl>This is your ${count} try.</dl>`;
    //       }
    //   }





    // // static findOrCreateAttempt(id) {
    // //    return Adapter.getAllAttempts().then(obj => obj.forEach( function(ele) {
    // //       if (ele.id === id) {
    // //         return true
    // //       }
    // //    } ))
    // // }
    // static findOrCreateAttempt(id) {
    //    return Adapter.getAllAttempts().then(obj => obj.forEach( ele => ele.id === id ? true : false ))
    // }
    //
    //


    //   static reSubmitValue(result, id) {
    //       let count = 0;
    //
    //       document.getElementById('submission').addEventListener('submit', function(event) {
    //         event.preventDefault();
    //         count +=1
    //         console.log(`submit pressed: ${count} times`)
    //         const guess = event.target.guess.value;
    //
    //         if (Word.isItCorrect(guess, result)) {
    //           Attempt.updateCardMaker(guess, result[2], true, count, result[1], id);
    //           clearTimeout(t);
    //         console.log(`[from reSubmitValue, correct]-- [my guess:${guess}] [correct:${result}]`)
    //           document.getElementsByName('submit')[1].disabled = true;
    //           document.getElementsByName('play-again')[0].style.display = 'initial';
    //         } else if (!(Word.isItCorrect(guess, result)) && !off) {
    //             console.log(`[from reSubmitValue, incorrect]--[my guess:${guess}] [correct:${result}]`)
    //           Attempt.updateCardMaker(guess, result[2], false, count, result[1], id);
    //         }
    //         event.target.guess.value = "";
    //       });
    //     }
    //

    //
    //



  }
})();
