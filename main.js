const getUsers = (e) => {
    e.preventDefault();
    const selectGender = document.querySelector(".generator__select-gender").value;
    const quantity = document.querySelector(".generator__input").value;
    const country = document.querySelector(".generator__select-country").value;

    const url = `https://randomuser.me/api/?results=${quantity}&gender=${selectGender === "both" ? "male,female" : selectGender}&nat=${country}`;


    fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw Error("status uneaqual 200");
            } else return response.json();
        })
        .then(json => {
            showUsers(json.results);

        })
        .catch(error => {
            console.log(error);
        })
}

const showUsers = (results) => {
    // console.log(results);
    const usersList = document.querySelector(".users-list");
    results.forEach(result => {
        console.log(result);
        const item = document.createElement("div");
        item.className = "user";
        name.textContent = `${result.name.title}  ${result.name.first}  ${result.name.last}`;
        item.innerHTML = `
        <img src="${result.picture.medium}" class="user__img">
         <span class="user__name">${result.name.title}  ${result.name.first}  ${result.name.last}</span>
        <span class="user__country"><i class="fa-solid fa-earth-europe"></i>${result.location.country}</span>
        <span class="user__e-mail"><i class="fa-regular fa-envelope"></i>${result.email}</span>`;
        usersList.appendChild(item);
    })

}

document.querySelector(".button").addEventListener("click", getUsers)