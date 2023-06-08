let question = document.getElementById("question");
let answerDesc = document.getElementById("answerDesc");


// let cardDate = document.getElementById("card-date");
let AddBtn = document.getElementById("AddBtn");
let cardList = document.getElementById("card-list");
let cards = [

];
// localStorage data
let cardsOpt = JSON.parse(localStorage.getItem("card"));

showCards();

function inputElt() {
    AddBtn.disabled = (this.value === '');
}
let Id = 123;
// add to localstorage
AddBtn.addEventListener("click", () => {
    console.log(answerDesc.value);
    if (cardsOpt != null) {
        cards = cardsOpt;
    }
    if (question.value !== '' && answerDesc.value !== '') {
        cards.push(
            {
                id: Id++,
                question: question.value,
                answerDesc:answerDesc.value
            }
        )
    } else {
        alert("Empty input")
    }

    localStorage.setItem("card", JSON.stringify(cards));
    question.value = "";
    answerDesc.value= "";
    showCards();
});


// show to the frontend
function showCards() {
    if (cardsOpt != null) {
        cards = cardsOpt;
    }
    let html = "";
    cards.forEach((card, index) => {
        // <input class="cardInput mx-2 ${index}" readonly id="${card.id}"  value='${card.title}  '>
        html += `
        <div class="card d-flex flex-column mt-4">
        <div class="card-inner  " id="card${index}">
         <div class=" card-face card-inner-front">
           <div class="cardInput mx-2"> <h3 class=" card-question " id="${card.id}">${card.question}</h3></div>
   
           <div class="card-button">
           <button class=" deleteBtn mx-2 btn btn-primary" onclick="deleteCard(${index})"><i class='bx bx-check' style='color:#ffffff !important;'  ></i></button>
           <button class=" flipBtn mx-2 btn btn-primary"  onclick="flipCard(${index})" ><i class='bx bx-transfer-alt'></i></button>
           </div>
         </div>

         <div class="card-face card-inner-back">
             <div class="cardInput mx-2">
               <p class=" card-answerDesc">${card.answerDesc}</p>
                </div>
           <div class="card-button">
           <button class=" deleteBtn mx-2 btn btn-primary" onclick="deleteCard(${index})"><i class='bx bx-check' style='color:#ffffff !important;'  ></i></button>
            <button class=" flipBtn mx-2 btn btn-primary"  onclick="flipCard(${index})"   ><i class='bx bx-transfer-alt'></i></button>
         
           </div>
         </div>
        </div>
   </div>
  `
    })
    if (cardList.length != 0) {
        cardList.innerHTML = html;
    }

}

// delete card
function deleteCard(index) {
    if (cardsOpt != null) {
        cards = cardsOpt;
    }
    cards.splice(index, 1);
    localStorage.setItem("card", JSON.stringify(cards));
    showCards();
}


// flip card
function flipCard(index){
    let cardInner= document.getElementById(`card${index}`);
  
        cardInner.classList.toggle("isFlipper")
  
   
}
