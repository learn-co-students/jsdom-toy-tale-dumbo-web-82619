const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyCollectionDiv = document.querySelector("#toy-collection")
let newToyForm = document.querySelector(".add-toy-form")
let addToy = false
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// // OR HERE!


fetch('http://localhost:3000/toys')
.then((response) => response.json())
.then((toys) => {
  // we need to iterate over our compliments
  toys.forEach((toy) => {
    toyCollectionDiv.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    <button  class="delete-btn"> Delete</button>

    </div>`
  })
})

newToyForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let toyName = event.target.name.value
  let toyImg = event.target.image.value
  
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
        "name": toyName,
        "image": toyImg,
        "likes": 0
      })
    })
    .then(r => r.json())
    .then((toy) => {
      toyCollectionDiv.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    <button  class="delete-btn"> Delete</button>
    </div>`
    }

    )

    
  
  })

  const toyCollection = document.getElementById('toy-collection')
  
  toyCollection.addEventListener('click', event => {
    event.preventDefault()
    debugger
    



  })
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // toyCollection.addEventListener('click', function (event) {
  //   let likeButtonIsPressed = event.target.className === "like-btn"
  //   // let delButtonIsPressed = event.target.className === "delete-btn"
  //   if (likeButtonIsPressed) {
  //     let id = event.target.parentElement.dataset.id
  //     let like = event.target.previousElementSibling
  //     let likeCount = parseInt(event.target.previousElementSibling.innerText) + 1
  // fetch(`http://localhost:3000/toys/${id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         likes: likeCount
  //       })
  //     })
  //     .then(response => response.json())
  //     .then(r => {
  //       event.target.previousElementSibling.innerText = parseInt(event.target.previousElementSibling.innerText) + 1
  
  //     })
  //   }
  // })