let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks() {
  let table = $("#bookTable");
  table.empty();

  let search = $("#search").val().toLowerCase();
  let filter = $("#filterGenre").val();

  let genres = new Set();

  books.forEach((book, index) => {
    genres.add(book.genre);

    if (
      (book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)) &&
      (filter === "" || book.genre === filter)
    ) {
      let row = $(`
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.year}</td>
                    <td>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </td>
                </tr>
            `);

      row.find(".edit").click(() => editBook(index));
      row.find(".delete").click(() => deleteBook(index));

      row.hide().fadeIn(300);
      table.append(row);
    }
  });

  let filterDropdown = $("#filterGenre");

  // SAVE current selection
  let selected = filterDropdown.val();

  filterDropdown.empty().append('<option value="">All Genres</option>');

  genres.forEach((g) => {
    filterDropdown.append(`<option value="${g}">${g}</option>`);
  });

  // RESTORE selection
  filterDropdown.val(selected);
}

function editBook(index) {
  let book = books[index];
  $("#title").val(book.title);
  $("#author").val(book.author);
  $("#genre").val(book.genre);
  $("#year").val(book.year);
  $("#editIndex").val(index);
}

function deleteBook(index) {
  books.splice(index, 1);
  saveBooks();
  renderBooks();
}

$("#bookForm").submit(function (e) {
  e.preventDefault();

  let book = {
    title: $("#title").val(),
    author: $("#author").val(),
    genre: $("#genre").val(),
    year: $("#year").val(),
  };

  let editIndex = $("#editIndex").val();

  if (editIndex === "") {
    books.push(book);
  } else {
    books[editIndex] = book;
    $("#editIndex").val("");
  }

  this.reset();
  saveBooks();
  renderBooks();
});

$("#search, #filterGenre").on("input change", renderBooks);

$(document).ready(renderBooks);
