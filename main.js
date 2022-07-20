const getUsers = (e) => {
    e.preventDefault();
    const selectGender = document.querySelector(".generator__select").value;
    const quantity = document.querySelector(".generator__input").value

    const url = `https://randomuser.me/api/?results=${quantity}&gender=${selectGender === "both" ? "male,female" : selectGender}`;
    
    fetch(url)
    .then(response => {
    if(response.status !== 200) {
        throw Error("status uneaqual 200");
    } else return response.json();
    })
    .then (json => {
        console.log(json.results);
        
    })
    .catch(error => {console.log(error);
    })
}


document.querySelector(".button").addEventListener("click", getUsers)