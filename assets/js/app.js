/**
 * app.js - Main Application State, Date Logic, i18n & Customizer Controller
 * Birthday E-Card by Dung Automation
 */

const I18N = {
  vi: {
    badgeCelebrate: "Chúc Mừng Sinh Nhật Tuổi Mới 🎂",
    badgeToday: (day, month) => `🎉 Hôm nay chính là sinh nhật bạn (${day}/${month})! 🎂`,
    badgeUpcoming: (days, day, month) => `⏳ Chỉ còn ${days} ngày nữa là đến sinh nhật (${day}/${month})! ✨`,
    badgeGeneral: (day, month) => `🎂 Chúc Mừng Sinh Nhật: ${day}/${month}`,
    heroTitle: (name) => `Chúc Mừng Sinh Nhật <span class="highlight-name">${name}</span>! 🎂`,
    heroSubtitleToday: "Hôm nay là khoảnh khắc tuyệt vời nhất dành riêng cho bạn. Hãy nhắm mắt ước một điều ước và thổi nến nhé!",
    heroSubtitleOther: (date) => `Gửi ngàn lời chúc ngọt ngào nhất nhân ngày sinh nhật ${date}. Chúc bạn tuổi mới luôn rực rỡ!`,
    recipientBanner: (to, from) => `Dành tặng: ${to} • Từ: ${from}`,
    defaultRecipient: "Nàng Thơ",
    defaultSender: "Người thương bạn",
    btnBlow: "Thổi Nến & Ước Nguyện",
    btnRelight: "Thắp Nến Lại",
    btnOpenLetter: "Mở Bức Thư Chúc",
    btnCreateCard: "Tạo Thiệp Tặng",
    cardModalTitle: (name) => `Happy Birthday to ${name}! 🎉`,
    cardModalSender: (from) => `Thương gửi từ: <strong>${from}</strong> 💌`,
    toastCopied: "Đã sao chép link tặng thiệp sinh nhật! Gửi ngay cho người ấy nhé 💌",
    toastSaved: "Đã lưu thông tin thiệp sinh nhật thành công! 🎂",
    toastRelit: "🕯️ Nến đã được thắp sáng trở lại! Hãy tiếp tục ước nguyện nhé!",
    toastPreset: "Đã áp dụng mẫu lời chúc! ✨",
    presets: {
      sweet: "Chúc bạn tuổi mới luôn ngập tràn tiếng cười rạng rỡ, mãi giữ trọn nét hồn nhiên, an yên và được yêu thương đong đầy mỗi ngày! 🎂💖",
      romantic: "Cảm ơn vì đã xuất hiện và mang theo muôn vàn sắc màu tươi đẹp vào cuộc đời anh. Chúc em tuổi mới luôn hạnh phúc, xinh đẹp và bình an trong vòng tay anh! 🌹✨",
      friend: "Chúc mừng sinh nhật bạn hiền! Chúc bạn tuổi mới tiền vào như nước, công việc hanh thông, sớm thoát ế và mãi là người đồng hành tuyệt vời nhé! 👭🍻",
      respect: "Kính chúc tuổi mới dồi dào sức khỏe, vạn sự như ý, luôn an vui, hạnh phúc và gặt hái thêm nhiều thành công viên mãn trên con đường phía trước! 💐🌿",
      success: "Chúc bạn tuổi mới bứt phá ngoạn mục, gặt hái những thắng lợi rực rỡ và luôn kiêu hãnh tỏa sáng như ngôi sao sáng nhất trên bầu trời! 🚀🌟"
    },
    customizerTitle: "Tạo Thiệp Sinh Nhật Tặng",
    labelRecipient: "Tên người nhận (Bạn bè / Người yêu / Gia đình):",
    labelDate: "Ngày sinh nhật của người ấy:",
    labelSender: "Tên người gửi (Bạn):",
    labelWishes: "Gợi ý mẫu lời chúc nhanh:",
    labelSong: "Giai điệu sinh nhật phát kèm:",
    btnSave: "Lưu & Áp Dụng",
    btnCopy: "Sao Chép Link Tặng",
    langButtonText: "🇺🇸 EN"
  },
  en: {
    badgeCelebrate: "Happy Birthday Celebration 🎂",
    badgeToday: (day, month) => `🎉 Today is your birthday (${month}/${day})! 🎂`,
    badgeUpcoming: (days, day, month) => `⏳ Only ${days} days left until your birthday (${month}/${day})! ✨`,
    badgeGeneral: (day, month) => `🎂 Happy Birthday: ${month}/${day}`,
    heroTitle: (name) => `Happy Birthday <span class="highlight-name">${name}</span>! 🎂`,
    heroSubtitleToday: "Today is a truly wonderful day dedicated just to you. Close your eyes, make a wish, and blow out the candles!",
    heroSubtitleOther: (date) => `Sending warmest wishes on your birthday ${date}. Wishing you a radiant and joyful year ahead!`,
    recipientBanner: (to, from) => `For: ${to} • From: ${from}`,
    defaultRecipient: "My Muse",
    defaultSender: "Someone who cares for you",
    btnBlow: "Make a Wish & Blow Candles",
    btnRelight: "Relight Candles",
    btnOpenLetter: "Open Greeting Letter",
    btnCreateCard: "Create Card",
    cardModalTitle: (name) => `Happy Birthday to ${name}! 🎉`,
    cardModalSender: (from) => `With love from: <strong>${from}</strong> 💌`,
    toastCopied: "Birthday gift link copied! Send it right away to make their day 💌",
    toastSaved: "Birthday card settings saved successfully! 🎂",
    toastRelit: "🕯️ Candles relit! Go ahead and make another wish!",
    toastPreset: "Wish preset applied! ✨",
    presets: {
      sweet: "Wishing you a bright year filled with laughter, boundless joy, peace of mind, and endless love every single day! 🎂💖",
      romantic: "Thank you for coming into my life and painting my world with love. Wishing you a year as beautiful, sweet, and radiant as you are! 🌹✨",
      friend: "Happy Birthday to my partner-in-crime! May your year be filled with big wins, hearty laughs, and countless unforgettable moments! 👭🍻",
      respect: "Wishing you abundant health, happiness, prosperity, and great success in everything you pursue in this coming year! 💐🌿",
      success: "May this new age bring exciting breakthroughs, stellar achievements, and help you shine brighter than ever before! 🚀🌟"
    },
    customizerTitle: "Customize Birthday Card",
    labelRecipient: "Recipient name (Friend / Lover / Family):",
    labelDate: "Their birthday date:",
    labelSender: "Sender name (You):",
    labelWishes: "Quick wish presets:",
    labelSong: "Background birthday soundtrack:",
    btnSave: "Save & Apply",
    btnCopy: "Copy Gift Link",
    langButtonText: "🇻🇳 VI"
  }
};

