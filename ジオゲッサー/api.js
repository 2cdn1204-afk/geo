function loadScript(apikey) {
 let script = document.createElement('script');
 script.src = "https://maps.googleapis.com/maps/api/js?key=" + apikey + "&callback=initialize&libraries=&v=weekly";
 script.async = true;
 document.body.append(script);
}

let API_KEY = ""; // APIキーをここに入力
loadScript(API_KEY);

// ゲームスタート時に4択をセット
setChoices();