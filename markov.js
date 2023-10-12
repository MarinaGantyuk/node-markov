/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextword = this.words[i + 1] || null;
      if (word in this.chains) {
        this.chains[word].push(nextword);
      } else {
        this.chains[word] = [nextword];
      }
    }
    //console.log(result);
  }

  /** return random text from chains */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Object.keys(this.chains);
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains[key]);
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
//let mm = new MarkovMachine("the cat in the hat");
//console.log(mm.makeText());
