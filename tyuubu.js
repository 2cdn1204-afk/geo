let score = 0;
let round = 0;
let totalRounds = 9;
let panorama;

// 予測してもらう場所リスト
// ★変更: description (解説文) プロパティを各場所に追加しました
var places = [
 [{ lat: 36.259943, lng: 136.907111 }, { country: '岐阜県', description: '「白川郷の荻町地区は、合掌造りの家屋が大小あわせて100棟余り残る集落で、今でもそこで人々の生活が営まれているのが特徴です。豪雪地帯ならではの急勾配の茅葺き屋根が特徴で、その形が手を合わせているように見えることから『合掌造り』と呼ばれています。雪下ろしの作業軽減や屋根裏の空間利用（養蚕）など、生活の知恵が詰まった建築様式です。」', hint: '手を合わせたような形（合掌）をした、三角形の茅葺き屋根の家が並んでいます。' }],
 [{ lat: 36.237579, lng: 136.126380 }, { country: '福井県', description: '「荒々しい岩肌の柱状節理が延々と1kmに渡って続く勇壮な景観は、国の名勝・天然記念物に指定されています。これほど巨大な輝石安山岩の柱状節理は日本でここ一ヶ所といわれ、地質学的にも大変貴重な場所です。世界にも東尋坊のほか2ヶ所（朝鮮半島の金剛山、ノルウェーの西海岸）しかないといわれ、『世界三大奇勝』に数えられています。」', hint: '「サスペンスドラマの犯人が追い詰められる場所」として、あまりにも有名な断崖絶壁です。' }],
 [{ lat: 36.566733, lng: 137.663303}, { country: '富山県', description: '「黒部ダムは、富山県東部の黒部川上流に建設されたアーチ式コンクリートダム。ダムの高さ（堤高）は186mで日本一を誇り、総貯水量は約2億トン。東京ドーム約160杯分もの水を湛えています。世紀の難工事として語り継がれている「黒部ダム」建設。その中でも最大の難所であった大町トンネル（現・関電トンネル）の破砕帯との苦闘は、石原裕次郎主演の映画『黒部の太陽』に描かれました。」', hint: 'その高さは186メートルで、日本一高いダムとして知られています。' }],
 [{ lat: 38.041805, lng: 138.256058 }, { country: '新潟県', description: '「『佐渡島の金山』は、17世紀において世界最大級の金の生産量を誇り、幕府の財政を支えました。人の手だけで岩盤を掘り進める伝統的な採掘技術が、西洋の機械化の波が押し寄せる明治時代まで継続していたことが、世界的に見ても独自の価値があると評価され、世界文化遺産に登録されました。」', hint: 'かつて日本最大の金山があり、採掘された金は江戸幕府の財政を約400年にわたって支えました。' }],
 [{ lat: 36.562822, lng: 136.663148 }, { country: '石川県', description: '「水戸の偕楽園、岡山の後楽園とならぶ日本三名園の一つ、兼六園。徽軫灯籠（ことじとうろう）は兼六園を象徴する景観。琴の糸を支える琴柱（ことじ）に似ているのでその名が付いたと言われています。」', hint: '日本三名園の一つに数えられる、非常に美しい日本庭園です。' }],
 [{ lat: 35.360380, lng: 138.727593 }, { country: '山梨県', description: '「標高3,776mの日本最高峰の富士山。その優美な風貌は、日本国内のみならず海外でも日本の象徴として広く知られています。2013年6月には『富士山ー信仰の対象と芸術の源泉』として世界文化遺産に登録されました。古くから霊山として信仰され、浮世絵などの芸術作品にも大きな影響を与えたことが評価されたのです。」', hint: '静岡県とこの県にまたがっていますが、山頂の北側にある「富士五湖」はすべてこの県にあります。' }],
 [{ lat: 34.994682, lng: 138.522234 }, { country: '静岡県', description: '「ユネスコのイコモス（国際記念物遺跡会議）からは、当初『富士山から45kmも離れており、山としての完全性を証明できない』として除外勧告を受けていました。 しかし、日本側が『三保松原から望む富士山は、多くの芸術の源泉となってきた』と文化的価値を強く訴え、逆転での世界遺産登録となりました。」。', hint: '富士山から45kmも離れていますが、その風景の価値が認められ、富士山の世界文化遺産の一部（構成資産）として登録されました。' }],
 [{ lat: 35.171634, lng: 136.907978 }, { country: '愛知県', description: '「中部電力 MIRAI TOWERは昭和29（1954）年に日本で最初の集約電波塔として建設された観光タワー。（中略） 2022年12月に、全国のタワーとしては初となる国の重要文化財に指定されました。開業以来初となる全体改修工事を経て、2020年9月18日にグランドオープン、 建設当時の外観はそのままに塔内を一新し、テレビ塔の意匠を活かしたホテルも誕生しました。」。', hint: '実は東京タワーよりも前に完成した、日本で最初の集約電波塔です。' }],
 [{ lat: 36.660579, lng: 138.187631 }, { country: '長野県', description: '「『遠くとも一度は詣れ善光寺』と語り継がれ、特定の宗派に属さない『無宗派』の寺院として、全ての人々の往生を約束する寺として信仰を集めてきました。 国宝である本堂の床下、真っ暗な回廊を手探りで巡り、御本尊様と結縁する『お戒壇巡り』は、善光寺参拝ならではの体験です。」。', hint: '日本でも珍しい「無宗派（むしゅうは）」のお寺で、どんな人も受け入れる庶民の寺として古くから信仰されてきました。' }],



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