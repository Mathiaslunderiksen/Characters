import {listview, singleview}  from "./templates.js";   
import service from "./services.js";      

const app = {} //Opretter tomt objekt

app.init = async () => {
    let listContainer = document.querySelector(".list-container");
    let singleContainer = document.querySelector(".single-container");
    const characters = await service.getCharacters();


    if(listContainer){
        characters.forEach(e => {
            listContainer.insertAdjacentHTML("beforeend", listview(e))
        });
    }

    if(singleContainer){
        let search = location.search;
        let characterID = new URLSearchParams(search).get("id");
        const foundProduct = characters.find(character => character.id == characterID);

        singleContainer.insertAdjacentHTML("beforeend", singleview(foundProduct));
    }


    /* Range */
    const input = document.querySelector("#search");

    let rangeMin = 0;
    let currentMinRange = 0;
    let currentMaxRange = 100;
    const range = document.querySelector(".range-selected");
    const rangeInput = document.querySelectorAll(".range-input input");
    const rangePrice = document.querySelectorAll(".range-price input"); 

    rangeInput.forEach((e) => {
        e.addEventListener("input", (e) => {
          currentMinRange = parseInt(rangeInput[0].value);
          currentMaxRange = parseInt(rangeInput[1].value);
          if (currentMaxRange - currentMinRange < rangeMin) {     
            if (e.target.className === "min") {
              rangeInput[0].value = currentMaxRange - rangeMin;        
            } else {
              rangeInput[1].value = currentMinRange + rangeMin;        
            }
          } else {
            rangePrice[0].value = currentMinRange;
            rangePrice[1].value = currentMaxRange;
            range.style.left = (currentMinRange / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (currentMaxRange / rangeInput[1].max) * 100 + "%";
          }

          renderResult();
        });
      });

      let radio = document.querySelectorAll("input[type='radio']");
      let currentRadio = "all";

      radio.forEach(e => {
        e.addEventListener("click", () => {
              currentRadio = e.value;
              renderResult()
   
        })
      })


      /* Search */
   

    let currentSearchTerm = "";
    let currectCategory = "name";

    const searchInput = (e) => {
        currentSearchTerm = e.target.value;
        currectCategory = document.querySelector("#category").value;
        renderResult();
    }

    input.addEventListener("input", searchInput);

    let filterBtn = document.querySelector(".fil-btn");
    let filter = document.querySelector(".filter");
    filterBtn.addEventListener("click", () => {
      filter.classList.toggle("hidden")
      
    });
    

    const renderResult = () => {
        listContainer.innerHTML = "";

        let first = characters.filter(resultCharacters => resultCharacters.age >= currentMinRange);
        
        let second = first.filter(resultCharacters => resultCharacters.age <= currentMaxRange);
       
        let third;
        if(currentRadio === "all"){
          third = second;
        } else {
          third = second.filter(resultCharacters => resultCharacters.mood === currentRadio);
        }
    
        let fourth = third.filter(character => character[currectCategory].toLowerCase().includes(currentSearchTerm.toLowerCase()));

        fourth.forEach(e => {
            listContainer.insertAdjacentHTML("beforeend", listview(e))
        });
    }

 

}

app.init();