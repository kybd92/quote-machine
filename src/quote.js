export function getQuote() {
  return fetch(
    "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"
  )
    .then((data) => data.json())
    .catch((err) => console.log(err));
}
