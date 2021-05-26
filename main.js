let urlInput = document.getElementById("url");
let sizeInput = document.getElementById("size");
let formatInput = document.getElementById("format");
let submitButton = document.getElementById("submit");
let imgContainer = document.getElementById("imgContainer");

for (let i = 1; i <= 20; i++) {
  option = document.createElement("OPTION");
  let rez = i * 20;
  option.value = rez;
  option.innerHTML = rez + "x" + rez;
  sizeInput.appendChild(option);
}

sizeInput.value = 120;

request = () => {
    if (urlInput.value == "") return;
  submitButton.disabled = true;
  submitButton.value = "Loading...";
  url = "https://api.qrserver.com/v1/create-qr-code/?data=";
  url += urlInput.value;
  url += "&size=" + sizeInput.value + "x" + sizeInput.value;
  url += "&format=" + formatInput.value;
  fetch(url)
    .then((response) => response.blob())
    .then((image) => {
      img = document.createElement("img");
      img.src = URL.createObjectURL(image);
      while (imgContainer.hasChildNodes())
        imgContainer.removeChild(imgContainer.firstChild);
      imgContainer.appendChild(img);
    })
    .catch((e) => console.log(e));
  submitButton.disabled = false;
  submitButton.value = "Generate";
  urlInput.value = "";
};

submitButton.addEventListener("click", request);
