// function for show search status 
const sharchStatus= (statusInfo, colorSing) =>{
    const resultStatus= document.getElementById('result-status')
    // remove previous status
    resultStatus.innerHTML= '';
    const p= document.createElement('p')
    p.classList.add(colorSing);
    p.innerText= statusInfo;
    resultStatus.appendChild(p);
}


// function for  spinner control 
const toggleSpinner= style=>{
    document.getElementById('spinner').style.display= style;
}


const searchBook=() =>{
    // get search text 
    const searchField = document.getElementById('search-field');
    const searchText= searchField.value;

    toggleSpinner('block')
    // remove field text 
    searchField.value= '';
    // show empty status  
    if(searchText === ''){
        sharchStatus('❌ Enter any book name', 'warning')
    }
    else{
    const url=`https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data=> displaySearchResult(data))
    }
}


const displaySearchResult= book=>{
    // show not found status
    if(book.numFound === 0){
        sharchStatus('❌ No result found', 'warning')
        toggleSpinner('none')
    }
    else{
        sharchStatus(`✌ ${book.numFound} Result found`, 'success')
    // show api content 
    const seacrchResult= document.getElementById('search-result');
    // remove previous result 
    seacrchResult.innerText= '';

    book.docs.forEach(book => {
        const div= document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
        <div class="card h-100 bg-primary">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-size card-img-top img-50" alt="...">
            <div class="card-body">
              <h5 class="text-white card-title fw-bolder">${book.title}</h5>
              <h5 class="text-white"><span class="fw-bold">Author</span> – ${book.author_name ? book.author_name: ''}</h5>
              <h5 class="text-white"><span class="fw-bold">Publisher</span> – ${book.publisher_facet} </h5>
              <h5 class="text-white"><span class="fw-bold">First Publish</span> – ${book.first_publish_year}</h5>
            </div>
        </div>
        `;
        seacrchResult.appendChild(div);
    
    });
    // stop spinner 
    toggleSpinner('none')
}
}