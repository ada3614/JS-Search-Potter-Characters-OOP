// 2 klasy
// 1 - logika
// 2 - render

class Search {
  constructor() {
    this.input = document.querySelector(".input");
    this.searchBtn = document.querySelector(".searchBtn");
    // this.getApi();
    this.searchBtn.addEventListener("click", this.getSearchName.bind(this));
  }
  getApi(searchedName) {
    fetch(
      `https://api.potterdb.com/v1/characters?filter[name_cont]=${searchedName}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const searchedList = data;
      });
  }
  getSearchName() {
    // const searchedName = "Weasley";
    const searchedName = this.input.value;
    // console.log(searchedName);
    // console.log(this.input.value);
    this.getApi(searchedName);
  }

  getData() {}
}

const search = new Search();
