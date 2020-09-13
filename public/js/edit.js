let note = {}
if (!!sessionStorage.getItem('note')) {
    note = JSON.parse(sessionStorage.getItem('note'));
    sessionStorage.removeItem('note')

    console.log(note);
    console.log(note.title);
    console.log(note.author);
    console.log(note.description);
    console.log(note.status);

    document.getElementById("title").value = note.title;
    document.getElementById("author").value = note.author;
    document.getElementById("description").value = note.description;
    document.getElementById("status").value = note.status === 'completed' ? 'completed' : 'pending'

} else {
    window.location.href = '/';
}

function editNote() {

    fetch("/api/notes/" + note.id, {
        method: 'PUT',
        body: JSON.stringify({
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            description: document.getElementById("description").value,
            status: document.getElementById("status").value === 'completed' ? 'completed' : 'pending'
        }),
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

