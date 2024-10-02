
chrome.storage.local.get('', ({ backgroundColor }) => {
    document.body.style.backgroundColor = backgroundColor;
});

// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     console.log(tabs);
//     debugger;
//     if (!tabs[0].url) {
//         return;
//     }
//     var url = new URL(tabs[0].url); //window.location.host;
//     console.log(url);
//
//     chrome.storage.local.get(domain, function(tvmh) {
//         debugger;
//         console.log("tvmh2", tvmh)
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             function: changeBackgroundColor,
//             args: [tvmh.color],
//         })
//     });
// })
document.getElementById("jira-frontend").style.background = color;
