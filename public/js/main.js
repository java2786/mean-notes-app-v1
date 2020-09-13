function addNotePage() {
    window.location.href = '/notes/create';
}
// function cancelAdd(){

//     window.location.href = '/customers';
// }

function findAll() {
    fetch("/api/notes")
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}

function findById(id) {
    console.log("find one");
    fetch("/api/notes/" + id)
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}
function editNote(id) {
    console.log(id);

    fetch("/api/notes/" + id)
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            if (res.success) {
                sessionStorage.setItem('note', JSON.stringify(res.data));
                window.location.href = '/notes/edit';
            } else {
                console.log("Invalid operation");
            }
        })
        .catch(err => {
            console.log(err);
        })

          
        }

function deleteNote(id) {
                console.log(id);
                fetch("/api/notes/" + id, {
                    method: 'DELETE'
                }).then(res => {
                    return res.json();
                }).then(res => {
                    console.log(res);
                    location.reload();
                }).catch(err => {
                    console.log(err);
                })
            }


function getAllNotes() {
                console.log(`get all notes`);
                fetch("/api/notes/")
                    .then(res => {
                        return res.json();
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
            }

function createNote() {
                console.log("create");

                const note = {
                    title: document.getElementById("title").value,
                    author: document.getElementById("author").value,
                    description: document.getElementById("description").value,
                    status: document.getElementById("status").value === 'completed' ? 'completed' : 'pending'
                }

                console.log(note)
                fetch("/api/notes/", {
                    method: 'POST',
                    body: JSON.stringify(note),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                    }
                }).then(res => {
                    return res.json();
                }).then(res => {
                    console.log(res);
                    window.location.href = '/';
                }).catch(err => {
                    console.log(err);
                })
            }

console.log("hello");
// getAllNotes();