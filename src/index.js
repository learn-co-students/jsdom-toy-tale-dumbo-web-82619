const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyCollection = document.querySelector("#toy-collection")
let addToy = false
let jsonify = ((res) => res.json())
fetch("http://localhost:3000/toys")
  .then(jsonify)
  .then((toyArr) => {
    toyArr.forEach((toy) => {
      toyCollection.append(toyCard(toy))
    })
  })


let actualToyForm = document.querySelector(".add-toy-form")

actualToyForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let toyName = evt.target.name.value
  let toyImg = evt.target.image.value

  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": toyName,
      "image": toyImg,
      "likes": 0
    })
  })
  .then(jsonify)
  .then((newToy) => {
    toyCollection.append(toyCard(newToy))
  })



})
function toyCard(toy){
  let cardDiv = document.createElement("div")
  let cardH2 = document.createElement("h2")
  let cardImg = document.createElement("img")
  let cardP = document.createElement("p")
  let cardButton = document.createElement("button")

  cardDiv.className = "card"
  cardDiv.dataset.id = toy.id
  cardH2.innerText = toy.name 
  cardImg.src = toy.image
  cardImg.className = "toy-avatar"
  cardP.innerText = `${toy.likes} Likes`
  cardButton.className = "like-btn"
  cardButton.innerText = "Like <3"
  cardButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    toy.likes = toy.likes + 1
    debugger
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json", "accept": "application/json"},
      body: JSON.stringify({ likes: toy.likes})
    })
    .then(jsonify)
    .then( (toy) => {
      cardP.innerText = toy.likes
    })
  })

  cardDiv.append( cardH2, cardImg, cardP, cardButton )
  return cardDiv
}

// toyCollection.addEventListener("click", (evt) => {
//   evt.preventDefault()
//  debugger
//   if (evt.target.tagName === "BUTTON"){
//     let likes = parseInt(evt.target.previousElementSibling.innerText) + 1
//     let toyId = evt.target.dataset.id

//     fetch(`http://localhost:3000/toys/${toyId}`, {
//       method: "PATCH",
//       headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         likes: likes
//       })
//     })
//     .then(jsonify)
//     .then( (toy) => {
//       evt.target.parentElement.querySelector("p").innerText = toy.likes
//     })
//   }
// })

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  }
  else {
    toyForm.style.display = 'none'
  }
})


