let score = 0;
let round = 0;
let totalRounds = 9;
let panorama;

// 予測してもらう場所リスト
// ★変更: description (解説文) プロパティを各場所に追加しました
var places = [
 [{ lat: 35.865657, lng: 139.866465 }, { country: '三郷', description: 'ここは埼玉県三郷市です。東京都と千葉県に隣接するベッドタウンです。', hint: '日本の関東地方にある都市です。川に挟まれています。' }],
 [{ lat: 29.975756, lng: 31.138459 }, { country: 'スフィンクス', description: 'ギザの大スフィンクスは、エジプト、ギザの三大ピラミッドのそばにある、一枚岩から彫られた神話上の生物（スフィンクス）の像です。', hint: 'エジプトにあり、ピラミッドの近くに位置しています。' }],
 [{ lat: 27.174028, lng: 78.042131 }, { country: 'タージマハル', description: 'インド北部アーグラにある、ムガル帝国第5代皇帝シャー・ジャハーンが、愛妃ムムターズ・マハルのために建設した総大理石の霊廟です。ユネスコの世界遺産に登録されています。', hint: 'インドにある白い霊廟です。愛のために建てられました。' }],
 [{ lat: 44.526115, lng: -110.838529 }, { country: 'イエローストーン国立公園', description: 'アメリカ合衆国ワイオミング州、モンタナ州、アイダホ州にまたがる世界初の国立公園。オールド・フェイスフル間欠泉など、多くの間欠泉や温泉で有名です。', hint: 'アメリカにある世界初の国立公園で、間欠泉が有名です。' }],
 [{ lat: 34.296786, lng: 132.319644 }, { country: '厳島神社', description: '広島県廿日市市の厳島（宮島）にある神社。海上に浮かぶように建てられた朱塗りの大鳥居で世界的に知られています。ユネスコの世界遺産（文化遺産）に登録されています。', hint: '日本にある神社で、海に浮かぶ大きな鳥居が特徴です。' }],
 [{ lat: 48.626097, lng: -1.506732 }, { country: 'モンサンミッシェル', description: 'フランス西海岸、サン・マロ湾上に浮かぶ小島に築かれた修道院。「西洋の驚異」とも称され、ユネスコの世界遺産（文化遺産）に登録されています。', hint: 'フランスの島にある修道院です。潮の満ち引きで道が消えることがあります。' }],
 [{ lat: 40.688670,  lng: -74.043949 }, { country: '自由の女神', description: 'アメリカ合衆国ニューヨーク港内のリバティ島にある像。アメリカ合衆国の独立100周年を記念してフランスから贈られました。ユネスコの世界遺産（文化遺産）に登録されています。', hint: 'アメリカのニューヨークにあり、フランスから贈られた像です。' }],
 [{ lat: 41.403886,  lng: 2.175250 }, { country: 'サクラダファミリア', description: 'スペインのバルセロナにある、建築家アントニ・ガウディ設計の未完の教会。ユネスコの世界遺産（文化遺産）「アントニ・ガウディの作品群」の一部です。', hint: 'スペインのバルセロナにある、まだ完成していない有名な教会です。' }],
 [{ lat: -33.858217,  lng: 151.214086 }, { country: 'オペラハウス', description: 'オーストラリア、シドニーにある20世紀を代表する近代建築物。貝殻や帆を思わせる独特の外観が特徴で、ユネスコの世界遺産（文化遺産）に登録されています。', hint: 'オーストラリアのシドニーにある、帆のような形をした有名な建物です。' }],
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