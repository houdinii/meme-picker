import {catsData} from './data.js'

const emotionsRadios = document.getElementById("emotion-radios")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")
const body = document.getElementById("body")

emotionsRadios.addEventListener("change", highlightCheckedOption)
memeModalCloseBtn.addEventListener("click", closeModal)
// getImageBtn.addEventListener("click", renderCat)
body.addEventListener("click", bodyClick)
function highlightCheckedOption(e){
    for (let highlightedElement of document.getElementsByClassName("highlight")) {
        highlightedElement.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = "none"
}

function bodyClick(e){
    console.log(memeModal.style.display)
    if(!e.target.closest("#meme-modal") && memeModal.style.display === "flex"){
        closeModal()
    }
    if(e.target.id === "get-image-btn"){
        renderCat()
    }
}

function renderCat(){
    let cat = getSingleCatObject()
    memeModalInner.innerHTML = `<img class="cat-img" alt="${cat.alt}" src="images/${cat.image}">`
    memeModal.style.display = "flex"
}

function getSingleCatObject(){
    const cats = getMatchingCatsArray()
    if (cats.length === 1) {
        return cats[0]
    } else
    {
        return cats[Math.floor(Math.random() * cats.length)]
    }
}



function getMatchingCatsArray(){
    if(document.querySelector('input[type="radio"]:checked')) {
        const checkedRadio = document.querySelector('input[type="radio"]:checked')
        const selectedEmotion = checkedRadio.value
        const isGif = gifsOnlyOption.checked

        // if(isGif){
        //     picList = catsData
        //         .filter((el) => el.isGif )
        //         .filter((el) => el.emotionTags.includes(checkedRadio.value))
        // } else {
        //     picList = catsData
        //         .filter((el)=> el.emotionTags.includes(checkedRadio.value))
        // }

        return catsData.filter(function (cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
    }
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for(let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    const emotions = getEmotionsArray(cats)
    let html = ""
    for(let emotion of emotions){
        html += `
        <div class="radio">
          <label for="${emotion}">${emotion}</label>
          <input type="radio" id="${emotion}" value="${emotion}" name="emotion-radios">
        </div>
`
    }
    emotionsRadios.innerHTML = html
}

renderEmotionsRadios(catsData)