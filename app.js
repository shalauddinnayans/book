const searchBook=() =>{
    const searchField = document.getElementById('search-field');
    const searchText= searchField.value;
    searchField.value= '';
    if(searchText == ''){
    const resultStatus= document.getElementById('result-status')
    resultStatus.innerHTML= '';
    const p= document.createElement('p')
    p.classList.add('warning');
    p.innerText='❌ Enter any book name';
    resultStatus.appendChild(p);
    }
    else{
    const url=`https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data=> displaySearchResult(data))
    }
}

const displaySearchResult= book=>{

    if(book.numFound === 0){
    const resultStatus= document.getElementById('result-status')
    resultStatus.innerHTML= '';
    const p= document.createElement('p')
    p.classList.add('warning');
    p.innerText='❌ No result found';
    resultStatus.appendChild(p);
    }
    else{
    const resultStatus= document.getElementById('result-status')
    resultStatus.innerHTML= '';
    const p= document.createElement('p')
    p.classList.add('success');
    p.innerText=`✌ ${book.numFound} Result found
    `;
    resultStatus.appendChild(p);
    const seacrchResult= document.getElementById('search-result');
    seacrchResult.innerText= '';

    book.docs.forEach(book => {
        const div= document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h5 class="card-title">Author – ${book.author_name[0]}</h5>
              <h5 class="card-title">Publisher – ${book.publisher_facet} </h5>
              <h5 class="card-title">Frist Publish – ${book.first_publish_year}  </h5>
            </div>
        </div>
        `;
        seacrchResult.appendChild(div);
    
    });
}
}