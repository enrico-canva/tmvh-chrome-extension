chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentScript.js']
        });
    }
});