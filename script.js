const planetArea = document.getElementById("planet-info");
const planetButtons = document.querySelectorAll(".planet-button");

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

async function getPlanetFromName(planetName) {
  const planets = await getPlanets();
  const planet = planets.find((planet) => planet.name === planetName);

  return planet;
}

async function printPlanetInfo(planet) {
  const title = document.createElement("h2");
  title.innerText = `Informações sobre ${planet.name}`;

  const climate = document.createElement("li");
  climate.innerText = `Clima: ${planet.climate}`;

  const population = document.createElement("li");
  population.innerText = `População: ${planet.population}`;

  const terrain = document.createElement("li");
  terrain.innerText = `Tipo de terreno: ${planet.terrain}`;

  planetArea.append(title, climate, population, terrain);
}

async function newPlanetInfo(planetName) {
  const planet = await getPlanetFromName(planetName);
  planetArea.replaceChildren();
  await printPlanetInfo(planet);
}

printPlanets();

planetButtons.forEach((planetButton) => {
  planetButton.addEventListener("click", (e) =>
    newPlanetInfo(e.currentTarget.id)
  );
});

async function getPlanetFromInput() {
  const searchArea = document.getElementById("search-area");

  const baseUrl = "https://swapi.dev/api/planets/?search=";
  const searchWord = searchArea.value;

  try {
    const response = await fetch(baseUrl + searchWord);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const { results } = await response.json();
    return results;
  } catch (error) {
    console.log(error.message);
  }
}

async function printSearchedPlanet() {
  planetArea.replaceChildren();
  const searchResults = await getPlanetFromInput();
  const planet = searchResults[0];
  printPlanetInfo(planet);
}

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", printSearchedPlanet);
