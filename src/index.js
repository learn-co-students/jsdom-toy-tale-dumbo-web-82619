const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
// console.log(addToyForm);
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


 fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then(toysArray => {
console.log(toysArray)
    toysArray.forEach(toy => { 
      createToyCard(toy)
    })
  })


  toyCollection.addEventListener('click', (e) => {
    if(e.target.className === 'like-btn'){
      let toyId = parseInt(e.target.dataset.id)
      let newLike = parseInt(e.target.previousElementSibling.innerText) + 1
      let element = e.target.previousElementSibling
      increaseLikes(toyId, element, newLike)

    }
})

    function increaseLikes(toy, element, newLike){
  
    fetch(`http://localhost:3000/toys/${toy}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newLike
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    element.innerText = toy.likes
  })

}

  function createToyCard(toy){
    toyCollection.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes}</p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
    </div>`
  
  }

  addToyForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    let newName = e.target.name.value
    let newImg = e.target.image.value

    fetch('http://localhost:3000/toys',{
      method:'POST',
      headers:{
      'content-type': 'application/json',
      'Accept': 'application/json'
      },

      body: JSON.stringify({
        name: newName,
        image: newImg,
        likes: 0
      })
    })
      .then(r => r.json())
      .then(toy => {
        createToyCard(toy)
      })
  })





  // function increaseLike()
   
// OR HERE!

// THREE PILLARS
// When X event happens (Event Listeners)
// I want to do Y fetch (getting/sending of information)
// and then slap Z on and (off) the DOM (Changing how our website looks)



// OTHA REVIEW
// Mise en place - everything in it's place 