let currentLang = "vi";

function t(key, ...args) {
  const dict = I18N[currentLang] || I18N.vi;
  const val = dict[key];
  if (typeof val === "function") {
    return val(...args);
  }
  return val || key;
}

// Global Card Configuration
let cardConfig = {
  recipient: "",
  sender: "",
  birthDate: "",
  wish: "",
  songIndex: 0
};

let typewriterTimer = null;

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  detectLanguage();
  loadSavedOrUrlConfig();
  initConfetti();
  initAudio();
  initCake();
  populateSongSelect();
  applyConfigToUI();

  // Autoplay hint upon first click anywhere if browser blocked audio
  document.body.addEventListener("click", () => {
    getAudioContext();
  }, { once: true });
});

/* --------------------------------------------------------------------------
   Language Detection & Switching
   -------------------------------------------------------------------------- */
function detectLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("lang")) {
    const l = urlParams.get("lang").toLowerCase();
    currentLang = l.startsWith("vi") ? "vi" : "en";
    return;
  }

  try {
    const saved = localStorage.getItem("thiepsinhnhat_lang");
    if (saved && (saved === "vi" || saved === "en")) {
      currentLang = saved;
      return;
    }
  } catch (e) {}

  // Detect from browser settings
  const navLang = (navigator.language || (navigator.languages && navigator.languages[0]) || "").toLowerCase();
  currentLang = navLang.startsWith("vi") ? "vi" : "en";
}

