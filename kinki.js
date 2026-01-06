let score = 0;
let round = 0;
let totalRounds = 7;
let panorama;

// 予測してもらう場所リスト
// ★変更: description (解説文) プロパティを各場所に追加しました
var places = [
 [{ lat: 34.651451, lng: 135.505913 }, { country: '大阪府', description: '「なにわのシンボルの展望塔『通天閣』。明治45年（1912年）、新世界のシンボルとして、パリのエッフェル塔を模して作られたのが始まりです。現在の通天閣は二代目で、1956年に完成しました。頂上の丸いネオンは、色の組み合わせで明日の天気を知らせる『光の天気予報』になっています。」', hint: '「なにわのシンボル」として親しまれているタワーで、その名前は「天に通じる高い建物」という意味です。' }],
 [{ lat: 34.998074, lng: 135.780410 }, { country: '京都府', description: '「重要伝統的建造物群保存地区に指定されているこの周辺は、石畳の道に格子戸の京町家が並ぶ、京都ならではの風情あるエリアです。遺産『清水寺』へと続く参道は、土産物屋やカフェが軒を連ね、常に多くの観光客で賑わっています。」', hint: '「清水の舞台」で有名な世界遺産のお寺へと続く、賑やかな参道です。' }],
 [{ lat: 34.722363, lng: 135.362081 }, { country: '兵庫県', description: '「大正13年（1924年）8月1日に誕生した甲子園球場は、2024年に100周年を迎えました。完成した年が『甲子（きのえね）』という60年に1度の縁起の良い年だったことから、『甲子園大運動場』と名付けられました（現在の阪神甲子園球場）。以来、高校野球の聖地として、数々のドラマを生んできました。」。', hint: '「阪神タイガース」の本拠地なので大阪にあると思われがちですが、実はこの県（西宮市）にあります。' }],
 [{ lat: 34.684485, lng: 135.841806 }, { country: '奈良県', description: '「奈良公園は、660ヘクタールの広大な地域にまたがり、貴重な歴史的文化遺産を包蔵する東大寺、興福寺、春日大社などをとりまく雄大で豊かな緑の自然美が調和しています。 奈良公園にいるシカは、野生動物として国の天然記念物に指定されています。春日大社の祭神、武甕槌命（タケミカヅチノミコト）が白い鹿に乗ってやってきたという伝説から『神の使い』として古くから手厚く保護されてきました。」', hint: '公園や道路で、たくさんの「鹿」が放し飼いにされています。彼らは国の天然記念物です。' }],
 [{ lat: 33.669264, lng: 135.890514 }, { country: '和歌山県', description: '「熊野那智大社は、那智の滝を御神体とする自然崇拝からおこった社です。境内にある『御縣彦社（みあがたひこしゃ）』には、神武天皇を大和（奈良県）へ道案内したとされる三本足のカラス『八咫烏（やたがらす）』が祀られています。 八咫烏は、より良い方向へ導く『導きの神様』とされ、日本サッカー協会のシンボルマークとしても有名です。」', hint: '467段の石段を登った先にあり、近くにある巨大な「那智の滝」を本来の神様として祀っています。' }],
 [{ lat: 35.474228, lng: 136.036488 }, { country: '滋賀県', description: '「マキノ高原へのアプローチ道として、全長約2.4km、ただひたすらまっすぐと続く並木道。約500本のメタセコイアの木は、春の芽吹き・新緑、夏の深緑、秋の紅葉、冬の裸樹・雪花と四季折々に美しい景観を見せ、遠景となる野坂山地の山々とも調和し、訪れる人々を魅了します。 平成6年には、読売新聞社の『新・日本街路樹百景』に選定されました。」', hint: '日本一大きな湖「琵琶湖」の北側に位置し、春の緑、秋の紅葉、冬の雪景色と、四季折々の色が楽しめます。' }],
 [{ lat: 34.845581, lng: 136.538030 }, { country: '三重県', description: '「鈴鹿サーキットは、1962年に日本初の本格的な国際レーシングコースとして誕生しました。  東西に細長いコースの中央付近で、立体交差を挟んで右回りと左回りが入れ替わる、世界でも珍しい『8の字レイアウト』が特徴です。ドライバーの技術が試される難コースとして、世界のF1ドライバーからも高く評価されています。」', hint: '世界最高峰の自動車レース「F1日本グランプリ」が開催される、モータースポーツの聖地です。' }],


];


let remainingPlaces = [...places]; // 出題する場所リストをコピー
let currentPlace = null;

// 場所を選択し、出題済みリストから削除
function selectRandomPlace() {
 const randomIndex = Math.floor(Math.random() * remainingPlaces.length);
 currentPlace = remainingPlaces.splice(randomIndex, 1)[0]; // 出題済みリストから削除
 return currentPlace;
}

let coordinates = selectRandomPlace()[0];
let country = currentPlace[1].country;

