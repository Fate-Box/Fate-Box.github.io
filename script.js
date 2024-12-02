const getOmikujiResult = async (name) => {
    try {
        const response = await axios.get(`https://fate-box-api.onrender.com/omikuji/${name}`);
        return {
            result: response.data.divination,  // おみくじの結果
            fortune: response.data.fortune,   // 詳細
            imageUrl: response.data.image_url // 画像URL
        };
    } catch (error) {
        console.error("おみくじAPIの取得に失敗しました:", error);
        return { result: 'エラーが発生しました', fortune: '', imageUrl: '' };
    }
};

document.getElementById('draw-button').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert("名前を入力してください！");
        return;
    }

    const resultArea = document.getElementById('result-area');
    const resultText = document.getElementById('omikuji-result');
    const detailText = document.getElementById('omikuji-detail');
    const imageElement = document.getElementById('omikuji-image');

    // ローディングメッセージ
    resultText.textContent = "おみくじを引いています...";
    detailText.textContent = "";
    imageElement.style.display = "none";

    // APIリクエストを実行
    const data = await getOmikujiResult(name);

    // 結果を表示
    resultText.textContent = `${name}さんの結果は「${data.result}」です！`;
    detailText.textContent = data.fortune || "詳細はありません。";
    if (data.imageUrl) {
        imageElement.src = `https://fate-box-api.onrender.com${data.imageUrl}`;
        imageElement.style.display = "block";
    }
});
