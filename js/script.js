const layout = document.querySelector(".ct-layout");
const overlay = document.querySelector(".ct-overlay");
const overlayImage = document.querySelector("img");
const overlayClose = document.querySelector(".ct-close");

fetch(
  "https://api.giphy.com/v1/gifs/trending?api_key=r7z00ftovfoniicgQnaemALTBSx3umZV"
)
  .then(data => data.json())
  .then(gifs => {
    const digits = Array.from({ length: 50 }, () => {
      return [randomNumber(4), randomNumber(4)];
    });
    layout.innerHTML = createMarkup(gifs, digits);
    const items = document.querySelectorAll(".ct-grid__item");
	items.forEach(item => item.addEventListener("click", handleClick));
	overlayClose.addEventListener('click',closeOverlay);
  })
  .catch(err => {
    console.log(err);
  });

function createMarkup(gifs, digits) {
  return gifs.data
    .map((value, index) => {
      const digit = digits[index];
      let height = [];
      height.push(value.images.original.height);
      return `
			<div class="ct-grid__item h${digit[0]} v${digit[1]}" id="${value.id}">
				<img class="ct-gif" src="${value.images.original.url}" alt=""/>
				<div class="ct-grid__item--overlay">
					<button>View&#8594;</button>
				</div>
			</div>`;
    })
    .join("");
}

function randomNumber(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

function handleClick(e) {
  console.log(e.currentTarget);
  const src = e.currentTarget.querySelector("img").src;
  overlayImage.src = src;
  overlay.classList.add("ct-open");
}

function closeOverlay() {
  overlay.classList.remove("ct-open");
}

// console.log(items);
