export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export async function fetchData() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
  );
  const data = await res.json();
  console.log(data.results);
  return data.results;
}
