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
    console.log(directorSelector.getAttribute("data-people"));
    const people=JSON.parse(directorSelector.getAttribute("data-people"));
    const directorName=people.find(person=>person.id===(+directorID)).name;
    console.log(directorName);
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