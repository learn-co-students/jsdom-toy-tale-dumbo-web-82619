const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const form = toyForm.querySelector("form")
let addToy = false

const toyContainer = document.querySelector('#toy-collection')


fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(rJSON => {
  rJSON.forEach(addToyToDOM)
  })

function addToyToDOM(Obj){
  let toyDiv = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let btn = document.createElement('button')
  
  toyDiv.className = "card"
  toyDiv.id = `toy-${Obj.id}`
  toyContainer.append(toyDiv)

  h2.innerText = Obj.name

  img.src = Obj.image
  img.className = 'toy-avatar'

  let span = document.c
  p.innerText = `${Obj.likes} Likes`
  p.dataset.id = `${Obj.id}`
  p.className = `display-likes-${Obj.id}`
  p.value = `${Obj.likes}`

  btn.className = 'like-btn'
  btn.innerText = 'Like <3'
  btn.dataset.id = `${Obj.id}`

  toyDiv.append(h2, img, p, btn)
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

form.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let toyName = evt.target.name.value
  let toyImg = evt.target.image.value
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImg,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(addToyToDOM)
})

toyContainer.addEventListener("click", (evt) => {
  if (evt.target.className === 'like-btn'){
    let id = evt.target.dataset.id
    let likes = document.querySelector(`p.display-likes-${id}`)
    let newLikes = parseInt(likes.value) + 1
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
    .then(res => res.json())
    .then(resJSON => {
      console.log(resJSON)
      console.log(resJSON)
      console.log(document.querySelector(`p.display-likes-${id}`))
      console.log(resJSON.likes)
      document.querySelector(`p.display-likes-${id}`).value = `${resJSON.likes}`
      document.querySelector(`p.display-likes-${id}`).innerText = `${resJSON.likes} Likes`
    })
  }
})

