const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollectionDiv = document.querySelector('#toy-collection')
const createNewToyForm = document.querySelector('.add-toy-form')


/* Fetch Andy's Toys */
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toysArrayJson => {
    toysArrayJson.forEach(appendToyJson)
  })


/* Add Toy Info to the Card */
function appendToyJson(json) {
  toyCollectionDiv.innerHTML += `
    <div class="card" data-id="${json.id}" >
      <h2>${json.name}</h2>
      <img class="toy-avatar" src="${json.image}">
      <p><span class="like-span" data-id="${json.id}">${json.likes}</span> Likes</p>
      <button class="like-btn" data-id="${json.id}" >Like <3</button>
    </div>
  `
}


/* Add a New Toy */
createNewToyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log(event)
  
  let newToyName = event.target.name.value
  let newToyImg = event.target.image.value
  
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ 
      name: newToyName,
      image: newToyImg,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(json => {
  appendToyJson(json)
  })
})


/* Increase Toy's Likes */

    // <div class="card" data-id="${json.id}" >
    //   <h2>${json.name}</h2>
    //   <img class="toy-avatar" src="${json.image}">
    //   <p><span class="like-span" data-id="${json.id}">${json.likes}</span> Likes</p>
    //   <button class="like-btn" data-id="${json.id}" >Like <3</button>
    // </div>

// const toyCollectionDiv = document.querySelector('#toy-collection')

toyCollectionDiv.addEventListener("click", (evt) => {
  if (evt.target.tagName === "BUTTON" && evt.target.className === "like-btn"){
    let parent = evt.target.parentElement
    let likeSpan = parent.querySelector('.like-span')
    let likeCount = parseInt(likeSpan.innerHTML)
    let id = evt.target.dataset.id
    // console.log(likeCount)

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        likes: likeCount + 1
      })
    })
    .then(res => res.json)
    .then((updatedJSON) => {
      likeSpan.innerHTML = updatedJSON.likes
    })
  }
})








addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE! 

// const likeButton = document.createElement('button')
// likeButton.className = "like-btn"
// likeButton.classList.add = "btnId"
// likeButton.innerHTML += "Like <3"