let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getAllToys();
  const form = document.querySelector(".add-toy-form").addEventListener("submit", (event) => plusToy(event))
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
//Step 1
 function getAllToys() {
    fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => json.forEach(toy => addToys(toy)))
}
  

  //Step 2
  function addToys(toy) {
    const toyCollectionDiv = document.querySelector("#toy-collection")
    const card = document.createElement("div")
    card.classList.add('card')
    const heading = document.createElement("h2")
    heading.textContent = toy.name
    card.appendChild(heading)
    // img tag with the src of the toy's image attribute and the class name "toy-avatar"
    const img = document.createElement("img")
    img.className = "toy-avatar" 
    img.src = toy.image
    card.appendChild(img)
    // p tag with how many likes that toy has
   const p = document.createElement("p")
    p.textContent = toy.likes 
    card.appendChild(p)
  
  const btn = document.createElement("button")
  btn.addEventListener("click", (event) => trackLikes(event, toy.likes))
    btn.className = "like-btn"
    btn.id = toy.id
     card.appendChild(btn)

     toyCollectionDiv.appendChild(card)
  }


// Step 3

function plusToy(event) {
  event.preventDefault()
  const toyName = document.querySelector('[name="name"]').value
  const toyImg = document.querySelector('[name="image"]').value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }, 
    body: JSON.stringify({
     "name": toyName,
  "image": toyImg,
  "likes": 0
    })
  }) .then((resp) => {
     if (resp.ok) {
      addToys({name: toyName, image: toyImg, likes: 0})
     }
  })
}


function trackLikes(event, likes) {
  event.preventDefault()
  const newNumberOfLikes = parseInt(likes, 0) + 1
  const toyId = event.target.id

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })  .then((resp) => {
    if (resp.ok) {
      location.reload()
    }
  })
}

