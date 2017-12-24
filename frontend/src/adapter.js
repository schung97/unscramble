
class Adapter {


  static getAllWords() {
    fetch('http://localhost:3000/api/v1/words')
      .then(response => response.json())
  }
}
