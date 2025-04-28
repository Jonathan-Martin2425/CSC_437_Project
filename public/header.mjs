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

    const menu = document.createElement("button");
    menu.classList = "menu";
    menu.textContent = "Menu";
    hObj.appendChild(menu);

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

    // creates header using JS and initializes button and nav varriables
    constructHeader();
    const nav = document.getElementById("nav");
    const button = document.getElementsByClassName("menu")[0];
    subpages.forEach((sPage) => {addSubpage(nav, sPage)});
    
    //adds eventListener to button and initializes hidden nav bar
    nav.classList.toggle("closed");
    button.addEventListener("click", (e) => {
        nav.classList.toggle("closed");
        console.log("clicked");
    });

    // closes nav bar when not clicking button
    document.body.addEventListener("click", (e) => {
        if(e.target.classList !== button.classList){
            nav.classList = "closed";
        }
    })
}

main();


