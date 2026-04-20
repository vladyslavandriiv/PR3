/**
 * main.js — MetaVault: Аналітика Dota 2 & CS2
 * Практична робота 3: DOM, події, керування станом
 *
 * Завдання 1: Анімована CTA-кнопка
 * Завдання 2: Burger Menu з блокуванням скролу
 * Завдання 3: Лайк-кнопки на картках (toggle стану)
 * Завдання 4: Динамічна фільтрація карток
 */

// ===========================================================
// ЗАВДАННЯ 1: Анімована CTA-кнопка з Visual Feedback
// ===========================================================

const ctaBtn = document.querySelector('#ctaBtn');

ctaBtn.addEventListener('click', function () {
  // Якщо кнопка вже в стані завантаження — ігноруємо клік
  if (ctaBtn.classList.contains('is-loading')) return;

  // Додаємо клас для візуального переходу в стан "Обробка..."
  ctaBtn.classList.add('is-loading');
  ctaBtn.querySelector('.btn-cta__text').textContent = 'Обробка...';

  // Блокуємо кнопку від подвійного відправлення
  ctaBtn.disabled = true;

  // Через 2.5 секунди — скидаємо стан (імітація відповіді сервера)
  setTimeout(() => {
    ctaBtn.classList.remove('is-loading');
    ctaBtn.querySelector('.btn-cta__text').textContent = 'Аналізувати';
    ctaBtn.disabled = false;
  }, 2500);
});


// ===========================================================
// ЗАВДАННЯ 2: Burger Menu (відкриття, закриття, блокування скролу)
// ===========================================================

const burgerBtn = document.querySelector('#burgerBtn');
const mainNav   = document.querySelector('#mainNav');
const navClose  = document.querySelector('#navClose');
const navLinks  = document.querySelectorAll('.nav__link');

/**
 * Відкриває мобільне меню:
 * — Додає клас .open до навігації (CSS анімує transform)
 * — Додає клас .is-open до бургера (бургер → хрестик)
 * — Блокує скрол через .no-scroll на <body>
 * — Оновлює aria-expanded для доступності
 */
function openMenu() {
  mainNav.classList.add('open');
  burgerBtn.classList.add('is-open');
  document.body.classList.add('no-scroll');
  burgerBtn.setAttribute('aria-expanded', 'true');
}

/**
 * Закриває мобільне меню:
 * — Видаляє класи .open та .is-open
 * — Розблоковує скрол
 * — Оновлює aria-expanded
 */
function closeMenu() {
  mainNav.classList.remove('open');
  burgerBtn.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  burgerBtn.setAttribute('aria-expanded', 'false');
}

// Клік по іконці бургера — відкриваємо або закриваємо меню
burgerBtn.addEventListener('click', function () {
  const isOpen = mainNav.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Явне закриття: натискання на кнопку "✕" всередині меню
navClose.addEventListener('click', closeMenu);

// Контекстне закриття: вибір пункту меню закриває його
navLinks.forEach(function (link) {
  link.addEventListener('click', closeMenu);
});


// ===========================================================
// ЗАВДАННЯ 3: Лайк-кнопки (toggle стану з анімацією)
// ===========================================================

// Знаходимо всі кнопки лайків на сторінці
const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Перемикаємо клас .is-active (CSS змінює вигляд серця)
    btn.classList.toggle('is-active');

    const countEl = btn.querySelector('.like-btn__count');
    const currentCount = parseInt(countEl.textContent, 10);

    if (btn.classList.contains('is-active')) {
      // Лайк поставлено — збільшуємо лічильник
      countEl.textContent = currentCount + 1;
      btn.setAttribute('aria-pressed', 'true');
    } else {
      // Лайк знято — зменшуємо лічильник
      countEl.textContent = currentCount - 1;
      btn.setAttribute('aria-pressed', 'false');
    }
  });
});


// ===========================================================
// ЗАВДАННЯ 4: Динамічна фільтрація карток за категорією
// ===========================================================

// Знаходимо всі кнопки-фільтри та всі картки
const filterBtns = document.querySelectorAll('.filter-btn');
const allCards   = document.querySelectorAll('.card');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // 1. Зчитуємо значення data-filter натиснутої кнопки
    const selectedFilter = btn.getAttribute('data-filter');

    // 2. Скидаємо клас .active з усіх кнопок, ставимо на поточну
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    // 3. Проходимо циклом по всіх картках
    allCards.forEach(function (card) {
      const cardCategory = card.getAttribute('data-category');

      // Якщо фільтр "all" або категорія збігається — показуємо
      if (selectedFilter === 'all' || cardCategory === selectedFilter) {
        card.classList.remove('hidden');
      } else {
        // Інакше — ховаємо через клас .hidden (в CSS: display:none)
        card.classList.add('hidden');
      }
    });
  });
});
