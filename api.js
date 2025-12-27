const google_key = import.meta.env.VITE_GOOGLE_KEY;


function loadScript(apikey) {
  let script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=" + apikey + "&callback=initialize&libraries=&v=weekly";
  script.async = true;
  document.body.append(script);
}

loadScript(google_key);

// ゲームスタート時に4択をセット
//setChoices();