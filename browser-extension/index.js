async function sayHello() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.exectuteScript({
        target: { tabId: tab.id },
        func: () => {
            alert("Hello from my exstension!");
        }
    })
}

document.getElementById('myButton').addEventListener('click', sayHello)