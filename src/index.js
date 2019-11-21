let addToy = false



document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let toyCollection = document.querySelector("#toy-collection")
// console.log(toyCollection);

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(actualResponse => 
    actualResponse.forEach((toy) => {
      addToyImgToDiv(toy); 
    })
    )


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      let createForm = document.querySelector(".add-toy-form")
      createForm.addEventListener("submit", (evt) => {
          evt.preventDefault()
         let toyName = (evt.target.name.value)
         let toyImage = (evt.target.image.value)

          //fetch to POST new toy to db.json

          fetch("http://localhost:3000/toys", {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
              "Accept" : "application/json"
            },
             
            body: JSON.stringify({
              "name": toyName,
              "image": toyImage,
              "likes": 0
            })
          }).then(resp => resp.json())
          .then((newToy) => {
            addToyImgToDiv(newToy)
            evt.target.reset()
          })

         })
        }
          else {
      toyForm.style.display = 'none'
    }
  })

  //Create new toy

  


  function addToyImgToDiv(toy) {
    //Razzmazz
    
    let imgDiv = document.createElement("div")
    imgDiv.setAttribute("class" ,"card")
    imgDiv.innerHTML =`<h2>${toy.name}</h2>
    <img src= ${toy.image} class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn-${toy.id}">Like <3</button>`
    toyCollection.append(imgDiv)
    
    
    let likeButton = document.querySelector(`.like-btn-${toy.id}`)
  
    likeButton.addEventListener("click" , (evt) => {
      console.log(evt.target)
      
    })
    
  }


})


