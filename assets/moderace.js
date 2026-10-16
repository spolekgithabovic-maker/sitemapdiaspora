/* Страница подтверждения отзыва: dczs.cz/moderace.html?id=… (ссылка приходит в письме) */
(function(){
  var API = window.FEEDBACK_API, id = new URLSearchParams(location.search).get("id") || "";
  var st = document.getElementById("st"), card = document.getElementById("card"), btn = document.getElementById("btn");
  function say(t, cls){ st.textContent = t; st.className = cls || ""; }
  if(!API || !/^[0-9a-f-]{20,}$/i.test(id)){ say("Неверная ссылка.", "err"); return; }
  fetch(API + "?action=get&id=" + encodeURIComponent(id)).then(function(r){ return r.json(); }).then(function(d){
    if(!d || d.error){ say("Отзыв не найден.", "err"); return; }
    document.getElementById("who").textContent = d.name;
    document.getElementById("txt").textContent = d.text;
    card.hidden = false;
    if(d.status === "approved"){ say("Этот отзыв уже опубликован на сайте.", "ok"); btn.hidden = true; }
    else say("Проверьте текст и нажмите кнопку, чтобы отзыв появился на сайте.");
  }).catch(function(){ say("Не удалось загрузить отзыв. Проверьте интернет и обновите страницу.", "err"); });
  btn.addEventListener("click", function(){
    btn.disabled = true; say("Публикую…");
    fetch(API, {method:"POST", headers:{"Content-Type":"text/plain;charset=utf-8"}, body: JSON.stringify({action:"approve", id:id})})
      .then(function(r){ return r.json(); })
      .then(function(d){
        if(d && d.success){ say("Готово — отзыв опубликован на сайте.", "ok"); btn.hidden = true; }
        else { say((d && d.msg) || "Не получилось. Попробуйте ещё раз.", "err"); btn.disabled = false; }
      })
      .catch(function(){ say("Не получилось. Попробуйте ещё раз.", "err"); btn.disabled = false; });
  });
})();
