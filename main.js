const dropDown = document.querySelector(".generator__select-breed");

const url = `https://api.TheDogAPI.com/v1/breeds?api_key=live_VOLSWu6hteZ6nONIcIFZ3mliIcRpDIcRAkIbOAhrDdtMcSUapmJOUqK6dHtP7Oz2`
const getData = (url) => {

    fetch(url)
        .then(response => {
            if (response.status != 200) {
                throw Error("status unequal 200");
            } else return response.json();
        })
        .then((json) => {
            return getBreeds(json)
        })
        .catch((error => {
            console.log(error);

        }))
}

getData(url)

//get breeds into Select
const getBreeds = (breeds) => {
    for (const breed of breeds) {
        const option = document.createElement('option');
        option.value = breed.name;
        option.innerHTML = breed.name;
        dropDown.appendChild(option)
    }
}

const getDog = (e) => {
    e.preventDefault();
    const url = `https://api.thedogapi.com/v1/breeds/search?q=${dropDown.value}`;

    fetch(url)
        .then((response) => {
            if (response.status != 200) {
                throw Error("status unequal 200")
            } else return response.json();
        })
        .then((dog) => {
            return getImage(dog[0]);
        })
        .catch((error) => {
            console.log(error);
        })
}

 const  getImage = async (dog) => {
const url = `https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`

await fetch(url)
.then((response) => {
    if (response.status != 200) {
        throw Error("status unequal 200")
    } else return response.json()
})
.then((response) => {
    return addHtml([response[0].url, dog])
    
})
.catch((error) => {
    console.log(error);
})
}

const addHtml = (dog) => {
const list = document.querySelector(".dogs-list");
list.innerHTML = "";

const newListItem = document.createElement('li');
const img = document.createElement('img');
const title = document.createElement('h1');
const container = document.createElement('div');
const origin = document.createElement('span');
const bredFor = document.createElement('span');
const breedGroup = document.createElement('span');
const temperament = document.createElement('span');
const lifeSpan = document.createElement('span');

list.appendChild(newListItem);
newListItem.appendChild(img);
newListItem.appendChild(title);
newListItem.appendChild(container);
container.appendChild(origin);
container.appendChild(bredFor);
container.appendChild(breedGroup);
container.appendChild(temperament);
container.appendChild(lifeSpan);

const dogPicture = dog[0];
const dogInfo = dog[1];

newListItem.className = "dogs-list__dog";
img.className = "dogs-list__dog-img";
title.className= "dogs-list__dog-breed";
container.className = "dogs-list__dog-info";
origin.className = "dogs-list__dog-info-span";
bredFor.className = "dogs-list__dog-info-span";
breedGroup.className = "dogs-list__dog-info-span";
temperament.className = "dogs-list__dog-info-span";
lifeSpan.className = "dogs-list__dog-info-span";

img.src = dogPicture;
title.textContent = dogInfo.name;
origin.textContent = (dogInfo.origin ? "origin: " +dogInfo.origin : null );
bredFor.textContent = (dogInfo.bred_for ? "Bred for: " +dogInfo.bred_for : null );
breedGroup.textContent = (dogInfo.breed_group ? "Breed Group: " +dogInfo.breed_group : null );
temperament.textContent = `Temperament: ${dogInfo.temperament}`;
lifeSpan.textContent = `Life span: ${dogInfo.life_span}`;

//delete unnecessary items
const listItems = document.querySelectorAll(".dogs-list__dog-info-span");
listItems.forEach(item => {
    if(item.textContent === "") {
        item.remove()
    }
})


}
document.querySelector(".generator").addEventListener("submit", getDog);
alert("People were supposed to be here, but here are dogs. Temporary i don't want to change the repository name.")