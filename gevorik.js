// === ԸՆԿԵՐ ԳԵՎՈՐԻԿ ===
// Պարզ demo տարբերակ՝ առանց ինտերնետի

const messages = document.getElementById("gevorik-messages");
const input = document.getElementById("gevorik-text");
const sendBtn = document.getElementById("gevorik-send");

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const question = input.value.trim();
  if (!question) return;
  addMessage("Դու", question);
  input.value = "";

  // Պարզ պատասխաններ՝ offline
  let answer = "";

  if (question.includes("բնություն")) answer = "Բնությունը ուսումնասիրում է կենդանի և ոչ կենդանի աշխարհը՝ ֆիզիկա, քիմիա, կենսաբանություն...";
  else if (question.includes("մաթեմատիկա")) answer = "Մաթեմատիկան թվերի և գործողությունների գիտությունն է։ Ուզես՝ բացատրեմ մի թեմա՞։";
  else if (question.includes("անգլերեն")) answer = "Անգլերենը հեշտ կլինի, եթե ամեն օր 10 նոր բառ սովորես 😉";
  else answer = "Լավ հարց է։ Բայց հիմա դեռ offline եմ։ Շուտով կկապվեմ OpenAI-ի սերվերին և ամեն ինչից տեղեկացված կլինեմ 🧠";

  setTimeout(() => addMessage("Ընկեր Գևորիկ", answer), 800);
});


