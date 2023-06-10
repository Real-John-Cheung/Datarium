

const switchToEn = () => {
    let buttonEn = document.getElementById("switchToEn");
    let buttonCh = document.getElementById("switchToCh");
    buttonEn.classList.add("currentLang");
    buttonEn.onclick = null;
    buttonCh.classList.remove("currentLang");
    buttonCh.onclick = switchToCh;
    for (let e of document.getElementsByClassName("en")) {
        e.classList.remove("hidden");
    }
    for (let e of document.getElementsByClassName("ch")) {
        e.classList.add("hidden");
    }
}

const switchToCh = () => {
    let buttonEn = document.getElementById("switchToEn");
    let buttonCh = document.getElementById("switchToCh");
    buttonEn.classList.remove("currentLang");
    buttonEn.onclick = switchToEn;
    buttonCh.classList.add("currentLang");
    buttonCh.onclick = null;
    document.getElementById("switchToEn").classList.remove("currentLang");
    document.getElementById("switchToCh").classList.add("currentLang");
    for (let e of document.getElementsByClassName("en")) {
        e.classList.add("hidden");
    }
    for (let e of document.getElementsByClassName("ch")) {
        e.classList.remove("hidden");
    }
}

const bindEvents = () => {
    for (let pI of document.getElementsByClassName("pImage")) {
        pI.addEventListener("click", ev => {
            let str = pI.src;
            str = str.replace("Th", "Hd");
            let i = document.getElementById("larImg");
            i.src = str;
            let e = document.getElementById("showImageContainer");
            e.classList.remove("hidden");
        });
    }

    let e = document.getElementById("showImageContainer");
    let i = document.getElementById("larImg");
    e.addEventListener("click", ev => {
        i.src = "";
        e.classList.add("hidden");
    });
}