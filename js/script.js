const layout = document.querySelector(".ct-layout");
const overlay = document.querySelector(".ct-overlay");
const overlayImage = document.querySelector("img");
const overlayClose = document.querySelector(".ct-close");

fetch(
  "https://api.giphy.com/v1/gifs/trending?api_key=r7z00ftovfoniicgQnaemALTBSx3umZV"
)
  .then(data => data.json())
  .then(gifs => {
    console.log(gifs);
    // layout.innerHTML=createMarkup(gifs,[h,v]);
    const digits = Array.from({ length: 50 }, () => {
	  return [randomNumber(4), randomNumber(4)]    });
    layout.innerHTML = createMarkup(gifs, digits);
  })
  .catch(err => {
    console.log(err);
  });

function createMarkup(gifs, digits) {
  return gifs.data
    .map((value, index) => {
	  const digit = digits[index];
	  let height=[];
	  height.push(value.images.original.height)
	  
  console.log(height);
	  
      return `
			<div class="ct-grid__item h${digit[0]} v${digit[1]}" id="${value.id}">
				<img class="ct-gif" src="${value.images.original.url}" alt=""/>
				<div class="ct-grid__item--overlay">
					<button>View</button>
				</div>
			</div>`;
    })
    .join("");
}

function randomNumber(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

