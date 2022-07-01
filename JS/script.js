const url = 'https://superheroapi.com/api.php/327585716223890';
const searchBox = document.getElementById('search');
const searchResultsContainer = document.getElementById('search-results-list');

//Load Event Listeners
loadEventListeners(); 
function loadEventListeners(){
  searchBox.addEventListener('keyup', handleSearch);
}

//When A User Clicks Enter in the Search Bar
 handleEnter = async(name) => {
    let data = await fetchAsync(`${url}/search/${name}`);
    // redirect to super hero page if success
    if(data.response === 'success'){
      console.log(data);
      let path = `${window.location.pathname} + /../hero_drtails.html#id=${data.results[0].id}`;
      window.open(path);  
    }
  }

//Handle Search
 async function handleSearch(e){
    //Trim the Query Name
    let name = e.target.value.trim();
    //Check if User Hit Enter in Search Bar
    if(e.keyCode === 13 && name.length > 0){
        handleEnter(name);
    }
    if(name.length == 0){
        await clearResults();
    }else{
        //Fetch The Results
        let data = await fetchAsync(`${url}/search/${name}`);
        if(data && data.response === 'success'){
            searchResultsContainer.innerHTML = "";

            let favs = getFavourite();
            //Create a List Of Elements for Search Results and Add Event Listeners
            for(let i = 0; i < data.results.length; i++){
                let item = document.createElement('div');
                item.className = "search-item";
                item.setAttribute('id', `${data.results[i].id}`);
        
                let label = document.createElement('div');
                label.innerHTML = data.results[i].name;
                label.addEventListener('click', viewHeroPage);
                item.appendChild(label);
        
                let option = document.createElement('div');
                if(favs.includes(data.results[i].id)){
                  option.innerHTML = "Remove from favourites";
                  option.addEventListener('click', removeFromFavourites);  
                }
                else{
                  option.innerHTML = "Add to favourites";
                  option.addEventListener('click', addToFavourites);  
                }
                item.appendChild(option);
        
                searchResultsContainer.appendChild(item);
              }
            }
            else{
              await clearResults();
            }
          }
        }

// Fetch Results From API
 fetchAsync = async (url) => {
    try{
      let response = await fetch(url);
      let data = await response.json();
      console.log('DATA'.data);
      return data;  
    }catch(err){
      await clearResults();
    }
  }  

//Clear Search Results
 clearResults = async() => {
    let i = searchResultsContainer.childNodes.length;
    while(i--){
      searchResultsContainer.removeChild(searchResultsContainer.lastChild);
    }
  } 

// Redirect to a Super Hero Page with Respective Id
viewHeroPage = async(e) =>{
    let path = `${window.location.pathname} + /../hero_details.html#id=${e.target.parentElement.id}`;
    window.open(path);
  }

// Add a Hero to Favourites
addToFavourites = async(e) => {
    let id = e.target.parentElement.id;
    let favs = getFavourite();
    if(!favs.includes(id)){
      favs.push(id);
    }
    localStorage.setItem('fav_heros', JSON.stringify(favs));
    e.target.innerHTML = 'Remove from favourites';
    e.target.removeEventListener('click', addToFavourites);
    e.target.addEventListener('click', removeFromFavourites);
  }
  
// Remove a Fero From Favourites
 removeFromFavourites = async(e) =>{
    let id = e.target.parentElement.id;
    let favs = getFavourite();
  
    let updatedFavs = favs.filter(function(val){
      return val != id;
    })
    localStorage.setItem('fav_heros', JSON.stringify(updatedFavs));
    e.target.innerHTML = 'Add to favourites';
    e.target.removeEventListener('click', removeFromFavourites);
    e.target.addEventListener('click', addToFavourites);
  }
  

// Retrive a List of Favourites hero ID's From Local Storage
 getFavourite = () => {
    let favs;
    if(localStorage.getItem('fav_heros') === null){
      favs = [];
    }
    else{
      favs = JSON.parse(localStorage.getItem('fav_heros'));
    }
    return favs; 
  }

