async function getPlanets() {
  const url = "https://swapi.dev/api/planets?format=json";
  try {
    response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const { results } = await response.json();
    console.log(results);
  } catch (error) {
    console.log(error.message);
  }
}

getPlanets();
