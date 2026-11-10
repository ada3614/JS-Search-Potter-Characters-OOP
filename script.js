// 2 klasy
// 1 - logika
// 2 - render

class SearchList {
  constructor() {
    this.input = document.querySelector(".input");
    this.searchBtn = document.querySelector(".searchBtn");
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
      // this.renderList(person);
      console.log(person);
    });
  }

  renderList(person) {
    const {
      personId: id,
      external: title,
      thumb: thumbnail,
      gameID: data,
    } = person;
  }
}

class SearchPerson {
  constructor() {}
}

const search = new SearchList();
