// const createMovieDirectorChange=()=>{
//     const dropdown = document.getElementById("createMovieDirector");
//     const selectedValue = dropdown.value;

// }

const displayForm=()=>{
    document.getElementById("formContainer").style.display="flex";
    console.log(document.getElementById("formContainer"));
}

const closeCreateMovie=()=>{
    document.getElementById("formContainer").style.display="none";

}

const addDirector=(directorID)=>{
    const directorSelector=document.getElementById("createMovieDirector");
    const people=JSON.parse(directorSelector.getAttribute("data-people"));
    const directorName=people.find(person=>person.id===(+directorID)).name;
    let directorDiv=document.createElement("div");

    let displayDirectorDiv=document.createElement("div");
    let directorNameDiv=document.createElement("div");
    directorNameDiv.innerText=directorName;
    directorNameDiv.style.display="inline-block";

    let deleteDirector=document.createElement("button");
    deleteDirector.innerText="X";
    deleteDirector.onclick=()=>{
        directorDiv.parentNode.removeChild(directorDiv);
    }

    displayDirectorDiv.appendChild(directorNameDiv);
    displayDirectorDiv.appendChild(deleteDirector);
    directorDiv.appendChild(displayDirectorDiv);

    let directorInput=document.createElement("input");
    directorInput.type="hidden";
    directorInput.value=+(directorID);
    directorInput.setAttribute("name","movieDirector[]");
    directorDiv.appendChild(directorInput);

    const selectedDirector=document.getElementById("selectedDirector");
    selectedDirector.appendChild(directorDiv);

}

const addActor=(actorID)=>{

    const actorSelector=document.getElementById("createMovieActor");
    const people=JSON.parse(actorSelector.getAttribute("data-people"));
    const actorName=people.find(person=>person.id===(+actorID)).name;
    let actorDiv=document.createElement("div");

    let displayActorDiv=document.createElement("div");
    let actorNameDiv=document.createElement("div");
    actorNameDiv.innerText=actorName;
    actorNameDiv.style.display="inline-block";

    let deleteActor=document.createElement("button");
    deleteActor.innerText="X";
    deleteActor.onclick=()=>{
        actorDiv.parentNode.removeChild(actorDiv);
    }

    displayActorDiv.appendChild(actorNameDiv);
    displayActorDiv.appendChild(deleteActor);
    actorDiv.appendChild(displayActorDiv);

    let actorInput=document.createElement("input");
    actorInput.type="hidden";
    actorInput.value=+(actorID);
    actorInput.setAttribute("name","movieActor[]");
    actorDiv.appendChild(actorInput);

    const selectedActor=document.getElementById("selectedActor");
    selectedActor.appendChild(actorDiv);

}