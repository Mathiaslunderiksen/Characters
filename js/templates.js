export const listview = (character) => `
  <div class="list-div">
  <p class="heading"><b>${character.name}</b></p>
  <p class="occupation"><i>Age: ${character.age}</i></p>
  <p class="occupation"><i>${character.occupation}</i></p>
  <img src="${character.image}">
  <a class="btn" href="./single.html?id=${character.id}">See more..</a>
  </div>
  `;

  export const singleview = (character) => `
  <img src="${character.image}">
  <p class="heading"><b>${character.name}</b></p>
  <p class="occupation"><i>Age: ${character.age}</i></p>
  <p class="occupation"><i>${character.occupation}</i></p>
  <p class="description">${character.description}</p>
  <a class="btn" href="./index.html">Back to list..</a>
  `;

