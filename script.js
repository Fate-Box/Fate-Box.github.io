document.getElementById("draw-button").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    if (!name) {
        alert("名前を入力してください！");
        return;
    }

    try {
        const response = await fetch(`https://fate-box-api.onrender.com/omikuji/${name}`);
        if (response.ok) {
            const data = await response.json();
            document.getElementById("name-result").textContent = `${data.name}さんの結果は...`;
            document.getElementById("fortune-result").textContent = `「${data.divination}」です！`;
            const imageElement = document.getElementById("fortune-image");
            imageElement.src = `https://fate-box-api.onrender.com${data.image_url}`;
            imageElement.style.display = "block";
        } else {
            alert("おみくじ結果の取得に失敗しました。");
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
        alert("エラーが発生しました。");
    }
});
