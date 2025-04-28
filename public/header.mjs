import * as toHtmlElement from "./toHtmlElement.mjs";

class subpage {
    constructor(src, text){
        this.src = src;
        this.text = text;
    }
}

let subpages = [
    new subpage(`index.html`, `Home`), 
    new subpage(`Projects.html`, `Projects`)
];

/**
 * @return {DocumentFragment}
 */
function constructHeader() {
    const hObj = document.createElement("header");
    document.body.insertBefore(hObj, document.body.firstChild);

    const titleText = document.createElement("h1");
    titleText.textContent = "Jonathan Martin";
    hObj.appendChild(titleText);

    const nav = document.createElement("nav");
    nav.id = "nav";
    hObj.appendChild(nav);

    const menuContainer = document.createElement("div");
    menuContainer.classList = "menu-container"
    const menu = document.createElement("button");
    menu.classList = "menu";
    menu.textContent = "Menu";

    const lightModeToggle = document.createElement("label");
    const lightModeInput = document.createElement("input");
    const lightModeText = document.createElement("p");
    lightModeText.textContent = "Light Mode";
    lightModeInput.setAttribute("type", "checkbox");
    lightModeInput.setAttribute("autocomplete", "off");
    lightModeInput.classList = "checkbox";
    lightModeToggle.appendChild(lightModeInput);
    lightModeToggle.appendChild(lightModeText);

    menuContainer.appendChild(lightModeToggle);
    menuContainer.appendChild(menu);
    hObj.appendChild(menuContainer);

    const status = localStorage.getItem("light-mode");
    if(status && localStorage.getItem("light-mode") === "on"){
        document.body.classList.toggle("light-mode");
        lightModeInput.setAttribute("autocomplete", "on");
        lightModeInput.setAttribute("checked", "on");
    }

    return hObj;
}

function addSubpage(nav, sPage) {
    if(nav){
        const sPageObj = toHtmlElement.toHtmlElement(`<a href="${sPage.src}">${sPage.text}</a>`)
        nav.appendChild(sPageObj);
    }else{
        console.log("addSubpage error");
    }
}

function main(){

    // creates header using JS and initializes button, nav, checkbox varriables
    constructHeader();
    const nav = document.getElementById("nav");
    const button = document.getElementsByClassName("menu")[0];
    const checkbox = document.getElementsByClassName("checkbox")[0];
    subpages.forEach((sPage) => {addSubpage(nav, sPage)});
    
    //adds eventListener to button and initializes hidden nav bar
    nav.classList.toggle("closed");
    button.addEventListener("click", (e) => {
        nav.classList.toggle("closed");
    });

    // closes nav bar when not clicking button
    document.body.addEventListener("click", (e) => {
        if(e.target.classList !== button.classList){
            nav.classList = "closed";
        }
    })

    checkbox.addEventListener("change", (e) => {
        document.body.classList.toggle("light-mode");
        const status = localStorage.getItem("light-mode");
        if(status === "on"){
            localStorage.setItem("light-mode", "off");
        }else{
            localStorage.setItem("light-mode", "on");
        }
    });
}

main();