function toggleLanguage() {
  playTapSFX();
  currentLang = currentLang === "vi" ? "en" : "vi";
  try {
    localStorage.setItem("thiepsinhnhat_lang", currentLang);
  } catch (e) {}

  // If wish was one of preset, translate wish as well
  const oldLang = currentLang === "vi" ? "en" : "vi";
  for (const [key, text] of Object.entries(I18N[oldLang].presets)) {
    if (cardConfig.wish === text) {
      cardConfig.wish = I18N[currentLang].presets[key];
      break;
    }
  }

  // If default recipient was used, translate
  if (cardConfig.recipient === I18N[oldLang].defaultRecipient) {
    cardConfig.recipient = I18N[currentLang].defaultRecipient;
  }
  if (cardConfig.sender === I18N[oldLang].defaultSender) {
    cardConfig.sender = I18N[currentLang].defaultSender;
  }

  applyConfigToUI();
  updateCakeBtnState(candlesLit);
  showToast(currentLang === "vi" ? "Đã chuyển sang Tiếng Việt 🇻🇳" : "Switched to English 🇺🇸");
}

/* --------------------------------------------------------------------------
   Configuration & URL Parameters
   -------------------------------------------------------------------------- */
function loadSavedOrUrlConfig() {
  const urlParams = new URLSearchParams(window.location.search);

  // Defaults based on detected language
  cardConfig.recipient = t("defaultRecipient");
  cardConfig.sender = t("defaultSender");
  cardConfig.wish = I18N[currentLang].presets.sweet;

  // Check LocalStorage
  try {
    const saved = localStorage.getItem("thiepsinhnhat_config");
    if (saved) {
      cardConfig = Object.assign(cardConfig, JSON.parse(saved));
    }
  } catch (e) {}

  // URL parameters take highest priority
  if (urlParams.has("to")) {
    cardConfig.recipient = urlParams.get("to").trim();
  }
  if (urlParams.has("from")) {
    cardConfig.sender = urlParams.get("from").trim();
  }
  if (urlParams.has("date")) {
    cardConfig.birthDate = urlParams.get("date").trim();
  }
  if (urlParams.has("msg")) {
    cardConfig.wish = urlParams.get("msg").trim();
  }
  if (urlParams.has("song")) {
    cardConfig.songIndex = parseInt(urlParams.get("song")) || 0;
  }

  // If no date was set, default to today
  if (!cardConfig.birthDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    cardConfig.birthDate = `${yyyy}-${mm}-${dd}`;
  }
}

/**
 * Calculate birthday countdown and formatted display text
 */
