const images = document.getElementsByTagName("img");

for (const img of images) {
  const container = document.createElement("div");
  container.classList.add("img-downloader-div");
  img.parentNode.replaceChild(container, img);
  container.appendChild(img);
  
  const button = document.createElement("button");
  button.innerHTML = "+";
  button.classList.add("img-downloader-button");

  button.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    button.disabled = true;
    button.innerHTML = "…";

    // console.log(`Sending message with ${img.src}...`);
    
    chrome.runtime.sendMessage({ src: img.src }, (success) => {
      button.disabled = false;

      if (success) {
        button.innerHTML = "✔";
      } else {
        button.innerHTML = "×";
      }

      setTimeout(() => button.innerHTML = "+", 500);
    });
  }, true);

  document.addEventListener("mousemove", e => {
    const rect = img.getBoundingClientRect();
    
    if (e.clientX <= rect.right && e.clientX >= rect.x && e.clientY <= rect.bottom && e.clientY >= rect.y) {
      button.classList.add("img-downloader-show");
    } else {
      button.classList.remove("img-downloader-show");
    }
  });

  container.appendChild(button);
}
