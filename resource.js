const addButton = document.getElementById("add-button")
const modalOverlay = document.getElementById("modal-overlay")
// const overlayView = document.getElementById("overlay-container")
const closeIcon = document.getElementById("close-icon")
const form = document.getElementById("form")
const websiteName = document.getElementById("text")
const websiteLink = document.getElementById("text2")
const websiteDescription = document.getElementById("description")
const submitButton = document.getElementById("submit-button")
const displayContainer = document.getElementById("display-container")


//add or remove modal overlay
addButton.addEventListener("click", revealModalOverlay)
    function revealModalOverlay(){
    modalOverlay.classList.remove("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")
    websiteName.focus()
}

closeIcon.addEventListener("click", closeModalOverlay)
function closeModalOverlay(){
 if(modalOverlay.classList.contains("modal-overlay-visible")){
    modalOverlay.classList.remove("modal-overlay-visible")
    modalOverlay.classList.add("modal-overlay")
    } 
}

 let websiteInfo = []

//collect and handle form data
form.addEventListener("submit", handleFormData)
function handleFormData(event){
     event.preventDefault()

//input data collection
 let nameOfWebsite = websiteName.value
 let linkOfWebsite = websiteLink.value
 let descriptionOfWebsite = websiteDescription.value

//form validation

 const websiteDetails = {
    websiteNAme : nameOfWebsite,
   websiteLInk : linkOfWebsite,
   websiteDEscription : descriptionOfWebsite
    }

 websiteInfo.push(websiteDetails)
 localStorage.setItem("itemsOfResearch", JSON.stringify(websiteInfo))

   form.reset()
   closeModalOverlay()
   fetchItems()
 }

 //fetch data from local storage
 function fetchItems(){
    if(localStorage.getItem("itemsOfResearch")){
       websiteInfo = JSON.parse(localStorage.getItem("itemsOfResearch"))
    }
    printInfoOnUI()
 }
fetchItems()

 //print data from local storage to ui
 function printInfoOnUI(){
    displayContainer.innerHTML = ""
     websiteInfo.forEach(function(item){
        let itemNameToPrint = item.websiteNAme
        let itemLinkToPrint = item.websiteLInk
        let itemDesToPrint = item.websiteDEscription

        let researchItemDiv = document.createElement("div")
        researchItemDiv.classList.add("research-item")

        let titleAndDeleteContainerDiv = document.createElement("div")
        titleAndDeleteContainerDiv.classList.add("title-and-icon")

        let itemTitle = document.createElement("a")
        itemTitle.setAttribute("href", `${itemLinkToPrint}`)
        itemTitle.setAttribute("target", "_blank")
        itemTitle.textContent = itemNameToPrint

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash")
        deleteIcon.setAttribute("onclick", `deleteItem('${itemLinkToPrint}')`)

        let descriptionOfWebsiteDiv = document.createElement("div")
        descriptionOfWebsiteDiv.classList.add("body-text")

        let descriptionText = document.createElement("p")
        descriptionText.textContent = itemDesToPrint


        //append
        descriptionOfWebsiteDiv.append(descriptionText)
        titleAndDeleteContainerDiv.append(itemTitle, deleteIcon)
        researchItemDiv.append(titleAndDeleteContainerDiv, descriptionOfWebsiteDiv)
        displayContainer.append(researchItemDiv)
     })
 }


 function deleteItem(link){
    websiteInfo.forEach(function(item, index){
    if(item.websiteLInk === link){
       websiteInfo.splice(index, 1)
    }
    })

    localStorage.setItem("itemsOfResearch", JSON.stringify(websiteInfo))
 fetchItems()
 }

 