function getBirthdayStatus(dateStr) {
  if (!dateStr) {
    return {
      formatted: currentLang === "vi" ? "Ngày Đặc Biệt" : "Special Day",
      badgeText: t("badgeCelebrate"),
      daysLeft: 0,
      isToday: true
    };
  }

  const parts = dateStr.split("-");
  let birthMonth, birthDay;

  if (parts.length === 3) {
    birthMonth = parseInt(parts[1], 10);
    birthDay = parseInt(parts[2], 10);
  } else if (parts.length === 2) {
    birthMonth = parseInt(parts[0], 10);
    birthDay = parseInt(parts[1], 10);
  } else {
    return {
      formatted: dateStr,
      badgeText: `🎂 ${dateStr}`,
      daysLeft: 0,
      isToday: false
    };
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let nextBday = new Date(currentYear, birthMonth - 1, birthDay);
  if (nextBday < todayZero) {
    nextBday = new Date(currentYear + 1, birthMonth - 1, birthDay);
  }

  const diffTime = nextBday.getTime() - todayZero.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isToday = diffDays === 0;

  const formatted = currentLang === "vi"
    ? `Ngày ${birthDay} Tháng ${birthMonth}`
    : `${new Date(2000, birthMonth - 1, birthDay).toLocaleString('en', { month: 'long' })} ${birthDay}`;

  let badgeText = "";
  if (isToday) {
    badgeText = t("badgeToday", birthDay, birthMonth);
  } else if (diffDays <= 30) {
    badgeText = t("badgeUpcoming", diffDays, birthDay, birthMonth);
  } else {
    badgeText = t("badgeGeneral", birthDay, birthMonth);
  }

  return { formatted, badgeText, daysLeft: diffDays, isToday };
}

/* --------------------------------------------------------------------------
   UI Binding
   -------------------------------------------------------------------------- */
function applyConfigToUI() {
  const bdayInfo = getBirthdayStatus(cardConfig.birthDate);

  // Language button
  const langBtn = document.getElementById("btn-lang-toggle");
  if (langBtn) {
    langBtn.textContent = t("langButtonText");
  }

  // Hero elements
  const heroBadge = document.getElementById("hero-badge");
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const recipientBanner = document.getElementById("recipient-display");

  if (heroBadge) heroBadge.textContent = bdayInfo.badgeText;
  if (heroTitle) heroTitle.innerHTML = t("heroTitle", cardConfig.recipient);
  if (heroSubtitle) {
    heroSubtitle.textContent = bdayInfo.isToday 
      ? t("heroSubtitleToday")
      : t("heroSubtitleOther", bdayInfo.formatted);
  }
  if (recipientBanner) {
    recipientBanner.textContent = t("recipientBanner", cardConfig.recipient, cardConfig.sender);
  }

  // Buttons text
  const btnOpenCard = document.getElementById("btn-open-card-direct");
  if (btnOpenCard) {
    btnOpenCard.innerHTML = `<i class="fa-solid fa-envelope-open-text"></i> <span>${t("btnOpenLetter")}</span>`;
  }

  const btnCreate = document.getElementById("btn-create-toolbar");
  if (btnCreate) {
    btnCreate.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>${t("btnCreateCard")}</span>`;
  }

  // Populate Customizer Form
  const customizerTitle = document.getElementById("customizer-modal-title");
  if (customizerTitle) customizerTitle.textContent = t("customizerTitle");

  const lblRecipient = document.getElementById("lbl-recipient");
  if (lblRecipient) lblRecipient.textContent = t("labelRecipient");

  const lblDate = document.getElementById("lbl-date");
  if (lblDate) lblDate.textContent = t("labelDate");

  const lblSender = document.getElementById("lbl-sender");
  if (lblSender) lblSender.textContent = t("labelSender");

  const lblWishes = document.getElementById("lbl-wishes");
  if (lblWishes) lblWishes.textContent = t("labelWishes");

  const lblSong = document.getElementById("lbl-song");
  if (lblSong) lblSong.textContent = t("labelSong");

  const btnSave = document.getElementById("btn-save-custom");
  if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-check"></i> ${t("btnSave")}`;

  const btnCopy = document.getElementById("btn-copy-link");
  if (btnCopy) btnCopy.innerHTML = `<i class="fa-solid fa-share-nodes"></i> ${t("btnCopy")}`;

  const inputTo = document.getElementById("input-recipient");
  const inputFrom = document.getElementById("input-sender");
  const inputDate = document.getElementById("input-birthdate");
  const inputMsg = document.getElementById("input-message");
  const selectSong = document.getElementById("select-song");

  if (inputTo) inputTo.value = cardConfig.recipient;
  if (inputFrom) inputFrom.value = cardConfig.sender;
  if (inputDate) inputDate.value = cardConfig.birthDate;
  if (inputMsg) inputMsg.value = cardConfig.wish;
  if (selectSong) selectSong.value = cardConfig.songIndex;

  // Audio track title
  loadSong(cardConfig.songIndex);
}

/* --------------------------------------------------------------------------
   Birthday Card Popup Modal
   -------------------------------------------------------------------------- */
function openBirthdayCard() {
  const modal = document.getElementById("card-modal");
  if (!modal) return;

  const bdayInfo = getBirthdayStatus(cardConfig.birthDate);
  document.getElementById("modal-to-name").textContent = cardConfig.recipient;
  document.getElementById("modal-sender-container").innerHTML = t("cardModalSender", cardConfig.sender);
  document.getElementById("modal-bday-tag").textContent = bdayInfo.badgeText;

  const btnRelightModal = document.getElementById("btn-modal-relight");
  if (btnRelightModal) {
    btnRelightModal.innerHTML = `<i class="fa-solid fa-fire-flame-curved"></i> ${t("btnRelight")}`;
  }

  const btnCustomModal = document.getElementById("btn-modal-custom");
  if (btnCustomModal) {
    btnCustomModal.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${t("btnCreateCard")}`;
  }

  modal.classList.add("open");

  // Typewriter effect on message
  startTypewriter(cardConfig.wish);
}

function closeBirthdayCard() {
  playTapSFX();
  const modal = document.getElementById("card-modal");
  if (modal) modal.classList.remove("open");
  if (typewriterTimer) clearTimeout(typewriterTimer);
}

function startTypewriter(text) {
  if (typewriterTimer) clearTimeout(typewriterTimer);
  const container = document.getElementById("modal-wish-text");
  if (!container) return;
  container.textContent = "";

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      container.textContent += text.charAt(i);
      i++;
      typewriterTimer = setTimeout(typeChar, 28 + Math.random() * 20);
    }
  }
  typeChar();
}

/* --------------------------------------------------------------------------
   Customizer Modal & Share Link
   -------------------------------------------------------------------------- */
function openCustomizer() {
  playTapSFX();
  const modal = document.getElementById("customizer-modal");
  if (modal) modal.classList.add("open");
}

function closeCustomizer() {
  playTapSFX();
  const modal = document.getElementById("customizer-modal");
  if (modal) modal.classList.remove("open");
}

function populateSongSelect() {
  const select = document.getElementById("select-song");
  if (!select) return;

  select.innerHTML = "";
  BIRTHDAY_PLAYLIST.forEach(song => {
    const opt = document.createElement("option");
    opt.value = song.id;
    opt.textContent = `🎵 ${song.title} - ${song.artist}`;
    select.appendChild(opt);
  });
}

function applyPresetWish(type) {
  playTapSFX();
  const textarea = document.getElementById("input-message");
  const presets = I18N[currentLang].presets;
  if (textarea && presets[type]) {
    textarea.value = presets[type];
    showToast(t("toastPreset"));
  }
}

function saveCustomCard() {
  playTapSFX();
  const inputTo = document.getElementById("input-recipient");
  const inputFrom = document.getElementById("input-sender");
  const inputDate = document.getElementById("input-birthdate");
  const inputMsg = document.getElementById("input-message");
  const selectSong = document.getElementById("select-song");

  cardConfig.recipient = inputTo.value.trim() || t("defaultRecipient");
  cardConfig.sender = inputFrom.value.trim() || t("defaultSender");
  cardConfig.birthDate = inputDate.value || "";
  cardConfig.wish = inputMsg.value.trim() || I18N[currentLang].presets.sweet;
  cardConfig.songIndex = parseInt(selectSong.value) || 0;

  try {
    localStorage.setItem("thiepsinhnhat_config", JSON.stringify(cardConfig));
  } catch (e) {}

  applyConfigToUI();
  closeCustomizer();
  showToast(t("toastSaved"));

  // Relight candles and ready for blowing
  relightAllCandles();
}

function copyShareableUrl() {
  playTapSFX();
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("to", document.getElementById("input-recipient").value.trim() || cardConfig.recipient);
  url.searchParams.set("from", document.getElementById("input-sender").value.trim() || cardConfig.sender);
  if (document.getElementById("input-birthdate").value) {
    url.searchParams.set("date", document.getElementById("input-birthdate").value);
  }
  url.searchParams.set("msg", document.getElementById("input-message").value.trim() || cardConfig.wish);
  url.searchParams.set("song", document.getElementById("select-song").value || 0);
  url.searchParams.set("lang", currentLang);

  navigator.clipboard.writeText(url.toString()).then(() => {
    showToast(t("toastCopied"));
  }).catch(() => {
    showToast("Link: " + url.toString());
  });
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  document.getElementById("toast-text").textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3400);
}
