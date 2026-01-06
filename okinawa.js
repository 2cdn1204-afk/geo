let score = 0;
let round = 0;
let totalRounds = 8;
let panorama;

// 予測してもらう場所リスト
// ★変更: description (解説文) プロパティを各場所に追加しました
var places = [
 [{ lat: 33.592343, lng: 130.351661 }, { country: '福岡県', description: '「福岡タワーは、平成元年（1989年）に福岡市制100周年を記念して開催された『アジア太平洋博覧会（よかトピア）』のモニュメントとして建てられました。 海浜タワーとしては日本一の高さ234ｍを誇ります。 8000枚ものハーフミラーで覆われた正三角柱の洗練された外観は『ミラーセイル』の愛称で親しまれています。」', hint: '全長234mあり、海沿いに建っているタワー（海浜タワー）としては日本一の高さを誇ります。' }],
 [{ lat: 33.327390, lng: 130.386799 }, { country: '佐賀県', description: '「吉野ヶ里遺跡は、紀元前5世紀から紀元3世紀にかけての弥生時代全期間にわたる遺跡であり、その規模は我が国最大級の環壕集落（かんごうしゅうらく）跡です。 2.5kmの壕（ほり）に囲まれた集落には、当時の王たちの権力の大きさを示す巨大な祭殿や、物見やぐら、竪穴住居などが復元され、古代の『クニ』の中心地の姿を今に伝えています。」', hint: '今から約2,000年前、「弥生時代（やよいじだい）」の人々が暮らしていた、日本最大級の遺跡です。' }],
 [{ lat: 32.776731, lng: 129.863847 }, { country: '長崎県', description: '「平和祈念像は、長崎県出身の彫刻家・北村西望（きたむらせいぼう）氏によって作られました。 神の愛と仏の慈悲を象徴し、高く掲げた右手は原爆の脅威を、水平に伸ばした左手は平和を、軽く閉じた瞼は原爆犠牲者の冥福を祈っています。 毎年8月9日には、この像の前で平和祈念式典が行われ、全世界に向けて平和宣言がなされます。」', hint: '空を指す右手は「原爆の脅威」を、水平に伸ばした左手は「平和」を表し、閉じた目は犠牲者の冥福を祈っています' }],
 [{ lat: 32.806022, lng: 130.705103 }, { country: '熊本県', description: '「熊本城は、加藤清正が慶長6年（1601年）から7年の歳月をかけて築城しました。 大小天守閣をはじめ、櫓（やぐら）49、櫓門（やぐらもん）18、城門29を数える壮大な構えで、実戦を想定した『難攻不落』の城として知られています。  下は緩やかで、上に行けば行くほど垂直に近くなる『武者返し』と呼ばれる石垣は、忍者ですら登れないと言われています。」', hint: '2016年の大きな地震で甚大な被害を受けましたが、天守閣がいち早く復旧し、復興のシンボルとして輝いています。' }],
 [{ lat: 33.281193, lng: 131.505806 }, { country: '大分県', description: '「別府タワーは、昭和32年（1957年）に建設された、高さ90mの高層タワーです。 東京タワーや通天閣などを手掛けた『塔博士』内藤多仲氏の設計によるもので、『タワー6兄弟』の三男として親しまれています。  地上55mの展望台からは、別府市街や別府湾を360度見渡すことができ、特に街の至る所から湯けむりが立ち上る風景は、日本一の温泉県・大分ならではの絶景です。」', hint: '展望台からは、別府湾の美しい海だけでなく、街のあちこちから「温泉の湯けむり」が立ち上る、この街ならではの景色が見えます。' }],
 [{ lat: 31.662516, lng: 131.461275 }, { country: '宮崎県', description: '「日南海岸の小高い丘の上に位置する『サンメッセ日南』。 ここには、イースター島の長老会から世界で初めて許可を得て完全復刻された7体のモアイ像（アフ・アキビ）があります。1990年代、部族間の争いやチリ地震で倒壊したままだったイースター島のモアイ像を、日本のクレーンメーカー（タダノ）や石工、研究者チームが修復しました。その奉仕と友情の証として、日本での復刻が認められたのです。」', hint: 'イースター島の長老会から世界で唯一、復刻を許可された特別な像です。' }],
 [{ lat: 30.375147, lng: 130.959504 }, { country: '鹿児島県', description: '「種子島宇宙センターは、総面積約970万平方メートルにもおよぶ日本最大のロケット発射場です。 鹿児島の南、種子島の東南端の海岸線に面しており、世界一美しいロケット発射場とも言われています。この場所が選ばれた理由は、赤道に近く地球の自転速度を最大限に利用できることや、打ち上げの際に切り離したロケットの一部が落下しても安全な海が開けていることなどが挙げられます。」', hint: '青い海と白い砂浜、緑の芝生に囲まれており、「世界一美しいロケット発射場」と言われています。' }],
 [{ lat: 26.216160, lng: 127.687916 }, { country: '沖縄県', description: '「那覇市のメインストリートである『国際通り』は、全長約1.6km（約1マイル）。 戦後の焼け野原から目覚ましい発展を遂げたこと、長さがほぼ1マイルであることから、『奇跡の1マイル』と呼ばれています。 沖縄県庁前から安里三差路までの通りには、お土産品店や沖縄料理店、ステーキハウス、ホテルなどが軒を連ね、連日多くの観光客で賑わっています。」', hint: '道の両側にはヤシの木が植えられ、お土産屋やステーキハウスがずらりと並ぶ、県内で最も賑やかなメインストリートです。' }],

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