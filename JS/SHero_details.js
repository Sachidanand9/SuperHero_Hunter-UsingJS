const heroName = document.getElementById("hero-name");
const img = document.getElementById("img");
// const powertats = document.getElementById("powerstats");
const bio = document.getElementById("bio");


//Cal The Updtae UI Method when the window is Loaded

window.onload = ()=>{
    let windowUrl = window.location.href;
    let id = windowUrl.substring(windowUrl.lastIndexOf('=')+1);
    updateUI(id);
}

//Update UI from Fetched Data
 updateUI = async(id) =>{
    let url = `https://superheroapi.com/api.php/327585716223890/${id}`
    let data = await fetchAsync(url);
    console.log(data.name);
    if(data && data.response == 'success'){
        heroName.innerHTML = data["name"];
        img.src = data["image"]["url"];
        document.getElementById("intelligence").appendChild(document.createTextNode(`Intelligence: ${data["powerstats"]["intelligence"]}`));
        document.getElementById("strength").appendChild(document.createTextNode(`Strength: ${data["powerstats"]["strength"]}`));
        document.getElementById("speed").appendChild(document.createTextNode(`Speed: ${data["powerstats"]["speed"]}`));
        document.getElementById("durability").appendChild(document.createTextNode(`Durability: ${data["powerstats"]["durability"]}`));
        document.getElementById("power").appendChild(document.createTextNode(`Power: ${data["powerstats"]["power"]}`));
        document.getElementById("combat").appendChild(document.createTextNode(`Combat: ${data["powerstats"]["combat"]}`));
    
        document.getElementById("full-name").appendChild(document.createTextNode(`Full Name: ${data["biography"]["full-name"]}`));
        document.getElementById("alter-egos").appendChild(document.createTextNode(`Alter egos: ${data["biography"]["alter-egos"]}`));
        document.getElementById("aliases").appendChild(document.createTextNode(`Aliases: ${data["biography"]["aliases"].toString()}`));
        document.getElementById("place-of-birth").appendChild(document.createTextNode(`Place of birth: ${data["biography"]["place-of-birth"]}`));
        document.getElementById("first-appearance").appendChild(document.createTextNode(`First appearance: ${data["biography"]["first-appearance"]}`));
        document.getElementById("publisher").appendChild(document.createTextNode(`Publisher: ${data["biography"]["publisher"]}`));
        document.getElementById("alignment").appendChild(document.createTextNode(`Alignment: ${data["biography"]["alignment"]}`));
      }
    }

    //Fetch Data from API

    fetchAsync = async(url) =>{
        try {
            let response = await fetch(url);
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }