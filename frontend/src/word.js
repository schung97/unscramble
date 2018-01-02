
//store all the words to display,
//note to self. pass the string text and word id
const Word = (function createWordClass() {
  const all = [];

  return class Word {

    constructor(word, id) {
      this.word = word;
      this.id = id;
      all.push(this)
    }

    static all() {
      return [...all];
    }

    static allWords() {
      return Adapter.getAllWords().then(objects => {
        objects.forEach(function(object) {
          new Word(object.word, object.id);
        });
      });
    }

    static shuffle(word) {
      return word.split('').sort(function(){return .5 - Math.random()}).join('');
    }

    static randomWordSelector(event) {
      const n = event.target.id;
      const words = Word.all();
      const i = Math.floor(Math.random() * (words.length - 1));
      const w = words[i];
      const word = w.word
      const wordID = w.id;
      const jumbled = Word.shuffle(word);

      if ((n === '10s') && (jumbled.length <= 4)) {
          Word.displayQuestion(jumbled, wordID)
      } else if ((n === '30s') && (jumbled.length > 4 && jumbled.length <= 10)) {
          Word.displayQuestion(jumbled, wordID)
      } else if (n === '1m' && (jumbled.length > 10)) {
          Word.displayQuestion(jumbled, wordID)
      } else {
        Word.randomWordSelector(event)
      }
    }

    static displayQuestion(word, wordID) {
      const question = document.getElementsByName('question')[0];
      question.setAttribute('id', `${wordID}`);
      question.innerText = word;
    }

    //
    // static isItCorrect(guess, wordID) {
    //
    //   const found = Word.all().find(word => word.id === wordID);
    //
    //   if (found !== undefined) {
    //     return true
    //   }
    //
    //
    // }



  }

})();
