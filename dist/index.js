"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.querySelector("input");
const btn = document.querySelector(".header button");
const dataDiv = document.querySelector(".data");
btn.addEventListener("click", () => {
    if (input.value == "") {
        const span = dataDiv.childNodes[1];
        span.innerHTML = "plz put your name";
    }
    else {
        getData();
    }
});
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.github.com/users/${input.value}/repos`);
            const data = yield response.json();
            dataDiv.innerHTML = "";
            data.forEach((e) => {
                const repo = document.createElement("div");
                repo.classList.add("repo");
                const img = document.createElement("img");
                img.setAttribute("src", `${e.owner.avatar_url}`);
                repo.appendChild(img);
                const name = document.createElement("p");
                name.appendChild(document.createTextNode(`${e.name}`));
                repo.appendChild(name);
                const vistBtn = document.createElement("a");
                vistBtn.appendChild(document.createTextNode("visit"));
                vistBtn.setAttribute("href", `https://github.com/${input.value}/${e.name}`);
                vistBtn.setAttribute("target", "_blank");
                repo.appendChild(vistBtn);
                const page = document.createElement("a");
                page.appendChild(document.createTextNode("page"));
                page.setAttribute("href", `https://${input.value}.github.io/${e.name}`);
                page.setAttribute("target", "_blank");
                repo.appendChild(page);
                dataDiv.appendChild(repo);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
