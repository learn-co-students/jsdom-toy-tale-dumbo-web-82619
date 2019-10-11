// selection variables \\

let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysDiv = document.querySelector('#toy-collection')
const createNewToyForm = document.querySelector('.add-toy-form')



// helper functions \\

function appendToyJsonToToysDiv(json) {
  let divCard = document.createElement('div')
    divCard.className = 'card'
    let h2 = document.createElement('h2')
      h2.innerText = json.name
    let img = document.createElement('img')
      img.className = 'toy-avatar'
      img.src = json.image
    let p = document.createElement('p')
      let span = document.createElement('span')
      span.className = 'likesCountSpan'
      span.innerText = `${json.likes} Likes`
      p.append(span)
    let button = document.createElement('button')
      button.className = 'like-btn'
      button.setAttribute('data-id', json.id)
      button.innerText = 'Like ❤'
  divCard.append(h2, img, p, button)
  toysDiv.append(divCard)
}

// innerHTML version of appendToyJsonToToysDiv \\

// function appendToyJsonToToysDiv(json) {
//   toysDiv.innerHTML +=
//   `<div class="card">
//     <h2>${json.name}</h2>
//     <img class="toy-avatar" src="${json.image}">
//     <p><span class="likesCountSpan">${json.likes}</span> Likes</p>
//     <button class="like-btn" data-id="${json.id}" >Like <3</button>
//   </div>`
// }


// on-load fetches \\

fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toysArrayJson => {
  toysArrayJson.forEach(appendToyJsonToToysDiv)
})



// event listeners \\

createNewToyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  
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
  .then(newToyJson => {
    appendToyJsonToToysDiv(newToyJson)
  })
})


toysDiv.addEventListener('click', (event) => {
  console.log(event.target.dataset)
  if (event.target.className === 'like-btn') {
    let targetToyCard = event.target.parentElement
    let toyCardLikesSpan = targetToyCard.querySelector('.likesCountSpan')
    let toyCardLikes = toyCardLikesSpan.innerText
    let id = event.target.dataset.id
    
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        likes: parseInt(toyCardLikes) + 1
      })
    })
    .then(response => response.json())
    .then(updatedToyJson => {
      toyCardLikesSpan.innerText = `${updatedToyJson.likes} Likes`
    })
  }
})


addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})