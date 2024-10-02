document.getElementById("colorPicker").addEventListener("input", event => {
    changeBackground(event.target.value)
})

const colors = ["#fffaec", "#f8f3e7", "#d9d9d9", "#bdbdbd"]

for (var i = 0; i < 4; i++) {
    let ele = document.getElementById(`color${i}`)
    let color = colors[i]
    ele.addEventListener("click", () => {
        changeBackground(color)
    })
    ele.style.backgroundColor = color
}

// chrome.webNavigation.onCommitted.addListener(function(details) {
//     if (details.transitionType === 'reload' || details.transitionType === 'auto_subframe') {
//         // Page is being reloaded or refreshed, handle accordingly
//         console.log('reloaded');
//     }
//     console.log(details);
// });
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

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    if (msg.action == 'change_background') {
        console.log('msg received');
    }
});
function changeBackground(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        var url = new URL(tabs[0].url); //window.location.host;
        console.log(url);
        debugger;
        var tvmh2 = {};
        tvmh2[url.hostname] = color;
        chrome.storage.local.set(tvmh2, function() {
            console.log('Settings saved');
            debugger;
        });
        chrome.storage.local.get(url.hostname, function(tvmh) {
            debugger;
            console.log("tvmh", tvmh)
        });
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: changeBackgroundColor,
            args: [color],
        })
    })
}

function changeBackgroundColor(color) {
    document.getElementById("jira-frontend").style.background = color;
    console.log(color);
}

function savePreferenceByDomain(domain, color) {
    chrome.storage.sync.set({ domain: color}, function() {
        console.log('Settings saved');
    });
}

function getPreferenceByDomain(domain) {
    chrome.storage.sync.get(domain, function(color) {
        console.log('Settings retrieved', color);
    });
}