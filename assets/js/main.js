getData().then((response) => {});

if (window.devicePixelRatio > 1) {
    document.body.style.zoom = 0.8; // Adjust zoom for high-DPI screens
}

async function getData() {
    const user     = "Embact";
    const Repo     = "Metadata-Viewer";
    const RepoUrl  = `https://github.com/${user}/${Repo}`;
    const latest   = `https://api.github.com/repos/${user}/${Repo}/releases/latest`;
    
    let githubBadge = document.querySelector(".badge-link");
    githubBadge.href = RepoUrl;

    try {
        const response = await fetch(latest);

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);


        const data = await response.json();

        if (!data) 
            throw new Error(`No Data!`);
        
        // Update Version
        if (data.name) {
            let version = document.getElementById("version");
            version.innerText = data.name;
        }
        
        // Handle Asset
        if (data.assets.length > 0) {
            let size = document.getElementById("size");
            let url  = document.getElementById("url");

            // Update Size
            if(data.assets[0]?.size)
                size.innerText = "Size " + formatSize(data.assets[0].size);

            // Update Download URL
            if(data.assets[0]?.browser_download_url)
                url.href = data.assets[0]?.browser_download_url;
        }

    } catch (error) {
        console.error(error.message);
    }
}

function formatSize(bytes) {
    const kb = 1024;
    const mb = kb * 1024;

    if (bytes >= mb) {
        return (bytes / mb).toFixed(2) + ' MB';
    } else if (bytes >= kb) {
        return (bytes / kb).toFixed(2) + ' KB';
    } else {
        return bytes + ' byte';
    }
}