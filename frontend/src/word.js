
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

  }

})();
