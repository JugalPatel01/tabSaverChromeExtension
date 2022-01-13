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
    if (input.value != "") {
        savedinput.push(input.value)
        savedinput = JSON.stringify(savedinput)
        localStorage.setItem("savedinput", savedinput)
        savedinput = JSON.parse(savedinput)
        input.value = ""
        showOutput(savedinput)
    }
}

function showOutput(output) {
    let showSaved = ""
    for (let i = 0; i < output.length; i++) {
        showSaved += `
        <div>
            <li>
            <a target="_blank" href="${output[i]}">${output[i]}</a>
            <button class="deletebutton" onclick="deleteitem(this)"> Delete </button>
            </li>
        </div>
        `
    }
    showResult.innerHTML = showSaved
}

function deleteitem(sender) {
    let s = sender.parentNode.childNodes;
    let li = s[1].innerHTML;
    let aElements = sender.parentNode.parentNode.parentNode.getElementsByTagName("a");
    let aElementsLength = aElements.length;
    let index;
    for (var i = 0; i < aElementsLength; i++) {
        if (aElements[i].innerHTML == li) //this condition is never true
        {
            index = i;
        }
    }

    savedinput = savedinput.filter(value => value != savedinput[index])
    savedinput = JSON.stringify(savedinput)
    localStorage.setItem("savedinput", savedinput)
    savedinput = JSON.parse(savedinput)
    showOutput(savedinput)

}
function deleteLocalStorage() {
    confirmation = confirm("are you sure to delete all??")

    if (confirmation) {
        localStorage.clear()
        savedinput = []
        showOutput(savedinput)
    }
}

async function saveTab() {
    chrome.tabs.query({ active: true, currentWindow:true},function(tabs){
        savedinput.push(tabs[0].url)
        savedinput = JSON.stringify(savedinput)
        localStorage.setItem("savedinput", savedinput)
        savedinput = JSON.parse(savedinput)
        input.value = ""
        showOutput(savedinput)
    })
}
