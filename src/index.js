let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const toyCollection = document.querySelector("#toy-collection")
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const addNewToyForm = document.querySelector(".add-toy-form")
  // console.log(addNewToyForm)

//Start of Event Listner onForm
  addNewToyForm.addEventListener("submit",(evt) => {
   evt.preventDefault()

   let newToyName = evt.target.name.value
   let newToyImg = evt.target.image.value

   fetch("http://localhost:3000/toys" , {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    } ,
    body: JSON.stringify({
      name: newToyName,
      image: newToyImg,
      likes: 0
    })
   })
   .then(r => r.json())
   .then((newToy) => {
    createAToyCard(newToy)

    evt.target.reset()
   })
  })
//End of Event Listner onForm


//Start of Event Listner addbtn 
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
//End of Event Listener addbtn


//Start of Fetch - Create Toy
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then((toysArray) => {
    toysArray.forEach((toy) => {
      createAToyCard(toy)
      
    })
  })
//End of Fetch - Create Toy
  
  

//Start of Callback Function Create Toy
  function createAToyCard(toy){
    const toyCard = document.createElement("div")
    toyCard.setAttribute('class','card')
    const h2 = document.createElement("h2")
    h2.innerText = toy.name
    const img = document.createElement("img")
    img.setAttribute('class',"toy-avatar")
    img.src = toy.image
    const p = document.createElement("p")
    p.innerText = `${toy.likes} Likes`
    const likeBtn = document.createElement("button")
    likeBtn.innerText = "Like <3"
    likeBtn.setAttribute('class','like-btn')
    likeBtn.dataset.id = toy.id

    const deletebtn = document.createElement("button")
    deletebtn.innerText = "Delete Toy"
    deletebtn.dataset.id = toy.id



    toyCard.append(h2, img, p, likeBtn,deletebtn) //<-- lines 20-23 in one line
    // toyCard.appendChild(h2)
    // toyCard.appendChild(img)
    // toyCard.appendChild(p)
    // toyCard.appendChild(btn)
    toyCollection.append(toyCard)
    
//End of Callback Function Create Toy



    //Start of Event Listener on likeButton
    likeBtn.addEventListener("click", (evt) => {
    /*once there is a click we want to send a fetch request to update the like to display +1*/
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
           "accept": "application/json"
        },
        body: JSON.stringify({
          likes: ++ toy.likes
        })
      })
      .then(r => r.json())
      .then((updatedLike) => {
        p.innerText = `${toy.likes} Likes`  // <-- be sure to pass in the attr you want to show inside of the paragraph, toy.id wouldnt make sense but toy.likes is an attr we wanna see
      })
      //End of Event Listener on likeButton


      
    })
    
    
    
    //Start delete a toy 
    deletebtn.addEventListener("click",() => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE"
        
      })
      .then(r => r.json)
      .then((res) => {
        toyCard.remove()
      })
    })
         //End delete a toy
  }




})
