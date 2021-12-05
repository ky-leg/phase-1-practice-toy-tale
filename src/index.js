let addToy = false;
const toyURL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
loadToys();
addNewToy();
});

// Add toy function

function addNewToy(){
  const toyForm = document.querySelector('form')
  toyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const toyName = toyForm[0]
  const toyImg = toyForm[1]
  const newToy = {
    name: toyName,
    image: toyImg,
    likes: 0
  }
  fetch(toyURL, {
    method: 'POST',
    headers: 
{
"Content-Type": "application/json",
Accept: "application/json"
},

body: JSON.stringify({
"name": `${toyName.value}`,
"image": `${toyImg.value}`,
"likes": 0
})
  })
  loadNewestToy(newToy)
})

}

// Fetch Toy Function

function loadToys(){
  fetch(toyURL)
  .then((resp) => resp.json())
  .then((json) => addToDOM(json))
}

function addToDOM(toys){
  const divToy = document.getElementById('toy-collection');
  toys.forEach(toys => {
    const divCard = document.createElement('div')
    divCard.className = 'card'
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    h2.append(toys.name);
    img.src = `${toys.image}`;
    img.className = 'toy-avatar';
    p.append(toys.likes);
    btn.className = 'like-btn';
    btn.id = `${toys.id}`;
    btn.append('Like');
    btn.addEventListener('click', e => addLike(e))
    divCard.appendChild(h2);
    divCard.appendChild(img);
    divCard.appendChild(p);
    divCard.appendChild(btn);
    divToy.appendChild(divCard)

    function addLike(e) {
      console.log(e.target.id)
      const newLikes = parseInt(p.innerText) + 1 
      p.innerText = newLikes
      console.log(newLikes)
      fetch(`${toyURL}/${e.target.id}`, {
        method: 'PATCH', 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": `${newLikes}`
      })
        })
  }})}


//load one toy

function loadNewestToy(toys){
  const divToy = document.getElementById('toy-collection');
  const divCard = document.createElement('div')
  divCard.className = 'card'
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const btn = document.createElement('button');
  h2.append(toys.name.value);
  img.src = `${toys.image.value}`;
  img.className = 'toy-avatar';
  p.append(toys.likes);
  btn.className = 'like-btn';
  btn.id = `${toys.id}`;
  btn.append('Like');
  divCard.appendChild(h2);
  divCard.appendChild(img);
  divCard.appendChild(p);
  divCard.appendChild(btn);
  divToy.appendChild(divCard)

  
}

