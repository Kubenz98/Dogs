export default class Html_service {
    constructor() {
        this.dropDown = document.querySelector(".generator__select-breed");
        this.button = document.querySelector(".button");
        this.loader = document.querySelector(".dogs-list__lds-roller");
        this.list = document.querySelector(".dogs-list");
    }
    getDropDown() {
        return this.dropDown;
    }
    getDropDownValue() {
        return this.dropDown.value;
    }
    getButton() {
        return this.button;
    }
    getSpans() {
        const spans = document.querySelectorAll(".dogs-list__dog-info-span");
        return spans;
    }
    addContentToHtml(dog) {
        const img = dog[0];
        const dogInfo = dog[1];

        this.loader.classList.add("dogs-list__lds-roller-disabled");
        const newListItem = document.createElement('li');
        const title = document.createElement('h1');
        const container = document.createElement('div');
        const origin = document.createElement('span');
        const bredFor = document.createElement('span');
        const breedGroup = document.createElement('span');
        const temperament = document.createElement('span');
        const lifeSpan = document.createElement('span');

        this.list.appendChild(newListItem);
        newListItem.appendChild(img);
        newListItem.appendChild(title);
        newListItem.appendChild(container);
        container.appendChild(origin);
        container.appendChild(bredFor);
        container.appendChild(breedGroup);
        container.appendChild(temperament);
        container.appendChild(lifeSpan);

        newListItem.className = "dogs-list__dog";
        img.className = "dogs-list__dog-img";
        title.className = "dogs-list__dog-breed";
        container.className = "dogs-list__dog-info";
        origin.className = "dogs-list__dog-info-span";
        bredFor.className = "dogs-list__dog-info-span";
        breedGroup.className = "dogs-list__dog-info-span";
        temperament.className = "dogs-list__dog-info-span";
        lifeSpan.className = "dogs-list__dog-info-span";

        title.textContent = dogInfo.name;
        origin.textContent = (dogInfo.origin ? "Origin: " + dogInfo.origin : null);
        bredFor.textContent = (dogInfo.bred_for ? "Bred for: " + dogInfo.bred_for : null);
        breedGroup.textContent = (dogInfo.breed_group ? "Breed Group: " + dogInfo.breed_group : null);
        temperament.textContent = `Temperament: ${dogInfo.temperament}`;
        lifeSpan.textContent = `Life span: ${dogInfo.life_span}`;

        //delete unnecessary spans
        const spans = this.getSpans();
        this.deleteSpans(spans);
    }

    loadNextDog() {
        this.button.addEventListener("click", () => {
            if (this.list.querySelector("li") !== null) {
                this.list.querySelector("li").remove()
            }
            this.loader.classList.remove("dogs-list__lds-roller-disabled");
        })
    }
        deleteSpans(spans){
                    spans.forEach(item => {
                if (item.textContent === "") {
                    item.remove();
                }
        })
    }
}