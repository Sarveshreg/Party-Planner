
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events`;

let state={
    party:[],
}

let l=document.querySelector("#partyList");
const m=document.querySelector("#addParty");
m.addEventListener("submit", addParty);
let removeParty=null;





async function render(){
    await getParty();
    renderParty();
}
render();

async function getParty(){
    try{
        let response=await fetch(API_URL);
        let a=await response.json();
        state.party=a.data;
    }catch(error){
        console.error(error);
    }
}

function renderParty(){
    if(state.party.length===0){
        l.innerText="No party to display";
        return;
    }
        let newarr=state.party.map((p)=>{
            let newli=document.createElement("li");
            newli.innerHTML=`
            <button class="remove">Remove</button>
            <h2>${p.name}</h2>
            <p>${p.description}</p>
            <p>${p.date}</p>
            <p>${p.location}</p>
            `;
            return newli;
        })
        l.replaceChildren(...newarr);
}

async function addParty(event) {
    event.preventDefault();
    try {
        console.log(document.querySelector("#name").value);
        let response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.querySelector("#name").value,
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
    
    document.querySelectorAll("button").addEventListener("click",function removePartyFunction(){
        console.log("removed is pressed");
    })
    


