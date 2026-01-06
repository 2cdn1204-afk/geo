let score = 0;
let round = 0;
let totalRounds = 9;
let panorama;

// 予測してもらう場所リスト
// ★変更: description (解説文) プロパティを各場所に追加しました
var places = [
 [{ lat: 34.456013, lng: 133.974025 }, { country: '香川県', description: '「直島の宮浦港にある『赤かぼちゃ』は、草間彌生の作品。 太陽の『赤い光』を宇宙の果てまで探してきて、それは直島の海の中で赤かぼちゃに変身してしまったと草間彌生自身が語った作品です。 水玉のいくつかは穴が開いており、内部に入ることができます。」', hint: '瀬戸内海に浮かぶこの島は、現代アートによる地域活性化の成功例として世界中から注目されている「アートの聖地」です。' }],
 [{ lat: 33.851983, lng: 132.786723 }, { country: '愛媛県', description: '「道後温泉本館は、明治27年に建築された木造3層楼の建物で、公衆浴場として初めて国の重要文化財に指定されました。傷を負った白鷺が岩間から噴出する温泉を見つけ、毎日飛んできてその湯に浸したところ、傷が完全に癒えて飛び去ったという『白鷺伝説』が残っています。 保存修理工事を経て、2024年7月に全館での営業を再開しました。」', hint: '3000年の歴史を持つと言われる、日本最古の温泉です。聖徳太子も入浴したという伝説が残っています。' }],
 [{ lat: 33.875297, lng: 133.835125 }, { country: '徳島県', description: '「平家一族の哀話を秘める、秘境『祖谷』にあるかずら橋。シラクチカズラ（重さ約5トン）で作られたもので、長さ45m・幅2m・水面上14m。昔は深山渓谷地帯の唯一の交通施設であった。3年毎に架替えが行われる。（国指定重要有形民俗文化財）」', hint: '木や植物のツル（シラクチカズラ）で編まれた、歩くとギシギシ揺れるスリル満点の吊り橋です。' }],
 [{ lat: 33.498669, lng: 133.575521 }, { country: '高知県', description: '「高知県を代表する観光名所の一つ『桂浜』。 太平洋を望む龍頭岬（りゅうずみさき）の小高い丘に、幕末の志士・坂本龍馬の銅像が立っています。 懐手をしてブーツを履き、遥か太平洋の彼方を見つめるその姿は、激動の時代を駆け抜けた龍馬の生き様を象徴しているようです。」', hint: '日本の夜明けを夢見て、幕末に活躍した英雄の銅像です。袴（はかま）姿にブーツを履いています。' }],
 [{ lat: 35.543499, lng: 134.236522 }, { country: '鳥取県', description: '「鳥取砂丘は、東西16km、南北2.4kmに広がる日本最大級の海岸砂丘です。（国の天然記念物） 中国山地から流れ出た千代川（せんだいがわ）と風が運ぶ砂によって、10万年の歳月をかけて作られました。 （中略） 最大の高低差は約90mにもなり、すり鉢状の地形『蟻地獄』や、小高い丘『馬の背』など、起伏に富んだ地形が特徴です。」', hint: '観光用の「ラクダ」に乗って記念撮影をしたり、散歩したりすることができます。' }],
 [{ lat: 35.396445, lng: 132.686395 }, { country: '島根県', description: '「出雲大社は、縁結びの神・福の神として名高い『大国主大神（おおくにぬしのおおかみ）』をお祀りしています。 旧暦10月。全国の八百万（やおよろず）の神々が出雲の国に集まる月。他の土地では神様が留守になるので『神無月』といいますが、ここ出雲では『神在月（かみありづき）』と呼びます。 神々が集い、人々の『しあわせ』のご縁を結ぶ会議（神議り）なされると言われています。」', hint: '旧暦の10月は、日本中の神様がここに出張してくるため、この地域だけ「神在月（かみありづき）」と呼ばれます。' }],
 [{ lat: 34.595725, lng: 133.771956 }, { country: '岡山県', description: '「白壁の蔵屋敷、なまこ壁、柳並木など、趣ある景観が楽しめる倉敷美観地区。 伝統的な建物が作り出す町並みや、倉敷川沿いのレトロな風景が人々を魅了し続けています。『倉敷川舟流し』では、かつて物資を積んだ川舟が行き来した賑わいを感じながら、船頭によるガイドとともに川からの景色を楽しめます。」', hint: '江戸時代には物資を運ぶ川港として栄え、当時の豊かな商人たちが建てた立派な建物が今も大切に残されています。' }],
 [{ lat: 34.394984, lng: 132.453543 }, { country: '広島県', description: '「平成8年（1996年）12月、ユネスコ第20回世界遺産委員会メリダ会議で、核兵器の惨禍を伝える建築物として世界文化遺産に登録されました。元々は『広島県産業奨励館』というモダンな建物でしたが、原爆によって一瞬にして大破・全焼しました。 頂上の円蓋、鉄骨の形から、いつしか市民から『原爆ドーム』と呼ばれるようになりました。」', hint: '1945年8月6日、人類史上初めて原子爆弾が投下された記憶を今に伝える建物です。' }],
 [{ lat: 34.167025, lng: 132.178936 }, { country: '山口県', description: '「清流錦川（にしきがわ）に架かる木造五連のアーチ橋。延宝元年（1673年）第三代岩国藩主吉川広嘉（きっかわひろよし）によって創建されました。巻きガネとカスガイを使った『木組みの技』で造られており、釘は1本も使われていません。 その美しさは言うまでもなく、力学的な強度が非常に高い構造となっています。」', hint: '5つの木造アーチが連なる美しい橋で、その優美な姿から「錦（にしき）の帯（おび）」という名前がついています。' }],

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