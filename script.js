const apiKey = "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";

const maxImages = 4;
let selectedImageNumber = null;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableGenerateButton() {
    const defaultBtn = document.getElementById("default-generate");
    const fluentBtn = document.getElementById("fluent-generate");
    if (defaultBtn) defaultBtn.disabled = true;
    if (fluentBtn) fluentBtn.disabled = true;
}

function enableGenerateButton() {
    const defaultBtn = document.getElementById("default-generate");
    const fluentBtn = document.getElementById("fluent-generate");
    if (defaultBtn) defaultBtn.disabled = false;
    if (fluentBtn) fluentBtn.disabled = false;
}

function clearImageGrid() {
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}

async function generateImages(input) {
    disableGenerateButton();
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    for (let i = 0; i < maxImages; i++) {
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `${input} ${randomNumber}`;

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/Linaqruf/anything-v3-1",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({ inputs: prompt }),
                }
            );

            if (!response.ok) {
                alert("Failed to generate image:", response.statusText);
                continue;
            }

            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);

            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = `art-${i + 1}`;
            img.onclick = () => downloadImage(imgUrl, i);
            document.getElementById("image-grid").appendChild(img);
        } catch (error) {
            alert("Error during image generation:", error);
        }
    }

    loading.style.display = "none";
    enableGenerateButton();
}


document.addEventListener('click', (event) => {
  if (event.target && (event.target.id === 'default-generate' || event.target.id === 'fluent-generate')) {
    const inputElement = document.getElementById(event.target.id === 'default-generate' ? "default-user-prompt" : "fluent-user-prompt");
    const input = inputElement.value;
    generateImages(input);
  }
});


function downloadImage(imgUrl, imageNumber) {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = `image-${imageNumber + 1}.jpg`;
    link.click();

setTimeout(() => URL.revokeObjectURL(imgUrl), 1000);
}
