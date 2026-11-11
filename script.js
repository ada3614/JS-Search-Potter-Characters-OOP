// 2 klasy
// 1 - logika
// 2 - render

class SearchList {
  constructor() {
    this.input = document.querySelector(".input");
    this.searchBtn = document.querySelector(".searchBtn");
    this.listWrapper = document.querySelector(".list-wrapper");
    // this.getApi();
    this.API_SEARCH = `https://api.potterdb.com/v1/characters?filter[name_cont]=`;
    this.searchBtn.addEventListener("click", this.getSearchNames.bind(this));
  }

  getSearchNames() {
    // const searchedName = "Weasley";
    const searchedName = this.input.value;
    console.log(searchedName);
    this.getApi(searchedName);
  }

  getApi(searchedName) {
    fetch(`${this.API_SEARCH}${searchedName}`)
      .then((response) => response.json())
      .then((data) => {
        const searchedList = data;
        console.log(searchedList);
        this.getListCharacters(searchedList.data);
      });
  }

  getListCharacters(searchedList) {
    searchedList.forEach((person) => {
      this.renderList(person);
      console.log(person);
    });
  }

  renderList(person) {
    const {
      id: id,
      attributes: { name },
      attributes: { image },
    } = person;

    const characterCardHtml = `
         <div class="list-card">
            <div class="card-img-wrapper">
              <img src=${image} alt="" class="list-card-img" />
            </div>
            <div class="card-title-wrapper">
              <p class="card-character-name">${name}</p>
            </div>
          </div>
    `;
    this.listWrapper.insertAdjacentHTML("beforeend", characterCardHtml);
    console.log(characterCardHtml);
  }
}

class SearchPerson {
  constructor() {}
}

const search = new SearchList();
