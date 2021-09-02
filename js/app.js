// Warning message display arrow function
document.getElementById('error-message').style.display = 'none';
const displayWarning = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('book-search-result').textContent = '';
    document.getElementById('book-count').textContent = '';
}
// Search books arrow function here
const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field
    searchField.value = '';
    const divCount = document.getElementById('book-count').textContent = "";

    if (searchText == '') {
        displayWarning();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('book-search-result').textContent = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))
    }
}

// Display Books result arrow function here

const displayBooks = data => {
    const bookSearchResult = document.getElementById('book-search-result');
    const bookList = data.docs;
    // clear display book result
    bookSearchResult.textContent = '';

    if (bookList == null) {
        displayWarning();
    }
    else {
        document.getElementById('book-count').innerText = `Books Found ${bookList.length}`;
        // ForEach loop for book in books 
        bookList?.forEach(book => {
            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100"> 
                <div class="card-body">
                    <img src='https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'N/a'}-M.jpg' class = "card-img-top w-50 h-50" alt="...">
                    <h5 class="Book-Name">Book Name: ${book.title ? book.title : 'N/a'} </h5>
                    <h5 class="Book-Name">Author Name: ${book.author_name ? book.author_name : 'N/a'} </h5>
                    <h5 class="Book-Name">First Publish Year: ${book.first_publish_year ? book.first_publish_year : 'N/a'}</h5>
                    <h5 class="Book-Name">Publisher Name: ${book.publisher ? book.publisher : 'N/a'} </h5>
                </div >   
            </div >
            `
            bookSearchResult.appendChild(div);
        })
    }
}