'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => bookList = apiBooks);
});

function createDetailHTML(book){
  let html = `<div id="bookDetail"
                style="border-radius:.5rem;border:.1rem solid black;width:20vw;background-color:rgba(100,100,100,.7);position:absolute;display:flex;flex-direction:row;color:white;">
                <div>
                <p style="margin: 1rem;">`+"Pages: "+book.pages+`</p>
                <p style="margin: 1rem">`+"Release date: "+ book.releaseDate +`</p>
                </div>
                <img src="`+ book.coverImage +`" alt="CoverImage" style="width:50%; border-radius:0 .5rem .5rem 0">
              </div>`;
  return html;
}

function showDetails(event){
  let targetBook = bookList.filter(({author, title}) => {
    return event.target.innerHTML.includes(author)&&
            event.target.innerHTML.includes(title);
  });
  if(targetBook.length > 0){
    getBookById(targetBook[0].id).then(returnedBook => {
      const el = document.querySelector('#bookDetail');
      if(el) el.parentElement.removeChild(el);
      event.target.insertAdjacentHTML('beforeend',createDetailHTML(returnedBook));
    });
  }
}

function removeDetails(){
  const element = document.querySelector('#bookDetail');
  if(element){
    element.remove();
  }
}

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  const root = document.getElementById('root');

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));
}
