
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events`;

let state={
    party:[],                               //declare the state  and define the party array. the content of the party array will be rendered 
}

let l=document.querySelector("#partyList");
const m=document.querySelector("#addParty");
m.addEventListener("submit", addParty);             //create an event listener for the submit button so that new party can be added
let removeParty=null;

async function render(){
    await getParty();                       //when the rander fun. is called, it gets the details of all the party from the API and renders those info on the webpage
    renderParty();
}
render();

async function getParty(){
    try{
        let response=await fetch(API_URL);
        let partyInfo=await response.json();        //parse the response to get the json object
        state.party=partyInfo.data;                 //assigns the value of the data array received from the API to the party array which is part of the state
    }catch(error){
        console.error(error);
    }
}

function renderParty(){
    if(state.party.length===0){             //if no party is returned from the API, then displays this message
        l.innerText="No party to display";
        return;
    }
        let newarr=state.party.map((p)=>{           //take individual element of the party array from the state and render its content in the webpage
            let newli=document.createElement("li");
            newli.innerHTML=`
            <button onclick="delParty(${p.id})">Remove</button>     
            <h2>${p.name}</h2>
            <p>${p.description}</p>
            <p>${p.date}</p>
            <p>${p.location}</p>
            `;                              //adds a button beside the event name and assigns an onclick function to it which deletes that specific event whose ID is passed to the onclick function
            return newli;
        })
        l.replaceChildren(...newarr);       //clears the previous content and add new content
}

async function addParty(event) {
    event.preventDefault();
    try {
        console.log(document.querySelector("#name").value);
        let response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events", {
        method: "POST",                     //declares that it is trying to add a new party to the API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.querySelector("#name").value,        //gets the detail from the DOM about the party to be added
            description: document.querySelector("#description").value,
            date: new Date(document.getElementById("date-input").value).toISOString(),
            location:document.querySelector("#location").value,
        }),
        });
        if (!response.ok) {
        throw new Error("Failed to create artist");
        }
        render();
    } catch (error) {
        console.error(error);
    }
    }
    

    
async function delParty(idx){               //this function takes the id of a party and deletes it from the API
    try{
        await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events/${idx}`,{     
            method : "DELETE",
        }); 
    }catch(e){
        console.error(e);
    }
    render();                               //renders the webpage again to show that the party jas been removed from both the API and webpage
}

