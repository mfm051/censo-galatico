const planetArea = document.getElementById("planet-info");
const residentsTable = document.getElementById("residents-info");
const residentsData = document.getElementById("residents-data");

const planetButtons = document.querySelectorAll(".planet-button");
planetButtons.forEach((planetButton) => {
  planetButton.addEventListener("click", async (e) => {
    const planet = await getSinglePlanet(e.currentTarget.id);
    updatePageInfo(planet);
  });
});

const searchArea = document.getElementById("search-area");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", async () => {
  const planet = await getSinglePlanet(searchArea.value);
  updatePageInfo(planet);
});

function updatePageInfo(planet) {
  planetArea.replaceChildren();
  residentsData.replaceChildren();
  residentsTable.style.display = "none";
  printPlanetInfo(planet);
  showResidents(planet);
}

async function getPlanets() {
  const url = "https://swapi.dev/api/planets?format=json";
  const response = await fetch(url);
  const { results } = await response.json();

  return results;
}

async function getSinglePlanet(planetName) {
  const url = `https://swapi.dev/api/planets?format=json&search=${planetName}`;
  const response = await fetch(url);
  const { results } = await response.json();
  const planet = results[0];

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

async function getResident(residentURL) {
  const response = await fetch(residentURL);
  const resident = await response.json();
  return resident;
}

async function showResidents(planet) {
  const residentsURLs = planet.residents.map((url) => url + "?format=json");

  if (residentsURLs.length === 0) {
    return;
  }

  residentsTable.style.display = "block";

  residentsURLs.forEach(async (url) => {
    const resident = await getResident(url);

    const residentRow = document.createElement("tr");
    const residentNameCell = document.createElement("td");
    const residentBirthCell = document.createElement("td");

    residentNameCell.innerText = resident.name;
    residentBirthCell.innerText = resident.birth_year;

    residentRow.append(residentNameCell, residentBirthCell);
    residentsData.appendChild(residentRow);
  });
}

// Log all planets on page load
(async () => {
  const planets = await getPlanets();
  console.log(planets);
})();
