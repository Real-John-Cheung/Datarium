let bookmark = 0;
let max = 100;
let cla;
let jsonData;

display = (className) => {
    cla = className;
    // initParse();
    // const c = Parse.Object.extend(className);
    // const q = new Parse.Query(c);
    // q.limit(20);
    // q.skip(bookmark);
    // q.find().then((res) => {
    //     let objs = [];
    //     res.forEach(o => {
    //         let no = {};
    //         no.name = o.get("name");
    //         no.editions = o.get("editions");
    //         no.available = o.get("ava");
    //         objs.push(no);
    //     })
    //     createDoms(objs, className);
    //     bookmark += 20;
    // }, (err) => {
    //     console.error("Error when fetch data " + err);
    //     handleLoadError();
    // })
    fetch("./json/" + cla + ".json").then((res) => {
        res.json().then((json) => {
            jsonData = json;
            max = json.length;
            createDoms(0, 20, className);
            bookmark += 20;
        }, (e) => {
            console.error(e);
            handleLoadError();
        });
    }, (err) => {
        handleLoadError();
    });
}

initParse = () => {
    Parse.initialize("Hv7SkY0gkLY3QpvoSyL1DbUMywSSIsRVfbYrJIn6", "uJGQDxeMTL8KM41AORaa9IHwqoylWAGFQlLuaW7B");
    Parse.serverURL = 'https://parseapi.back4app.com/';
}

handleLoadError = () => {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("error").classList.remove("hidden");
}

createDoms = (begin, end, className) => {
    const target = document.getElementById("archiveContainer");
    const data = jsonData;
    for (let i = begin; i < end; i++) {
        const obj = data[i];
        if (!obj) continue;
        let pic = document.createElement("div");
        pic.classList.add("pImageContainer");
        let d = document.createElement("div");
        let img = document.createElement("img");
        img.loading = "lazy";
        img.classList.add("pImage");
        img.src = "./images/" + className + "/JPEG/" + obj.name;
        img.id = i + " " + obj.name.substring(0, obj.name.length - 4);
        let dt = document.createElement("div");
        dt.classList.add("pgObjectText");
        let nn = obj.name.substring(0, obj.name.length - 4);
        let sellOptionsEN = "";
        let sellOptionsCH = ""
        obj.options.forEach((o, i) => {
            sellOptionsEN += o.option;
            sellOptionsCH += o.optionCH;
            sellOptionsEN += " £";
            sellOptionsCH += " £";
            sellOptionsEN += o.priceInGBP;
            sellOptionsCH += o.priceInGBP;
            if (i < obj.options.length - 1) {
                sellOptionsEN += "<br>";
                sellOptionsCH += "<br>";
            }
        });
        dt.innerHTML = `<p class="en neue"><b>${nn}</b><br>
        ${obj.ava} / ${obj.editions}<br>
        Giclée prints on Hahnemühle Photo Rag<br>
        ${sellOptionsEN}
        </p>
        <p class="ch genyo"><b>${nn}</b><br>
        ${obj.ava} / ${obj.editions}<br>
        Hahnemühle Photo Rag 上的微噴印刷<br>
        ${sellOptionsCH}
        </p>`
        d.appendChild(img);
        pic.appendChild(d);
        pic.appendChild(dt);
        target.appendChild(pic);
    }
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("loadMore").classList.remove("hidden");
    if (bookmark + 20 >= max) {
        document.getElementById("loadMore").classList.add("hidden");

    }
    reinforceLang();
    bindEvents2();
}

reinforceLang = () => {
    let currentLang, toHide;
    if (document.getElementById("switchToEn").classList.contains("currentLang")) {
        currentLang = "en";
        toHide = "ch"
    } else {
        currentLang = "ch";
        toHide = "en";
    }

    for (let e of document.getElementsByClassName(currentLang)) {
        e.classList.remove("hidden");
    }

    for (let e of document.getElementsByClassName(toHide)) {
        e.classList.add("hidden");
    }
}

loadMore = () => {
    // const c = Parse.Object.extend(cla);
    // const q = new Parse.Query(c);
    // q.limit(20);
    // q.skip(bookmark);
    // q.find().then((res) => {
    //     let objs = [];
    //     res.forEach(o => {
    //         let no = {};
    //         no.name = o.get("name");
    //         no.editions = o.get("editions");
    //         no.available = o.get("ava");
    //         objs.push(no);
    //     })
    //     createDoms(objs, cla);
    //     bookmark += 20;
    // }, (err) => {
    //     console.error("Error when fetch data " + err);
    //     handleLoadError();
    // })
    if (bookmark < max) {
        createDoms(bookmark, bookmark + 20, cla);
        bookmark += 20;
    }
}

bindEvents2 = () => {
    for (let e of document.getElementsByClassName("pImage")) {
        e.addEventListener("click", () => {
            let name = e.src.substring(e.src.length - 12);
            name = name.replace("jpg", "png");
            let nname = name.replace(".png", "");
            let type;
            switch (cla) {
                case "Omm":
                    type = "O/";
                    break;
                case "OmmI":
                    type = "OI/";
                    break;
                case "Platy":
                    type = "Pty/";
                    break;
                case "PlatyPoi":
                    type = "PtyP/";
                    break;
                default:
                    break;
            }
            let str = "https://real-john-cheung.github.io/DatariumImages/" + type + name;
            let i = document.getElementById("archiveImageLar");
            i.src = str;
            let ee = document.getElementById("showImageContainer");
            ee.classList.remove("hidden");
            let at = document.getElementById("archiveText");
            let idx = parseInt(e.id.split(" ")[0]);
            let info = jsonData[idx];
            //
            let nameStr = info.name.substring(0, info.name.length - 4);
            let isEn = document.getElementById("switchToEn").classList.contains("currentLang")
            //
            if (isEn) {
                //currentLang = "en";
                at.innerHTML = `<p class="en neue"><b>${nameStr}</b><br>
                </p>`
            } else {
                //currentLang = "ch";
                at.innerHTML = `<p class="ch genyo"><b>${nameStr}</b><br>
                </p>`
            }
        })
    }

    let e = document.getElementById("showImageContainer");
    let i = document.getElementById("archiveImageLar");
    e.addEventListener("click", ev => {
        i.src = "";
        e.classList.add("hidden");
    });
}