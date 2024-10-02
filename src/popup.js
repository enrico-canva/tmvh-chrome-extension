document.getElementById('apply').addEventListener('click', () => {
    const color = document.getElementById('colorPicker').value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const url = new URL(tab.url);
        const host = url.hostname;

        chrome.storage.sync.get('backgroundColors', (data) => {
            const backgroundColors = data.backgroundColors || {};
            backgroundColors[host] = color;

            chrome.storage.sync.set({ backgroundColors }, () => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: changeBackgroundColor,
                    args: [color]
                });
            });
        });
    });
});

document.getElementById('reset').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const url = new URL(tab.url);
        const host = url.hostname;

        chrome.storage.sync.get('backgroundColors', (data) => {
            const backgroundColors = data.backgroundColors || {};
            delete backgroundColors[host];

            chrome.storage.sync.set({ backgroundColors }, () => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: resetBackgroundColor
                });
            });
        });
    });
});

function changeBackgroundColor(color) {
    document.getElementById("jira-frontend").style.background = color;
}

function resetBackgroundColor() {
    document.getElementById("jira-frontend").style.background = '';
}
