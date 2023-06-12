let bookmark = 0;
let max = 100;
let cla;

display = (className) => {
    cla = className;
    initParse();
    const c = Parse.Object.extend(className);
    const q = new Parse.Query(c);
    q.limit(20);
    q.skip(bookmark);
    q.find().then((res) => {
        let objs = [];
        res.forEach(o => {
            let no = {};
            no.name = o.get("name");
            no.editions = o.get("editions");
            no.available = o.get("ava");
            objs.push(no);
        })
        createDoms(objs, className);
        bookmark += 20;
    }, (err) => {
        console.error("Error when fetch data " + err);
        handleLoadError();
    })
}

initParse = () => {
    Parse.initialize("Hv7SkY0gkLY3QpvoSyL1DbUMywSSIsRVfbYrJIn6", "uJGQDxeMTL8KM41AORaa9IHwqoylWAGFQlLuaW7B");
    Parse.serverURL = 'https://parseapi.back4app.com/';
}

handleLoadError = () => {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("error").classList.remove("hidden");
}

createDoms = (data, className) => {
    const target = document.getElementById("archiveContainer");
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        let pic = document.createElement("div");
        pic.classList.add("pImageContainer");
        let d = document.createElement("div");
        let img = document.createElement("img");
        img.loading = "lazy";
        img.classList.add("pImage");
        img.src = "./images/" + className + "/JPEG/" + obj.name;
        img.id = obj.name.substring(0, obj.name.length - 4) + " : " + obj.available + "/" + obj.editions;
        let dt = document.createElement("div");
        dt.classList.add("pgObjectText");
        let nn = obj.name.substring(0, obj.name.length - 4);
        dt.innerHTML = `<p class="en neue hidden">${nn}</p><p class="ch genyo hidden">${nn}</p>`
        d.appendChild(img);
        pic.appendChild(d);
        pic.appendChild(dt);
        target.appendChild(pic);
    }
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("loadMore").classList.remove("hidden");
    if (bookmark >= max) {
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
    const c = Parse.Object.extend(cla);
    const q = new Parse.Query(c);
    q.limit(20);
    q.skip(bookmark);
    q.find().then((res) => {
        let objs = [];
        res.forEach(o => {
            let no = {};
            no.name = o.get("name");
            no.editions = o.get("editions");
            no.available = o.get("ava");
            objs.push(no);
        })
        createDoms(objs, cla);
        bookmark += 20;
    }, (err) => {
        console.error("Error when fetch data " + err);
        handleLoadError();
    })
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
            let i = document.getElementById("larImg");
            i.src = str;
            let ee = document.getElementById("showImageContainer");
            ee.classList.remove("hidden");
            let at = document.getElementById("archiveText");
            if (document.getElementById("switchToEn").classList.contains("currentLang")) {
                //currentLang = "en";
                at.innerHTML = `<p class="en neue">${e.id}</p>`
            } else {
                //currentLang = "ch";
                at.innerHTML = `<p class="ch genyo">${e.id}</p>`
            }
        })
    }

    let e = document.getElementById("showImageContainer");
    let i = document.getElementById("larImg");
    e.addEventListener("click", ev => {
        i.src = "";
        e.classList.add("hidden");
    });
}