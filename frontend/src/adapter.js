
class Adapter {

  static createUser(firstname, lastname) {
    return fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      body: JSON.stringify({firstname, lastname}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  static getUser(first, last) {
    // var url = new URL("http://localhost:3000/api/v1/users"),
    //     params = {firstname:"Jenna", lastname:"Kim"}
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    // fetch(url).then(response => response.json()).then(arr => arr[0])

  }

  static getUsers() {
    return fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json());
  }

  static getAllWords() {
    return fetch('http://localhost:3000/api/v1/words')
      .then(response => response.json());
  }

  static getWord(id) {
    return fetch(`http://localhost:3000/api/v1/words/${id}`)
      .then(response => response.json());
  }

  static getAllAttempts() {
    return fetch('http://localhost:3000/api/v1/attempts')
      .then(response => response.json());
  }

  static getAttempt(id) {
    return fetch(`http://localhost:3000/api/v1/attempts/${id}`)
      .then(response => response.json());
  }

  static deleteAttempt(id) {
    return fetch(`http://localhost:3000/api/v1/attempts/${id}`, {method: 'DELETE'})
      .then(response => response.json());
  }

  static createAttempt(success, tries, user_id, word_id) {
    return fetch('http://localhost:3000/api/v1/attempts', {
      method: 'POST',
      body: JSON.stringify({success, tries, user_id, word_id}),
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      }
    })
  }

  static updateAttempt(id, success, tries) {
    return fetch(`http://localhost:3000/api/v1/attempts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ success, tries}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json());
  }


}
