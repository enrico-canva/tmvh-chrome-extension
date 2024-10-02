// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete') {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ['content-script.js']
//         });
//     }
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // Fetch the updated tab information, which includes the URL
        chrome.tabs.sendMessage(tabId, {action: "change_background"}, function(response) {});
    }
});