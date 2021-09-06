document.addEventListener("DOMContentLoaded", () => {
  const filepath_input = document.getElementById("filepath");
  
  chrome.storage.sync.get("filepath", data => {
    filepath_input.value = data.filepath || "";
  });

  filepath_input.addEventListener("change", savePath);
})

function savePath(e) {
  chrome.storage.sync.set({ filepath: e.target.value });
}
