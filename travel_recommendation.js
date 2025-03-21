
function focusSearch() {
  document.getElementById("search-input").focus();
}

function clearSearch() {
  document.getElementById("search-input").value = "";
  document.getElementById("search-results").innerHTML = ""; 
  resultsContainer.style.display = "none";
  recommendationsTitle.style.display = "none";
}


function showPage(pageId) {

  const pages = document.querySelectorAll(".page-content");
  pages.forEach((page) => (page.style.display = "none"));

  const selectedPage = document.getElementById(pageId + "-page");
  if (selectedPage) {
    selectedPage.style.display = "block";
  }
}


showPage("home");

const resultsContainer = document.getElementById("search-results");

const recommendationsTitle = document.querySelector(".recommendations-title");


const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", function () {
  const query = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();

  resultsContainer.innerHTML = ""; 

  if (query === "") {
    resultsContainer.innerHTML =
      "<p>Please enter a destination or keyword.</p>";
    return;
  }

  recommendationsTitle.style.display = "block";

  
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.countries;
      const temples = data.temples;
      const beaches = data.beaches;

 
      let filteredResults = [];


      countries.forEach((country) => {

        country.cities.forEach((city) => {
          if (
            city.name.toLowerCase().includes(query) ||
            city.description.toLowerCase().includes(query)
          ) {
            filteredResults.push({
              name: city.name,
              description: city.description, 
              imageUrl: city.imageUrl, 
            });
          }
        });
      });


      temples.forEach((temple) => {
        if (
          temple.name.toLowerCase().includes(query) ||
          temple.description.toLowerCase().includes(query)
        ) {

          filteredResults.push({
            name: temple.name, 
            description: temple.description,
            imageUrl: temple.imageUrl,
          });
        }
      });

      console.log("beaches:", beaches);

      console.log("query:", query);

      beaches.forEach((beach) => {

        if (
          beach.name.toLowerCase().includes(query) ||
          beach.description.toLowerCase().includes(query)
        ) {

          filteredResults.push({
            name: beach.name,
            description: beach.description,
            imageUrl: beach.imageUrl, 
          });
        }
        console.log("aaa");
      });

      console.log("filteredResults:", filteredResults);

      if (filteredResults.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
      } else {
        filteredResults.forEach((dest) => {
          const resultItem = document.createElement("div");
          resultItem.classList.add("result-item");

          const image = document.createElement("img");
          image.src = dest.imageUrl;
          image.alt = dest.name;
          image.classList.add("result-image");

          const name = document.createElement("p");
          name.textContent = dest.name;

          const description = document.createElement("p");
          description.textContent = dest.description;

          resultItem.appendChild(image);
          resultItem.appendChild(name);
          resultItem.appendChild(description);

          console.log(resultItem); 
          resultsContainer.appendChild(resultItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      resultsContainer.innerHTML = "<p>Error loading data.</p>";
    });

  resultsContainer.style.display = "block";
});

const options = {
  timeZone: "Asia/Tokyo",
  hour12: true,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const japanTime = new Date().toLocaleTimeString("ja-JP", options);
console.log("現在の日本時間:", japanTime);
