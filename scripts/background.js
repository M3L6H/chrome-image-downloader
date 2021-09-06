chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log("Receiving message...", request);
  
  if (!sender.tab) sendResponse(null);
  if (! request || ! request.src) sendResponse(null);
  const { src } = request;

  const urlPieces = src.split("/");
  const name = urlPieces[urlPieces.length - 1].split("?")[0];

  chrome.storage.sync.get("filepath", data => {
    chrome.downloads.setShelfEnabled(false);
    chrome.downloads.download({
      url: src,
      filename: `${data.filepath || ""}/${name}`,
      conflictAction: "uniquify"
    }, id => {
      chrome.downloads.onChanged.addListener(delta => {
        if (delta.id !== id) return;
        if (delta.state && delta.state.current !== "in_progress") {
          sendResponse(delta.state.current === "complete");
        }
      });
    });
  });

  return true;
});
