// variables
const saveinputbutton = document.getElementById("saveinputbutton")
saveinputbutton.addEventListener("click", save)

const saveTabButton = document.getElementById("savetabbutton")
saveTabButton.addEventListener("click", saveTab)

const deletebutton = document.getElementById("deletebutton")
deletebutton.addEventListener("click", deleteLocalStorage)

let savedinput = []

const input = document.getElementById("input")
const showResult = document.getElementById("showresult")
const outputFromLocalStrorage = JSON.parse(localStorage.getItem("savedinput"))

if (outputFromLocalStrorage) {
    savedinput = outputFromLocalStrorage
    showOutput(savedinput)
}

// functions

function save() {
    savedinput.push(input.value)
    savedinput = JSON.stringify(savedinput)
    localStorage.setItem("savedinput", savedinput)
    savedinput = JSON.parse(savedinput)
    input.value = ""
    showOutput(savedinput)
}

function showOutput(output) {
    let showSaved = ""
    for (let i = 0; i < output.length; i++) {
        showSaved += `
        <li>
        <a target="_blank" href="${output[i]}">${output[i]} </a>
        </li> `
    }
    showResult.innerHTML = showSaved
}

function deleteLocalStorage() {
    confirmation = confirm("are you sure to delete all??")

    if (confirmation) {
        localStorage.clear()
        savedinput = []
        showOutput(savedinput)
    }
}

function saveTab() {
    chrome.tabs.query({ active: true, currentWindow: true },function(tabs){
        savedinput.push(tabs[0].url)
        savedinput = JSON.stringify(savedinput)
        localStorage.setItem("savedinput", savedinput)
        savedinput = JSON.parse(savedinput)
        input.value = ""
        showOutput(savedinput)
    })
}
