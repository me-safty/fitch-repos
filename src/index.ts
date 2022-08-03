const input = document.querySelector("input") as HTMLInputElement;
const btn = document.querySelector(".header button") as HTMLButtonElement;
const dataDiv = document.querySelector(".data") as HTMLDivElement

btn.addEventListener("click", () => {
  if (input.value == "") {
    const span = dataDiv.childNodes[1] as HTMLSpanElement 
    span.innerHTML = "plz put your name"
  } else {
    getData();
  }
});

async function getData(): Promise<void> {
  try {
    const response = await fetch(`https://api.github.com/users/${input.value}/repos`)
    const data = await response.json()
    // console.log(data[0]);
    dataDiv.innerHTML = ""
    data.forEach((e: { owner: { avatar_url: string; }; name: string; }) => {
      const repo = document.createElement("div") as HTMLDivElement
      repo.classList.add("repo")
      const img = document.createElement("img") as HTMLImageElement
      img.setAttribute("src", `${e.owner.avatar_url}`)
      repo.appendChild(img)

      const name = document.createElement("p") as HTMLParagraphElement
      name.appendChild(document.createTextNode(`${e.name}`))
      repo.appendChild(name)

      const vistBtn = document.createElement("a") as HTMLAnchorElement
      vistBtn.appendChild(document.createTextNode("visit"))
      vistBtn.setAttribute("href", `https://github.com/${input.value}/${e.name}`)
      vistBtn.setAttribute("target", "_blank")
      repo.appendChild(vistBtn)

      const page = document.createElement("a") as HTMLAnchorElement
      page.appendChild(document.createTextNode("page"))
      page.setAttribute("href", `https://${input.value}.github.io/${e.name}`)
      page.setAttribute("target", "_blank")
      repo.appendChild(page)
      //========
      dataDiv.appendChild(repo)
    });
  } catch (error) { 
    console.log(error);
  }
}
