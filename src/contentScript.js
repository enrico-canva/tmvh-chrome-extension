chrome.storage.sync.get('backgroundColors', (data) => {
    const backgroundColors = data.backgroundColors || {};
    const host = window.location.hostname;

    if (backgroundColors[host]) {
        document.getElementById("jira-frontend").style.background = backgroundColors[host];
    }
});