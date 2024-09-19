const planetArea = document.getElementById("planet-info");
const residentsTable = document.getElementById("residents-info");
const residentsData = document.getElementById("residents-data");

const planetButtons = document.querySelectorAll(".planet-button");
planetButtons.forEach((planetButton) => {
  planetButton.addEventListener("click", async (e) => {
    clearScreen();
    const planet = await getPlanetFromName(e.currentTarget.id);
    printPlanetInfo(planet);
    showResidents(planet);
  });
});

const searchArea = document.getElementById("search-area");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", async () => {
  clearScreen();
  const planet = await getPlanetFromSearch(searchArea.value);
  printPlanetInfo(planet);
  showResidents(planet);
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

async function getResident(residentURL) {
  const response = await fetch(residentURL);
  const resident = await response.json();
  return resident;
}

async function getPlanetResidents(planet) {
  const residentsURLs = planet.residents.map((url) => url + "?format=json");
  const residents = await Promise.all(
    residentsURLs.map(async (url) => {
      const resident = await getResident(url);
      return resident;
    })
  );

  return residents;
}

async function showResidents(planet) {
  const residents = await getPlanetResidents(planet);
  if (residents.length === 0) {
    return;
  }

  residentsTable.style.display = "block";

  residents.forEach((resident) => {
    const residentRow = document.createElement("tr");
    const residentNameCell = document.createElement("td");
    const residentBirthCell = document.createElement("td");

    residentNameCell.innerText = resident.name;
    residentBirthCell.innerText = resident.birth_year;

    residentRow.append(residentNameCell, residentBirthCell);
    residentsData.appendChild(residentRow);
  });
}

function clearScreen() {
  planetArea.replaceChildren();
  residentsTable.style.display = "none";
  residentsData.replaceChildren();
}
