class PotterApi {
  constructor() {
    this.API_SEARCH = `https://api.potterdb.com/v1/characters?filter[name_cont]=`;
    this.API_CHARACTER = `https://api.potterdb.com/v1/characters/`;
  }

  async getList(keyword) {
    // const keyword = keyword;
    const response = await fetch(`${this.API_SEARCH}${keyword}`);
    const data = await response.json();
    const searchedList = data.data;
    // console.log(searchedList);
    return searchedList;
  }

  async getClickedCharacterInfo(id) {
    const response = await fetch(`${this.API_CHARACTER}{${id}}`);
    const data = await response.json();
    const characterDetails = data.data;
    console.log(characterDetails);
    return characterDetails;
  }
}

class PotterDatabase {
  constructor(api, list) {
    this.api = api;
    this.list = list;

    this.input = document.querySelector(".input");
    this.searchBtn = document.querySelector(".searchBtn");

    this.searchBtn.addEventListener("click", this.getKeyword.bind(this));
    this.input.addEventListener("keydown", this.searchKeydown.bind(this));
    this.list.listWrapper.addEventListener(
      "click",
      this.getClickedCharacter.bind(this),
    );
  }
  async getKeyword() {
    // const searchedName = "Weasley";
    // console.log(this.api);
    // this.api.getList(keyword);
    // this.getApi(keyword);
    const keyword = this.input.value;
    // console.log(keyword);
    const searchedList = await this.api.getList(keyword);
    this.list.getListCharacters(searchedList);
    // console.log(searchedList);

    // this.getListCharacters(searchedList);
  }
  searchKeydown(e) {
    if (e.key == "Enter") {
      // console.log("działa");
      // console.log(e);
      this.getKeyword(this.input);
    }
  }

  getListCharacters(searchedList) {
    searchedList.forEach((person) => {
      this.renderList(person);
      // console.log(person);
    });
  }

  getClickedCharacter(e) {
    const clickedCard = e.target.closest(".list-card");
    if (clickedCard) {
      console.log("działa");
      // console.log(clickedCard.dataset.characterid);
      const id = clickedCard.dataset.characterid;
      console.log(id);
      this.getId(id);
    }
  }
  getId(id) {
    this.api.getClickedCharacterInfo(id);
  }
}

class RenderList {
  constructor() {
    this.listWrapper = document.querySelector(".list-wrapper");
  }
  getListCharacters(searchedList) {
    searchedList.forEach((person) => {
      this.renderList(person);
      // console.log(person);
    });
  }
  renderList(person) {
    const {
      id: id,
      attributes: { name },
      attributes: { image },
    } = person;

    const characterCardHtml = `
         <div class="list-card" data-characterid=${id}>
            <div class="card-img-wrapper">
              <img src=${image ? image : "./img/placegolder.png"} alt="" class="list-card-img" />
            </div>
            <div class="card-title-wrapper">
              <p class="card-character-name">${name}</p>
            </div>
          </div>
    `;
    this.listWrapper.insertAdjacentHTML("beforeend", characterCardHtml);
    // console.log(characterCardHtml);
    // console.log(this.listWrapper);
  }

  renderCharacterDetails(person) {
    const {
      id: id,
      attributes: { name },
      attributes: { image },
    } = person;
    console.log(person);
  }
}
const api = new PotterApi();
const list = new RenderList();
const app = new PotterDatabase(api, list);

//  ------------------------------------------------------------------
// class SearchList {
//   constructor() {
//     this.input = document.querySelector(".input");
//     this.searchBtn = document.querySelector(".searchBtn");
//     this.listWrapper = document.querySelector(".list-wrapper");
//     // this.getApi();
//     this.API_SEARCH = `https://api.potterdb.com/v1/characters?filter[name_cont]=`;
//     this.searchBtn.addEventListener("click", this.getSearchNames.bind(this));
//     this.input.addEventListener("keydown", this.searchKeydown.bind(this));
//   }

//   searchKeydown(e) {
//     if (e.key == "Enter") {
//       // console.log("działa");
//       // console.log(e);
//       this.getSearchNames(this.input);
//     }
//   }

//   getSearchNames() {
//     // const searchedName = "Weasley";
//     const searchedName = this.input.value;
//     console.log(searchedName);
//     this.getApi(searchedName);
//   }

//   getApi(searchedName) {
//     fetch(`${this.API_SEARCH}${searchedName}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const searchedList = data;
//         console.log(searchedList);
//         this.getListCharacters(searchedList.data);
//       });
//   }

//   getListCharacters(searchedList) {
//     searchedList.forEach((person) => {
//       this.renderList(person);
//       console.log(person);
//     });
//   }

//   renderList(person) {
//     const {
//       id: id,
//       attributes: { name },
//       attributes: { image },
//     } = person;

//     const characterCardHtml = `
//          <div class="list-card" data-characterid=${id}>
//             <div class="card-img-wrapper">
//               <img src=${image ? image : "./img/placegolder.png"} alt="" class="list-card-img" />
//             </div>
//             <div class="card-title-wrapper">
//               <p class="card-character-name">${name}</p>
//             </div>
//           </div>
//     `;
//     this.listWrapper.insertAdjacentHTML("beforeend", characterCardHtml);
//     // console.log(characterCardHtml);
//     console.log(this.listWrapper);
//   }
// }

// class ShowPerson {
//   constructor(list) {
//     this.list = list;
//     this.API_CHARACTER = `https://api.potterdb.com/v1/characters/`;
//   }
// }

// const character = new ShowPerson();
// const search = new SearchList();
