const Word = (function createWordClass () {

  const all = [];
  let currentWord = null;

  return class Word extends Adapter {

    static url() {
      return ' https://unscrambled-game.herokuapp.com/api/v1/words';
    }

    static all() {
      return all; // Dont copy the array because Adapter needs the ability to modify it
    }

    static currentWord() {
      return currentWord;
    }

    static selectRandomWord(time) {
      const words = Word.all();
      const i = Math.floor(Math.random() * words.length);
      const w = words[i];
      const word = w.word;
      const jumbled = Word.shuffle(word);

      const minimumLength = Math.max(2, Math.floor(time / 6));
      const maximumLength = Math.max(4, Math.floor(time / 3));

      if (jumbled.length < minimumLength || jumbled.length > maximumLength) {
        return Word.selectRandomWord(time); // retry
      }
      currentWord = w;
      return jumbled;
    }

    static redo(word) {
      currentWord = word;
    }
    static shuffle(word) {
      const jumbled = word.split('').sort(() => .5 - Math.random()).join('');
      if (jumbled === word) {
        return Word.shuffle(word); // retries if word doesn't jumble properly
      }
      return jumbled;
    }

  };

})();
