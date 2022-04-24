async function getPlanets() {
  try {
    const response = await fetch(
      'https://swapi-trybe.herokuapp.com/api/planets/',
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Something went wrong: ${error.message}`);
  }
}

export default getPlanets;
