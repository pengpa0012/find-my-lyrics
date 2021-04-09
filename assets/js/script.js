const submitBtn = document.querySelector('input[type="submit"]');
const artistName = document.querySelector("[data-artist]");
const songName = document.querySelector("[data-song]");
const lyricsContainer = document.querySelector(".content");
const loader = document.querySelector(".loader");
const copyBtn = document.querySelector(".copy");

submitBtn.addEventListener("click", () => {
  if (artistName.value === "" || songName.value === "") {
    alert("Complete all the inputs.");
    return;
  }

  // hide copy button
  copyBtn.classList.remove("active");
  // insert loader
  lyricsContainer.innerHTML = `<div class="loader lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>`;

  // fetch lyrics
  fetch(`https://api.lyrics.ovh/v1/${artistName.value}/${songName.value}`)
    .then((response) => response.json())
    .then((data) => {
      // removed loader
      lyricsContainer.innerHTML = "";
      // insert lyrics container
      lyricsContainer.innerHTML += `<h3 class="fs-3 mb-2">-${songName.value.toUpperCase()}-</h3>`;
      let formattedLyrics = data.lyrics.split("\n");
      for (let i = 0; i <= formattedLyrics.length - 1; i++) {
        lyricsContainer.innerHTML += formattedLyrics[i] + "<br>";
      }
      // show copy button
      copyBtn.classList.add("active");
    })
    .catch((err) => {
      lyricsContainer.innerHTML = `<h2 class="fs-2">Make sure you spelled it correctly <br> and     have the right spacing 😉😉😉</h2>`;
    });
});

// copy to clipboard
copyBtn.addEventListener("click", () => {
  const elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = lyricsContainer.innerText;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
});

// modal function
const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", function () {
  myInput.focus();
});
