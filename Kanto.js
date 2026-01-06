let score = 0;
let round = 0;
let totalRounds = 7;
let panorama;

// 予測してもらう場所リスト
// ★変更: description (解説文) プロパティを各場所に追加しました
var places = [
 [{ lat: 35.709769, lng: 139.811677 }, { country: '東京都', description: '「東京スカイツリーは、ギネスワールドレコーズ社より『世界一高いタワー』として認定されました。その高さは、634m。 （中略） 634＝むさし。この響きは、日本人にとってなじみ深い言葉であるだけでなく、かつてこの地域が武蔵の国（むさしのくに）と呼ばれていたことからも、東京スカイツリーにふさわしい高さと言えるでしょう。」', hint: 'その高さは「ムサシ（634m）」と覚えられています。世界一高い電波塔です。' }],
 [{ lat: 35.306717, lng: 139.502092 }, { country: '神奈川県', description: '「江ノ島電鉄『鎌倉高校前』駅の踏切は、人気アニメ『SLAM DUNK（スラムダンク）』のオープニングシーンに登場することで知られ、台湾などの海外からも多くの観光客が訪れる『聖地』となっています。目線の先に海が広がる絶好のロケーション。電車が通過するタイミングを狙って、多くの人がカメラを構えます。」', hint: 'バスケ漫画『SLAM DUNK（スラムダンク）』のオープニングに登場する「聖地」として、世界中からファンが訪れる踏切です。' }],
 [{ lat: 35.638544, lng: 139.876906 }, { country: '千葉県', description: '「千葉県浦安市舞浜にある東京ディズニーランドと東京ディズニーシー。名前に『東京』と付きますが、所在地は千葉県です。 （中略） 当時、世界的に知名度の高い『TOKYO』を冠にすることで、ここが日本のどこにあるテーマパークなのかを広くアピールする意図があったといわれています。」', hint: 'この県は醤油の生産量が日本一で、落花生（ピーナッツ）も有名です。' }],
 [{ lat: 35.769537, lng: 139.419789 }, { country: '埼玉県', description: '「狭山丘陵の地形を活かして掘り下げて造られ、外野席の緩やかな傾斜は芝生席になっています。（中略） 壁がないため、春や秋は心地よい風が通り抜けますが、夏は蒸し風呂のように暑く、冬は冷蔵庫のように寒いことでも有名で、季節感をダイレクトに感じられます。」', hint: '所沢（ところざわ）市の狭山丘陵にあり、プロ野球「○○西武ライオンズ」の本拠地です。' }],
 [{ lat: 36.405016, lng: 140.600797 }, { country: '茨城県', description: '「春はネモフィラで青に染まる『みはらしの丘』が、秋は3万3千本のコキアで真っ赤に色づきます。初夏に植栽された小さな緑色のコキアが少しずつ成長し、秋の深まりとともに緑から赤へと色づいていきます。モコモコとしたかわいらしい形と、訪れる時期や時間によって違った色づきや印象が楽しめることから、春のネモフィラと並んで、公園を代表する風景となっています。」', hint: '関東地方の北東部に位置し、太平洋に面しています。筑波山や日本第二位の広さを誇る湖「霞ヶ浦」があります。' }],
 [{ lat: 36.622556, lng: 138.596439 }, { country: '群馬県', description: '「群馬県にある草津温泉は日本を代表する温泉地のひとつで、その歴史は平安時代からと長く、古くから多くの人を癒してきました。草津温泉は、その豊富な湯量と質の高さから日本三大名泉のひとつとされています。白根火山の東麓、標高1,200m付近の小盆地とその周辺に温泉街・ホテル街が形成されている。古くから湯治温泉として全国的に有名で、西の有馬温泉に対し、東国一の名湯といわれてきた。」', hint: '「草津よいとこ一度はおいで」の歌で知られる、日本を代表する温泉地があります。' }],
 [{ lat: 36.757134, lng: 139.599117 }, { country: '栃木県', description: '「人気ランキング3位の日光東照宮は、平成11年12月にユネスコ世界文化遺産にも登録されています。豪華絢爛な建物には、多くの彫刻があり、漆や極彩色が色鮮やかに輝く姿は、圧巻です。パワースポットとしても有名であり、国内外から多くの人々が訪れています。」', hint: '徳川家康をまつる豪華絢爛な神社があり、「見ざる・言わざる・聞かざる」の彫刻でも知られています。' }],
 
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