
class Adapter {

  static create(attributes) {
    return fetch(this.url(), {
      method: 'POST',
      body: JSON.stringify(attributes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json())
      .then(json => new this(json));
  }

  static getAll() {
    return fetch(this.url())
      .then(response => response.json())
      .then(array => array.map(json => new this(json)));
  }

  static get(id) {
    return fetch(`${this.url()}/${id}`)
       .then(response => response.json())
       .then(json => new this(json));
  }

  static delete(id) {
    const all = this.all();
    const index = all.findIndex(item => item.id === id);
    if (index !== -1) all.splice(index, 1); // here, splice removes that item from the "all" array
    return fetch(`${this.url()}/${id}`, { method: 'DELETE' })
      .then(response => response.json());
  }

  static update(id, attributes) {
    return fetch(`${this.url()}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(attributes),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json())
      .then(json => new this(json));
  }

  // Equivalent to findOrCreate
  constructor(attributes) {
    const id = attributes.id;
    const all = this.constructor.all(); // this.constructor is the child class
    let instance = all.find(item => item.id === id);
    if (!instance) {
      instance = this;
      all.push(instance);
    }
    Object.assign(instance, attributes);
    return instance;
  }

}
