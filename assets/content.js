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

/* Отзывы с модерацией по e-mail (Google Apps Script). Сюда вставляется
   адрес веб-приложения вида https://script.google.com/macros/s/.../exec
   Пусто — отзывы идут по почте через FormSubmit, публикуются вручную ниже. */
window.FEEDBACK_API = "https://script.google.com/macros/s/AKfycbyYVOdFTf41KACYgqDGE2FBGTbMgmFq7EwmDFzy6fwV-fIJ7wct72XOWQIvW5GfTXg/exec";

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

/* Проекты. status: "planned" — «Готовим», "active" — «Идёт», "done" — «Завершён».
   Название партнёра пишите только с его письменного согласия (e-mail достаточно). */
window.PROJECTS = [
  { status: "planned",
    title: { ru: "Экскурсия и лекция о сортировке отходов", uk: "Екскурсія та лекція про сортування відходів", cs: "Exkurze a přednáška o třídění odpadu", en: "Tour and talk on waste sorting" },
    text:  { ru: "Вместе с городской компанией по переработке отходов готовим индивидуальную экскурсию для людей, которым мы помогаем: что происходит с отходами после контейнера и как правильно сортировать мусор в Брно. Перевод на украинский и русский обеспечим мы.",
             uk: "Разом із міською компанією з переробки відходів готуємо індивідуальну екскурсію для людей, яким ми допомагаємо: що відбувається з відходами після контейнера і як правильно сортувати сміття в Брні. Переклад українською та російською забезпечимо ми.",
             cs: "Společně s městskou společností, která zpracovává odpad, připravujeme individuální exkurzi pro lidi, kterým pomáháme: co se děje s odpadem po vyhození do kontejneru a jak v Brně správně třídit. Tlumočení do ukrajinštiny a ruštiny zajistíme my.",
             en: "Together with the city's waste processing company, we are preparing a private tour for the people we support: what happens to waste after the bin and how to sort it correctly in Brno. We will provide interpretation into Ukrainian and Russian." } }
];

/* Отзывы — ТОЛЬКО одобренные модератором. Отзывы с сайта приходят
   на e-mail с темой «отзыв на модерацию»; чтобы опубликовать, добавьте
   его сюда. text — строка (на языке автора) или перевод на каждый язык: { ru, uk, cs, en }.
   help — когда человеку помогли: "2023-05" (год-месяц) или "2023" (только год);
   на сайте будет «Помощь: май 2023». Без help дата не показывается.
   city — город, где помогли (поле help_city из письма), например "Brno".
   Пример: { name: "Ольга", city: { ru: "Брно", uk: "Брно", cs: "Brno", en: "Brno" }, help: "2023-05", text: "Спасибо за помощь!" } */
window.FEEDBACK = [
  { name: { ru: "Павел", uk: "Павло", cs: "Pavel", en: "Pavel" }, city: { ru: "Брно", uk: "Брно", cs: "Brno", en: "Brno" }, help: "2024", text: {
      ru: "Два года назад я приехал в Брно без жилья и без работы. Первые два дня мне дали жильё бесплатно. Потом помогли найти общежитие и работу, а позже снять квартиру. Спасибо вам за помощь, без неё мне было бы намного тяжелее.",
      uk: "Два роки тому я приїхав до Брна без житла і без роботи. Перші два дні мені дали житло безкоштовно. Потім допомогли знайти гуртожиток і роботу, а згодом винайняти квартиру. Дякую вам за допомогу, без неї мені було б набагато важче.",
      cs: "Před dvěma lety jsem přijel do Brna bez bydlení a bez práce. První dva dny jsem měl ubytování zdarma. Pak mi pomohli najít ubytovnu a práci a později i pronajmout byt. Děkuji za pomoc, bez ní by to pro mě bylo mnohem těžší.",
      en: "Two years ago I came to Brno with no place to live and no job. For the first two days I got a place to stay for free. Then they helped me find a hostel and a job, and later rent a flat. Thank you for your help, it would have been much harder without it." } },
  { name: "Tatiana", city: { ru: "Брно", uk: "Брно", cs: "Brno", en: "Brno" }, help: "2024-03", text: {
      cs: "Děkuji vám za doprovod na úřad práce. Bylo pro mě důležité pochopit a vysvětlit specialistovi, které rekvalifikační kurzy pro mě budou nejlepším způsobem, jak si zlepšit pracovní uplatnění.",
      ru: "Спасибо вам за сопровождение на биржу труда. Для меня было важно разобраться и объяснить специалисту, какие курсы переквалификации станут для меня лучшим способом улучшить шансы на трудоустройство.",
      uk: "Дякую вам за супровід до центру зайнятості. Для мене було важливо зрозуміти й пояснити фахівцеві, які курси перекваліфікації стануть для мене найкращим способом покращити шанси на працевлаштування.",
      en: "Thank you for accompanying me to the Labour Office. It was important for me to understand and explain to the specialist which retraining courses would be the best way for me to improve my job prospects." } }
];
