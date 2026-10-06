/* =====================================================================
   Diaspora Care z.s. — НАСТРОЙКИ И СОДЕРЖИМОЕ САЙТА
   Этот файл можно править самостоятельно: меняйте только значения
   в кавычках. После правки сохраните файл и обновите его на GitHub.
   ===================================================================== */

/* Данные организации. IČO и дату регистрации впишите, когда они будут. */
window.ORG = {
  name: "Diaspora Care z. s.",
  ico: "30061563",
  seat: "Jaroslava Foglara 866/12, Štýřice, 639 00 Brno",
  register: "L 32394, Krajský soud v Brně",   // spisová značka ve spolkovém rejstříku
  email: "diasporacare22@gmail.com"
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

/* Помощь в цифрах (с начала 2022 года). Только обобщённые числа —
   никаких имён и личных данных. Ключи направлений: psy, health, housing,
   adapt, other, offices, work; стран: UA, MD, RU, other. */
window.STATS = {
  stories: 59,      // историй помощи
  ongoing: 27,      // помощь продолжается
  onko: 7,          // сопровождение при онкологическом лечении
  services: { psy: 50, health: 39, housing: 32, adapt: 26, other: 24, offices: 21, work: 13 },
  countries: { UA: 49, MD: 5, RU: 3, other: 2 }
};

/* Проекты. Пример (уберите // чтобы включить):
window.PROJECTS = [
  { title: { ru: "Название", uk: "Назва", cs: "Název", en: "Title" },
    text:  { ru: "Описание", uk: "Опис", cs: "Popis", en: "Description" } }
];
*/
window.PROJECTS = [];

/* Отзывы — ТОЛЬКО одобренные модератором. Отзывы с сайта приходят
   на e-mail с темой «отзыв на модерацию»; чтобы опубликовать, добавьте
   его сюда. Текст показывается как есть, на языке автора.
   Пример: { name: "Ольга", date: "2026-10-05", text: "Спасибо за помощь!" } */
window.FEEDBACK = [];
