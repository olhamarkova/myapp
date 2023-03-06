import axios from 'axios';

export default class UselessFactsServise {
  constructor() {
    this.request = axios;
  }

  async getFact() {
    const urlFacts = `https://uselessfacts.jsph.pl/api/v2/facts/random`
    const res = await this.request.get(urlFacts);
    const fact = res.data.text;
    return fact; 
  } 
}

