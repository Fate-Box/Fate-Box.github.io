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

const API_URL = "https://fate-box-api.onrender.com/"; // APIのURL
const progressBar = document.getElementById("progress-bar");
const progressPercent = document.getElementById("progress-percent");
const resultArea = document.getElementById("result-area");

/**
 * 進捗状況を取得して更新
 */
async function updateProgress() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("APIの取得に失敗しました");
        }

        const data = await response.json();
        const progress = Math.min(Math.max(data.progress, 0), 100); // 進捗率（0〜100に制限）

        // 進捗バーの幅を更新
        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${progress}%`;

        // 進捗完了時
        if (progress === 100) {
            resultArea.style.display = "block";
        } else {
            resultArea.style.display = "none";
        }
    } catch (error) {
        console.error("進捗更新エラー:", error);
    }
}

// 一時間ごとに更新
updateProgress();
setInterval(updateProgress, 3600000); // 1時間（3600000ms）
