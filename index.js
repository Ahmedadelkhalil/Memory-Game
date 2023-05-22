document.querySelector(".control-buttons span").onclick = () => {
  let yourName = prompt("Whats Your Name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "UnKnown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocks_container = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocks_container.children);
let blocks_order = [...Array(blocks.length).keys()];
console.log(blocks_order);
shuffle(blocks_order);
console.log(blocks_order);
blocks.forEach((block, index) => {
  block.style.order = blocks_order[index];
  block.addEventListener("click", () => {
    flippedblocks(block);
  });
});

function shuffle(array) {
  let current = array.length;
  let temp;
  let random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function flippedblocks(selectedblock) {
  selectedblock.classList.add("is-flipped");

  let allflippedblocks = blocks.filter((flippedblock) =>
    flippedblock.classList.contains("is-flipped")
  );

  if (allflippedblocks.length === 2) {
    stopclicking();
    checkingblocks(allflippedblocks[0], allflippedblocks[1]);
  }
}
function stopclicking() {
  blocks_container.classList.add("stop-clicking");

  setTimeout(() => {
    blocks_container.classList.remove("stop-clicking");
  }, duration);
}

function checkingblocks(flipblockone, flipblocktwo) {
  let Wrongtries = document.querySelector(".tries span");

  if (flipblockone.dataset.tech === flipblocktwo.dataset.tech) {
    flipblockone.classList.remove("is-flipped");
    flipblocktwo.classList.remove("is-flipped");

    flipblockone.classList.add("get-matched");
    flipblocktwo.classList.add("get-matched");
  } else {
    Wrongtries.innerHTML = parseInt(Wrongtries.innerHTML) + 1;

    setTimeout(() => {
      flipblockone.classList.remove("is-flipped");
      flipblocktwo.classList.remove("is-flipped");
    }, duration);
  }
}
