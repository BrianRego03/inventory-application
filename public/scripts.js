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
let directorIDArray=[];
const addDirector=(directorID)=>{
    if (directorIDArray.find(director => director === directorID)) {
        return;
    }
    directorIDArray.push(directorID);
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
let actorIDArray=[];
const addActor=(actorID)=>{
    if (actorIDArray.find(actor => actor === actorID)) {
        return;
    }
    actorIDArray.push(actorID);

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
let genreIDArray=[];
const addGenre=(genreID)=>{
    if(genreIDArray.find(genre=>genre===genreID)){
        return;
    }
    genreIDArray.push(genreID);
    
    const genreSelector=document.getElementById("createMovieGenre");
    const genres=JSON.parse(genreSelector.getAttribute("data-genre"));
    const genreName=genres.find(genre=>genre.id===(+genreID)).name;
    let genreDiv=document.createElement("div");

    let displayGenreDiv=document.createElement("div");
    let genreNameDiv=document.createElement("div");
    genreNameDiv.innerText=genreName;
    genreNameDiv.style.display="inline-block";

    let deleteGenre=document.createElement("button");
    deleteGenre.innerText="X";
    deleteGenre.onclick=()=>{
        genreDiv.parentNode.removeChild(genreDiv);
    }

    displayGenreDiv.appendChild(genreNameDiv);
    displayGenreDiv.appendChild(deleteGenre);
    genreDiv.appendChild(displayGenreDiv);

    let genreInput=document.createElement("input");
    genreInput.type="hidden";
    genreInput.value=+(genreID);
    genreInput.setAttribute("name","movieGenre[]");
    genreDiv.appendChild(genreInput);

    const selectedGenre=document.getElementById("selectedGenre");
    selectedGenre.appendChild(genreDiv);

}


const displayGenreForm=()=>{
    document.getElementById("genreFormContainer").style.display="flex";
}

const closeCreateGenre=()=>{
    document.getElementById("genreFormContainer").style.display="none";
}

let genreMovieIDArray=[];
const addMovieToGenre=(movieID)=>{
    if(genreMovieIDArray.find(movie=>movie===movieID)){
        return;
    }
    genreMovieIDArray.push(movieID);
    
    const movieSelector=document.getElementById("createGenreMovie");
    const movies=JSON.parse(movieSelector.getAttribute("data-movie"));
    const movieName=movies.find(movie=>movie.id===(+movieID)).name;
    let movieDiv=document.createElement("div");

    let displayMovieDiv=document.createElement("div");
    let movieNameDiv=document.createElement("div");
    movieNameDiv.innerText=movieName;
    movieNameDiv.style.display="inline-block";

    let deleteMovie=document.createElement("button");
    deleteMovie.innerText="X";
    deleteMovie.onclick=()=>{
        movieDiv.parentNode.removeChild(movieDiv);
    }

    displayMovieDiv.appendChild(movieNameDiv);
    displayMovieDiv.appendChild(deleteMovie);
    movieDiv.appendChild(displayMovieDiv);

    let movieInput=document.createElement("input");
    movieInput.type="hidden";
    movieInput.value=+(movieID);
    movieInput.setAttribute("name","genreMovie[]");
    movieDiv.appendChild(movieInput);

    const selectedGenreMovie=document.getElementById("selectedGenreMovie");
    selectedGenreMovie.appendChild(movieDiv);

}


const displayPersonForm=()=>{
    document.getElementById("personFormContainer").style.display="flex";
}

const closeCreatePerson=()=>{
    document.getElementById("personFormContainer").style.display="none";
}

let actorMovieIDArray=[];
const addMovieToActor=(movieID)=>{
    if(actorMovieIDArray.find(movie=>movie===movieID)){
        return;
    }
    actorMovieIDArray.push(movieID);
    
    const movieSelector=document.getElementById("createActorMovie");
    const movies=JSON.parse(movieSelector.getAttribute("data-movie"));
    const movieName=movies.find(movie=>movie.id===(+movieID)).name;
    let movieDiv=document.createElement("div");

    let displayMovieDiv=document.createElement("div");
    let movieNameDiv=document.createElement("div");
    movieNameDiv.innerText=movieName;
    movieNameDiv.style.display="inline-block";

    let deleteMovie=document.createElement("button");
    deleteMovie.innerText="X";
    deleteMovie.onclick=()=>{
        movieDiv.parentNode.removeChild(movieDiv);
    }

    displayMovieDiv.appendChild(movieNameDiv);
    displayMovieDiv.appendChild(deleteMovie);
    movieDiv.appendChild(displayMovieDiv);

    let movieInput=document.createElement("input");
    movieInput.type="hidden";
    movieInput.value=+(movieID);
    movieInput.setAttribute("name","actorMovie[]");
    movieDiv.appendChild(movieInput);

    const selectedActorMovie=document.getElementById("selectedActorMovie");
    selectedActorMovie.appendChild(movieDiv);

}

let directorMovieIDArray=[];
const addMovieToDirector=(movieID)=>{
    if(directorMovieIDArray.find(movie=>movie===movieID)){
        return;
    }
    directorMovieIDArray.push(movieID);
    
    const movieSelector=document.getElementById("createDirectorMovie");
    const movies=JSON.parse(movieSelector.getAttribute("data-movie"));
    const movieName=movies.find(movie=>movie.id===(+movieID)).name;
    let movieDiv=document.createElement("div");

    let displayMovieDiv=document.createElement("div");
    let movieNameDiv=document.createElement("div");
    movieNameDiv.innerText=movieName;
    movieNameDiv.style.display="inline-block";

    let deleteMovie=document.createElement("button");
    deleteMovie.innerText="X";
    deleteMovie.onclick=()=>{
        movieDiv.parentNode.removeChild(movieDiv);
    }

    displayMovieDiv.appendChild(movieNameDiv);
    displayMovieDiv.appendChild(deleteMovie);
    movieDiv.appendChild(displayMovieDiv);

    let movieInput=document.createElement("input");
    movieInput.type="hidden";
    movieInput.value=+(movieID);
    movieInput.setAttribute("name","directorMovie[]");
    movieDiv.appendChild(movieInput);

    const selectedDirectorMovie=document.getElementById("selectedDirectorMovie");
    selectedDirectorMovie.appendChild(movieDiv);

}

const deletionCheck=async(type)=>{
    let inputPassWord=document.getElementById("deleteMoviePass").value;
    let movieID=document.getElementById("deleteId").value;
    let deleteUrl=`/${type}/delete?id=${+(movieID)}&pass=${inputPassWord}`;
    const res = await fetch(deleteUrl);
    window.location.href=res.url;
}

const displayDeleteMovie=()=>{
    document.getElementById("deleteMovieContainer").style.display="flex";
}

const closeDeleteMovie=()=>{
    document.getElementById("deleteMovieContainer").style.display="none";
}

