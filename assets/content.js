/* =====================================================================
   Diaspora Care z.s. — НАСТРОЙКИ И СОДЕРЖИМОЕ САЙТА
   Этот файл можно править самостоятельно: меняйте только значения
   в кавычках. После правки сохраните файл и обновите его на GitHub.
   ===================================================================== */

/* Данные организации. IČO и дату регистрации впишите, когда они будут. */
window.ORG = {
  name: "Diaspora Care z.s.",
  ico: "",            // например "12345678"
  registered: "",     // например "01.07.2026"
  email: "diasporacare@gmail.com"
};

/* Фото основателей: путь к файлу относительно папки assets/img,
   например "tereza.jpg". Пусто — показывается значок. */
window.PHOTOS = { tereza: "", hanna: "", tana: "" };

/* Адрес отправки форм (сервис FormSubmit → e-mail организации). */
window.FORM_ENDPOINT = "https://formsubmit.co/ajax/" + window.ORG.email;

/* Сбор пожертвований. Пока url пустой — показывается заметка,
   что пожертвования подключим позже. goal и raised — суммы в Kč;
   если goal = 0, шкала не показывается. */
window.DONATE = {
  url: "",            // ссылка на проект на Darujme.cz
  goal: 0,
  raised: 0,
  title: { ru: "", uk: "", cs: "", en: "" }  // например "Встречи арт-терапии"
};

/* Встречи и события. Прошедшие скрываются автоматически.
   Пример (уберите // в начале строк, чтобы включить):
window.EVENTS = [
  {
    date: "2026-11-12", time: "17:30", duration: 90,
    title: { ru: "Практика чешского", uk: "Практика чеської", cs: "Procvičování češtiny", en: "Czech practice" },
    place: { ru: "Брно, адрес", uk: "Брно, адреса", cs: "Brno, adresa", en: "Brno, address" },
    text:  { ru: "Короткое описание", uk: "Короткий опис", cs: "Krátký popis", en: "Short description" }
  }
];
*/
window.EVENTS = [];

/* Новости. example: true — показывается плашка «Пример».
   Замените примеры на настоящие новости или удалите их. */
window.NEWS = [
  { example: true, icon: "news",
    title: { ru: "Как устроена Diaspora Care", uk: "Як влаштована Diaspora Care", cs: "Jak funguje Diaspora Care", en: "How Diaspora Care works" },
    text:  { ru: "Рассказываем, с чего мы начинаем работу и какие первые шаги планируем.", uk: "Розповідаємо, з чого ми починаємо роботу і які перші кроки плануємо.", cs: "Popisujeme, jak začínáme a jaké jsou naše první kroky.", en: "How we're starting out and what our first steps look like." } },
  { example: true, icon: "hands",
    title: { ru: "Первые партнёрства", uk: "Перші партнерства", cs: "První partnerství", en: "First partnerships" },
    text:  { ru: "Скоро здесь появятся истории сотрудничества с фондами и муниципалитетами.", uk: "Незабаром тут з’являться історії співпраці з фондами та муніципалітетами.", cs: "Brzy zde přibudou příběhy spolupráce s nadacemi a obcemi.", en: "Stories of cooperation with foundations and municipalities will appear here soon." } },
  { example: true, icon: "people",
    title: { ru: "Волонтёры на старте", uk: "Волонтери на старті", cs: "Dobrovolníci na startu", en: "Volunteers getting started" },
    text:  { ru: "Собираем первую команду волонтёров — рассказываем, как к ней присоединиться.", uk: "Збираємо першу команду волонтерів — розповідаємо, як до неї приєднатися.", cs: "Sestavujeme první tým dobrovolníků — popisujeme, jak se k němu přidat.", en: "We're building our first volunteer team — here's how to join." } }
];
