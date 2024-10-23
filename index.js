const postTextarea = document.getElementById("post")
const nameInputfield  = document.getElementById("username")
const form = document.getElementById("form")
const postContainer = document.getElementById("posts-container")

let postList = []

form.addEventListener("submit", function(event){
    event.preventDefault()
    
    let postFromForm = postTextarea.value
    let nameFromForm = nameInputfield.value

    const userPost = {
        poSTFromUser : postFromForm,
        naMEFromUser : nameFromForm
    }


    postList.push(userPost)

    form.reset()
    showPost()
})

function showPost(){
    postContainer.innerHTML = ` `
    postList.forEach(function(item){
       let userPost = item.poSTFromUser
       let userName = item.naMEFromUser

       let postHeadingElement = document.createElement("h3")
       postHeadingElement.textContent = userPost

       let paragraphElement = document.createElement("p")
       paragraphElement.textContent = userName

       postContainer.append(postHeadingElement, paragraphElement)
    })
}