let score = 0;
let round = 0;
let totalRounds = 7;
let panorama;

// 予測してもらう場所リスト
// ★変更: description (解説文) プロパティを各場所に追加しました
var places = [
 [{ lat: 39.598332, lng: 140.562013 }, { country: '秋田県', description: '『みちのくの小京都』と呼ばれる角館。深い木立と重厚な屋敷構えが今もなお藩政時代の面影を残しています。武家屋敷通りは、昭和51年に『国選定重要伝統的建造物群保存地区』の選定を受けています。', hint: '黒板塀に映えるシダレザクラや、新緑、紅葉、雪景色と、四季折々の表情を見せる通りは、いつ訪れても風情があります。' }],
 [{ lat: 43.062295, lng: 141.353536 }, { country: '北海道', description: '正式名称は『旧札幌農学校演武場』。演武場（時計台）はクラーク博士の提言により、農学校生徒の兵式訓練や入学式・卒業式などを行う中央講堂として1878年（明治11年）に建設されました。', hint: '北海道大学の前身で北海道開拓の指導者を育成する目的で1876年（明治9年）年開校しました。' }],
 [{ lat: 38.253220, lng: 140.856836 }, { country: '宮城県', description: '政宗公騎馬像の前に立てば、天下取りの野望に燃えた政宗公と同じ視線で、市街を展望できます。日没～23時まで石垣と伊達政宗公騎馬像がライトアップされ、100万都市仙台の夜景を楽しむことができます。', hint: '標高約130m、東と南を断崖が固める天然の要害に築かれた城は、将軍家康の警戒を避けるために、あえて天守閣は設けなかったといわれています。' }],
 [{ lat: 40.607362, lng: 140.463659 }, { country: '青森県', description: '弘前城は、現存する日本最古のソメイヨシノがあることでも有名です。園内には、江戸時代に建造された天守や櫓（やぐら）、城門が当時のまま残されており、弘前城跡として国の史跡に指定されています。', hint: '春には約50種、2,600本の桜が咲き誇る名所として知られ、秋には古城の白壁と老松の緑に映える紅葉、冬には雪燈籠まつりなど、四季折々の美しさを楽しむことができます。' }],
 [{ lat: 38.987200, lng: 141.107966 }, { country: '岩手県', description: '奥州藤原氏二代基衡、三代秀衡により造営されました。大泉が池を中心とした庭園も、平安時代の優美な作庭造園の形状を如実にとどめており、日本庭園史上にも特に貴重な遺構として、発掘調査が行われ、旧観に復されています。', hint: '仏の世界を地上に表現したと伝わる浄土庭園。往時の栄華をしのばせる史跡。特別史跡・特別名勝と、国から二重指定をされている境内です。' }],
 [{ lat: 38.256404, lng: 140.341023 }, { country: '山形県', description: '大正5年に建てられた旧県庁舎及び県会議事堂です。昭和59年、国の重要文化財に指定され、昭和61年から10年の歳月をかけて保存修復工事が行われました。現在は、山形県郷土館『文翔館』として一般に無料公開されています。', hint: '旧県庁舎及び県会議事堂は、英国近世復興様式を基調とした建物で、渡り廊下で結ばれています。旧県庁舎はレンガ造り3階建てで外廻りの壁面は石貼りで覆われています。' }],
 [{ lat: 37.487795, lng: 139.929458 }, { country: '福島県', description: '鶴ヶ城は今から約630年ほど前に、その前身ともいえる東黒川館を葦名直盛が築いたのがはじまりと言われ、戊辰戦争では約１ヶ月に及ぶ激しい攻防戦に耐えた名城として、その名を天下に知らしめました。明治7年に取り壊されましたが、昭和40年に再建、平成23年には『赤瓦』へのふき替えが完了し幕末当時の姿を再現し、現存する天守閣では国内唯一の赤瓦の天守となっています。', hint: '現存する天守閣では国内唯一の赤瓦の天守となっています。天守閣の内部は資料館になっており、最上階は展望台になっています。' }],
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

// --- ★ここまでヒントモーダル用のコードを追加