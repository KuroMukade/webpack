import axios from 'axios';

export class API {
  constructor(http) {
    this.http = http;
  }

  getRandomCharacter() {
    return fetch('https://animechan.vercel.app/api/random/anime?title=naruto')
      .then((response) => response.json())
      .then((quote) => console.log(quote));
  }
}
