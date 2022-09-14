import Html_service from './Html_service.js'

export default class Dog {
    constructor() {
        this.htmlService = new Html_service;
        this.getData();
        this.buttonGetDogListener = this.htmlService.getButton().addEventListener("click", this.getDog.bind(this));
        this.htmlService.loadNextDog();
    }
    getData() {
        const url = `https://api.TheDogAPI.com/v1/breeds?api_key=live_VOLSWu6hteZ6nONIcIFZ3mliIcRpDIcRAkIbOAhrDdtMcSUapmJOUqK6dHtP7Oz2`;

        fetch(url)
            .then(response => {
                if (response.status != 200) {
                    throw Error("status unequal 200");
                } else return response.json();
            })
            .then((json) => {
                return this.getBreeds(json)
            })
            .catch((error => {
                console.log(error);

            }))
    }
    getBreeds(breeds) {
        for (const breed of breeds) {
            const dropDown = this.htmlService.getDropDown()
            const option = document.createElement('option');
            option.value = breed.name;
            option.innerHTML = breed.name;
            dropDown.appendChild(option)
        }
    }
    getDog(e) {
        e.preventDefault();
        const url = `https://api.thedogapi.com/v1/breeds/search?q=${this.htmlService.getDropDownValue()}`;

        fetch(url)
            .then((response) => {
                if (response.status != 200) {
                    throw Error("status unequal 200")
                } else return response.json();
            })
            .then((dog) => {
                return this.getDogImage(dog[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    getDogImage(dog) {
        const url = `https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`;


        fetch(url)
            .then((response) => {
                if (response.status != 200) {
                    throw Error("status unequal 200")
                } else return response.json()
            })
            .then((response) => {
                const img = new Image()
                const that = this;
                img.onload = function () {
                    that.htmlService.addContentToHtml([img, dog])

                }
                img.src = response[0].url
            })
            .catch((error) => {
                console.log(error);
            })
    }
}