// 回答終了時に再読み込み
let reconfigure = () => {
 round++;

 if (round >= totalRounds) {
 // 10ラウンド終了後、結果画面を表示
 showResultScreen();
 return;
 }

 document.getElementById("score").innerHTML = "現在のスコア: " + score;
 let newPlace = selectRandomPlace();
 coordinates = newPlace[0];
 country = newPlace[1].country;
 initialize();
 setChoices(); // 4択を更新

 // ★追加：次の問題に移る際、モーダルが開いていれば閉じる
 closeHintModal();
}

// 4択の選択肢をランダムに設定
const setChoices = () => {
 let choices = new Set();
 choices.add(country); // 正解をまず追加

 // ランダムに残りの選択肢を追加
 while (choices.size < 4) {
 let randomPlace = places[Math.floor(Math.random() * places.length)][1].country;
 choices.add(randomPlace);
 }

 let choicesArray = Array.from(choices); // Setから配列に変換

 // シャッフル
 choicesArray.sort(() => Math.random() - 0.5);

 // ボタンに選択肢を反映
 const buttons = document.querySelectorAll('.choice');
 buttons.forEach((button, index) => {
 button.innerHTML = choicesArray[index];
 button.onclick = () => checkAnswer(choicesArray[index]);
 });
}

// 回答のチェック
const checkAnswer = (guess) => {
    // ★変更：現在の場所の解説を取得
 const description = currentPlace[1].description;
 if (guess === country) {
 score++;
 alert("正解！ 現在のスコア: " + score);
 } else {
 alert("不正解... 正解は " + country + " です。現在のスコア: " + score);
 }

 // ★追加：解説ポップアップ
 if (description) {
 // \n はアラート内で改行されます
 alert("【解説】\n" + description);
 } else {
 // descriptionが未設定の場合のフォールバック
 alert("【解説】\nこの場所の解説はまだ登録されていません。");
 }

 reconfigure();
}

// ストリートビュー初期設定
function initialize() {
 panorama = new google.maps.StreetViewPanorama(
 document.getElementById("street-view"),
 {
 position: coordinates,
 pov: { heading: 165, pitch: 0 },
 zoom: 1,
 }
 );
 setChoices();
}

// 結果画面の表示
function showResultScreen() {
 document.getElementById("street-view").style.display = "none";
 document.getElementById("floating-panel").style.display = "none";
 document.getElementById("result-screen").style.display = "flex";

 document.getElementById("final-score").innerHTML = "最終スコア: " + score;
 document.getElementById("final-round").innerHTML = "ラウンド数: " + totalRounds;

  // ★追加：結果画面表示時にもモーダルを閉じる
 closeHintModal();
}

// --- ★ここからヒントモーダル用のコードを追加 ---

// グローバルスコープでモーダル関連の要素を保持する変数を宣言
let hintButton;
let modalOverlay;
let modalDialog;
let modalContent;
let modalCloseBtn;

// モーダルを開く関数
function openHintModal() {
    if (currentPlace && currentPlace[1].hint) {
        // 現在の場所のヒントを取得
        const hintText = currentPlace[1].hint;
        // モーダルの内容にヒントを設定
        modalContent.innerHTML = `<p>${hintText}</p>`;
    } else {
        modalContent.innerHTML = `<p>この場所のヒントはありません。</p>`;
    }

    // モーダルとオーバーレイを表示
    modalOverlay.classList.remove('hidden');
    modalDialog.classList.remove('hidden');
}

// モーダルを閉じる関数
function closeHintModal() {
    if (modalOverlay && modalDialog) {
        modalOverlay.classList.add('hidden');
        modalDialog.classList.add('hidden');
    }
}

// DOMが読み込まれたら、モーダル用のイベントリスナーを設定
// APIの読み込み(api.js)と非同期になる可能性を考慮し、DOMContentLoadedを使用
document.addEventListener('DOMContentLoaded', () => {
    // 要素を取得
    hintButton = document.getElementById('hint-button');
    modalOverlay = document.getElementById('modal-overlay');
    modalDialog = document.getElementById('modal-dialog');
    modalContent = document.getElementById('modal-content');
    modalCloseBtn = document.getElementById('modal-close-btn');

    // nullチェック (要素が正しく読み込まれたか確認)
    if (hintButton && modalOverlay && modalDialog && modalContent && modalCloseBtn) {
        // ヒントボタンのクリックイベント
        hintButton.addEventListener('click', openHintModal);

        // 閉じるボタンのクリックイベント
        modalCloseBtn.addEventListener('click', closeHintModal);

        // オーバーレイ（背景）のクリックイベント
        modalOverlay.addEventListener('click', closeHintModal);
    } else {
        console.error('ヒントモーダルの要素が見つかりません。HTMLのIDを確認してください。');
    }
});

window.initialize = initialize;
window.setChoices = setChoices;
// --- ★ここまでヒントモーダル用のコードを追加