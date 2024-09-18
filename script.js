async function getPlanets() {
  const url = "https://swapi.dev/api/planets?format=json";
  try {
    response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const { results } = await response.json();
    return results;
  } catch (error) {
    console.log(error.message);
  }
}

async function printPlanets() {
  const planets = await getPlanets();
  console.log(planets);
}

printPlanets();
