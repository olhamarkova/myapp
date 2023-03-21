import axios from 'axios';

export default class UselessFactsServise {
  constructor() {
    this.request = axios;
  }

  async getFact() {
    try {
    const urlFacts = `https://uselessfacts.jsph.pl/api/v2/facts/random`
    const res = await this.request.get(urlFacts);
    if(res.data) {
      return res.data.text;
    }
  } catch(error){
    res.json({
      message: "Nothing special today"
      });
    } 
  } 
}

