/**
 * @typedef {Object} Config
 * @property {string[]} titles - My titles
 * @property {string} linkedin - LinkedIn URL
 */

/** @type {Config} */
let config = {
  titles: [],
  linkedin: "",
};

/** Loads the website data from a JSON file. */
async function loadConfig() {
  const response = await fetch("config.json");
  config = await response.json();
}

function setTitles() {
  const carousel = document.getElementById("titles-carousel");

  setInterval(() => {
    setCarouselHeight();
    const title = document.createElement("h3");
    title.setAttribute("class", "title");
    title.textContent =
      config.titles[Math.floor(Math.random() * config.titles.length)];
    carousel.appendChild(title);
  }, 1000);

  let interval;
  function handleClearTitles() {
    clearInterval(interval);
    clearTitles();
    interval = setInterval(
      handleClearTitles,
      Math.floor(Math.random() * (10000 - 1000) + 1000)
    );
  }

  function clearTitles() {
    carousel.innerHTML = "";
    setCarouselHeight();
    clearInterval(interval);
  }

  function setCarouselHeight() {
    carousel.style.height = (carousel.childNodes.length + 1) * 32 + "px";
  }

  handleClearTitles();
}

function addHandlers() {
  const linkedinButton = document.getElementById("linkedin-button");
  const projectsButton = document.getElementById("projects-button");
  linkedinButton.addEventListener("click", () => {
    window.open(config.linkedin, "__blank");
  });
  projectsButton.addEventListener("click", () => {
    window.location.href = "/projects";
  });
}

async function main() {
  await loadConfig();
  setTitles();
  addHandlers();
}

main();
