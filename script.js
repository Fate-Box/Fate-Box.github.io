// おみくじAPIから結果を取得する関数
const getOmikujiResult = async (name) => {
    try {
        const baseUrl = "https://fate-box-api.onrender.com";
        const response = await axios.get(`${baseUrl}/omikuji/${name}`);
        
        if (response.status === 200) {
            const data = response.data;
            return {
                result: data.divination,
                fortune: data.fortune,
                imageUrl: `${baseUrl}${data.image_url}`
            };
        } else {
            console.error("APIレスポンスに問題があります:", response.status);
            return { result: 'エラーが発生しました', fortune: '', imageUrl: '' };
        }
    } catch (error) {
        console.error("おみくじAPIの取得に失敗しました:", error);
        return { result: 'エラーが発生しました', fortune: '', imageUrl: '' };
    }
};

// ボタンクリックイベント
document.getElementById('draw-button').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert("名前を入力してください！");
        return;
    }

    const resultText = document.getElementById('omikuji-result');
    const detailText = document.getElementById('omikuji-detail');
    const imageElement = document.getElementById('omikuji-image');
    const loadingSpinner = document.getElementById('loading-spinner');

    resultText.textContent = "";
    detailText.textContent = "";
    imageElement.style.display = "none";

    loadingSpinner.style.display = "block";

    const data = await getOmikujiResult(name);

    loadingSpinner.style.display = "none";

    resultText.textContent = `${name}さんの結果は「${data.result}」です！`;
    detailText.textContent = data.fortune || "詳細はありません。";

    if (data.imageUrl) {
        imageElement.src = data.imageUrl;
        imageElement.style.display = "block";
    }
});
