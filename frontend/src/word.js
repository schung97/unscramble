
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
    static randomWordSelector() {
      const words = Word.all();
      const i = Math.floor(Math.random() * (words.length - 1));
      const random = words[i];
      const word = random['word'];
      const word_id = random['id'];
      const jumbled = word.split('').sort(function(){return .5 - Math.random()}).join('');
      return [jumbled, word, word_id];
    }

    static wordToDisplay(obj) {
      const question = obj[0];
      return question;
    }

    static isItCorrect(guess, obj) {
      const answer = obj[1];

      if (guess === answer) {
        return true
        console.log("yes you smarty")
      } else {
        return false;
        console.log("try again")
      }
    }

    static allWords() {
      return Adapter.getAllWords().then(objects => {
        objects.forEach(function(object) {
          new Word(object.word, object.id);
        });
      });
    }

    static displayQuestion() {
      const question = document.getElementById('question');
      const randomWord = Word.randomWordSelector();
      question.innerText = Word.wordToDisplay(randomWord);
      return randomWord
    }

  }

})();
