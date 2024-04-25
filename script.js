const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

const form = document.getElementsByTagName('form')[0];

const tableContainer = document.querySelector('.table-responsive');
const table = document.getElementsByTagName('table')[0];
const tableBody = table.querySelector('tbody')

const addBtn = document.getElementById('addBtn')
const showBtn = document.getElementById('showBtn')

addBtn.addEventListener('click', () => {
    addBtn.setAttribute('class', '')
    showBtn.setAttribute('class', '')

    addBtn.classList.add('btn', 'btn-dark')
    showBtn.classList.add('btn', 'btn-light')

    form.style.display = 'block'
    table.style.display = 'none'
})

showBtn.addEventListener('click', () => {
    addBtn.setAttribute('class', '')
    showBtn.setAttribute('class', '')

    showBtn.classList.add('btn', 'btn-dark')
    addBtn.classList.add('btn', 'btn-light')

    form.style.display = 'none'
    table.style.display = 'block'
})

// console.log(form)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let pages = document.getElementById('pages').value
    let selectedRadio = document.querySelector('input[name="readingStatus"]:checked')
    let status = document.querySelector(`label[for="${selectedRadio.id}"]`).innerText

    form.reset();
    // console.log(title, author, pages, status)

    let newObject = new Book(title, author, pages, status)

    myLibrary.push(newObject)

    // console.log(myLibrary)
    // console.log(Object.getPrototypeOf(newObject))

    addBookToLibrary()


})

function addBookToLibrary() {
    tableBody.innerHTML = ''
    myLibrary.forEach(book => {
        let counter = 1

        let row = document.createElement('tr')

        function createCell(value) {
            let cell = document.createElement('td')
            cell.innerText = value

            return cell
        }

        let editCell = document.createElement('td')
        let editBtn = document.createElement('button')
        if (book.status == "Did not start") {
            editBtn.classList.add('btn', 'btn-secondary',)
            editBtn.innerText = "Did not start"
        } else if (book.status == "Reading") {
            editBtn.classList.add('btn', 'btn-primary')
            editBtn.innerText = "Reading"
        } else {
            editBtn.classList.add('btn', 'btn-success')
            editBtn.innerText = "Finished"
        }
        editBtn.classList.add('edit-btn')

        editBtn.addEventListener('click', () => {
            editBtn.classList = ''

            if (book.status == "Did not start") {
                editBtn.classList.add('btn', 'btn-primary')
                editBtn.innerText = "Reading"
                book.status = "Reading"
            } else if (book.status == "Reading") {
                editBtn.classList.add('btn', 'btn-success')
                editBtn.innerText = "Finished"
                book.status = "Finished"
            } else {
                editBtn.classList.add('btn', 'btn-secondary',)
                editBtn.innerText = "Did not start"
                book.status = "Did not start"
            }

        })


        let removeCell = document.createElement('td')
        let removeBtn = document.createElement('button')
        removeBtn.classList.add('btn', 'btn-danger')
        removeBtn.innerText = "Remove"

        removeBtn.addEventListener('click', () => {
            myLibrary.splice((counter - 1), 1)
            addBookToLibrary()

        })


        editCell.appendChild(editBtn)
        removeCell.appendChild(removeBtn)

        row.appendChild(createCell(counter))
        row.appendChild(createCell(book.title))
        row.appendChild(createCell(book.author))
        row.appendChild(createCell(book.pages))
        row.appendChild(createCell(book.status))
        row.appendChild(editCell)
        row.appendChild(removeCell)


        tableBody.appendChild(row)
    })

}


// tester

