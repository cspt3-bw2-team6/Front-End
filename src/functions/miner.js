var sha256 = require('js-sha256').sha256;



export const proof_of_work = (last_proof, difficulty) => {
  console.log('Searching for next proof')
  let proof = 0
  while (valid_proof(last_proof, proof, difficulty) === false) {
      proof += 1
  }
  console.log(`Proof found: ${proof}`)
  return proof
}
  

export const valid_proof = (last_proof, proof, difficulty) => {

  // Validates the Proof:  Does hash(last_proof, proof) contain 8 leading zeroes?
  const guess = `${last_proof}${proof}`;
  const guess_hash = sha256
    .create()
    .update(guess)
    // .hex(str)
    .slice(0, difficulty);
  return guess_hash   

}