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

async function printPlanetInfo(planetName) {
  const planets = await getPlanets();
  const planet = planets.find((planet) => planet.name === planetName);

  const title = document.createElement("h2");
  title.innerText = `Informações sobre ${planetName}`;

  const climate = document.createElement("li");
  climate.innerText = `Clima: ${planet.climate}`;

  const population = document.createElement("li");
  population.innerText = `População: ${planet.population}`;

  const terrain = document.createElement("li");
  terrain.innerText = `Tipo de terreno: ${planet.terrain}`;

  planetArea.append(title, climate, population, terrain);
}

async function newPlanetInfo(planetName) {
  planetArea.replaceChildren();
  await printPlanetInfo(planetName);
}

printPlanets();

planetButtons.forEach((planetButton) => {
  planetButton.addEventListener("click", (e) =>
    newPlanetInfo(e.currentTarget.id)
  );
});
