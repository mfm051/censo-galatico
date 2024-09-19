const planetArea = document.getElementById("planet-info");

const planetButtons = document.querySelectorAll(".planet-button");
planetButtons.forEach((planetButton) => {
  planetButton.addEventListener("click", async (e) => {
    planetArea.replaceChildren();
    const planet = await getPlanetFromName(e.currentTarget.id);
    printPlanetInfo(planet);
  });
});

const searchArea = document.getElementById("search-area");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", async () => {
  planetArea.replaceChildren();
  const planet = await getPlanetFromSearch(searchArea.value);
  printPlanetInfo(planet);
});

async function getPlanets() {
  const url = "https://swapi.dev/api/planets?format=json";
  const response = await fetch(url);
  const { results } = await response.json();

  return results;
}

(async () => {
  const planets = await getPlanets();
  console.log(planets);
})();

async function getPlanetFromName(planetName) {
  const planets = await getPlanets();
  const planet = planets.find((planet) => planet.name === planetName);

  return planet;
}

async function getPlanetFromSearch(searchWord) {
  const baseUrl = "https://swapi.dev/api/planets/?search=";
  const response = await fetch(baseUrl + searchWord);
  const { results } = await response.json();
  return results[0];
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
