// ============================================================
//  Mobile Burger Menu
// ============================================================
function initBurgerMenu() {
  const btn   = document.getElementById('burger-btn');
  const menu  = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  let isOpen = false;
  // Keep reference to previously focused element for a11y restore
  let lastFocused = null;

  // All focusable elements inside the overlay
  const getFocusable = () =>
    [...menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')];

  const open = () => {
    isOpen = true;
    lastFocused = document.activeElement;

    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Закрыть меню');
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');

    // Move focus into menu after transition starts
    requestAnimationFrame(() => {
      const first = getFocusable()[0];
      if (first) first.focus();
    });
  };

  const close = () => {
    isOpen = false;

    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Открыть меню');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');

    // Restore focus to burger button
    if (lastFocused) lastFocused.focus();
  };

  // Toggle on burger click
  btn.addEventListener('click', () => (isOpen ? close() : open()));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });

  // Close on backdrop click (click on overlay itself, not its children)
  menu.addEventListener('click', (e) => {
    if (e.target === menu) close();
  });

  // Close on any nav link or CTA click inside the menu
  menu.querySelectorAll('.mobile-menu__link, .mobile-menu__cta').forEach((link) => {
    link.addEventListener('click', () => {
      close();
    });
  });

  // Focus trap: cycle focus inside overlay when it is open
  menu.addEventListener('keydown', (e) => {
    if (!isOpen || e.key !== 'Tab') return;
    const focusable = getFocusable();
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// Логика Premium Lead Квиза (CRO-optimized Quiz)
function initQuiz() {
  const steps = document.querySelectorAll('.quiz-step');
  const btnPrev = document.getElementById('quiz-btn-prev');
  const progressContainer = document.getElementById('quiz-progress-container');
  const progressBar = document.getElementById('quiz-progress-bar');
  const stepCounter = document.getElementById('quiz-step-counter');
  const leadForm = document.getElementById('quiz-lead-form');
  
  if (!steps.length) return;

  // Объект для хранения ответов пользователя
  const answers = {
    style: null,
    length: null,
    priority: null,
    name: null,
    email: null
  };

  const totalSteps = 4; // Количество шагов до формы
  let currentStep = 1;

  // Обновление UI прогресса и кнопок
  const updateUI = () => {
    // Показываем прогресс бар только для шагов с вопросами и формы (1-4)
    if (currentStep >= 1 && currentStep <= totalSteps) {
      progressContainer.classList.remove('hidden');
      stepCounter.textContent = `Шаг ${currentStep} из ${totalSteps}`;
      progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
    } else {
      progressContainer.classList.add('hidden');
    }

    // Кнопка "Назад" видима только со 2-го шага
    if (currentStep > 1 && currentStep <= totalSteps) {
      btnPrev.classList.remove('invisible');
    } else {
      btnPrev.classList.add('invisible');
    }

    // Переключение активного шага
    steps.forEach(step => {
      step.classList.remove('active');
      // Ищем шаг по data-step
      // Форма у нас шаг 4, Результат - 'result'
      let stepVal = step.dataset.step;
      if (stepVal == currentStep || (currentStep > totalSteps && stepVal === 'result')) {
        step.classList.add('active');
        // Плавное появление (перезапуск анимации)
        step.style.animation = 'none';
        step.offsetHeight; /* trigger reflow */
        step.style.animation = null; 
      }
    });
  };

  // Обработчики кликов на ответы
  const answerBtns = document.querySelectorAll('.quiz-answer');
  answerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const question = btn.dataset.question;
      const value = btn.dataset.value;
      
      // Сохраняем ответ
      answers[question] = value;

      // Визуально выделяем выбранную кнопку на текущем шаге
      const currentStepBtns = btn.closest('.quiz-step').querySelectorAll('.quiz-answer');
      currentStepBtns.forEach(b => {
        b.style.borderColor = 'rgba(18,18,18,0.1)';
        b.style.backgroundColor = 'rgba(255,255,255,0.2)';
      });
      btn.style.borderColor = '#121212';
      btn.style.backgroundColor = 'transparent';

      // Плавный переход к следующему шагу с небольшой задержкой
      setTimeout(() => {
        currentStep++;
        updateUI();
      }, 350);
    });
  });

  // Кнопка "Назад"
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateUI();
      }
    });
  }

  // Генерация персонального результата на основе ответов
  const generateResult = () => {
    const resStyle = document.getElementById('quiz-res-style');
    const resService = document.getElementById('quiz-res-service');
    const resMaster = document.getElementById('quiz-res-master');

    // Базовая логика подбора
    if (answers.style === 'trend') {
      resStyle.textContent = 'Авангард / Смелый тренд';
      resMaster.textContent = 'Арт-директор Александр';
      if (answers.priority === 'expressive') {
        resService.textContent = 'Сложное окрашивание + Креативная стрижка';
      } else {
        resService.textContent = 'Креативная стрижка + Уход';
      }
    } else {
      resStyle.textContent = 'Архитектурная классика';
      resMaster.textContent = 'Топ-стилист Елена';
      if (answers.length === 'short') {
        resService.textContent = 'Авторская стрижка + Пилинг кожи головы';
      } else {
        resService.textContent = 'Архитектурная стрижка + Индивидуальный уход';
      }
    }
  };

  // Отправка формы (Webhook)
  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      answers.name = document.getElementById('quiz-name').value;
      answers.email = document.getElementById('quiz-email').value;

      const submitBtn = document.getElementById('quiz-submit-btn');
      const btnText = document.getElementById('quiz-btn-text');
      const btnLoader = document.getElementById('quiz-btn-loader');

      // UI Лоадер
      submitBtn.disabled = true;
      btnText.textContent = 'Отправка...';
      btnLoader.classList.remove('hidden');

      try {
        // --- Место для отправки данных (Webhook) ---
        const WEBHOOK_URL = 'https://maks1111.app.n8n.cloud/webhook-test/764e3ba2-d92d-4b23-a7de-aa8f9ed1b696';
        await fetch(WEBHOOK_URL, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ source: 'quiz', ...answers })
        });

        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 800));

        // Успешная отправка -> Показываем результат
        generateResult();
        currentStep++; // Переход к результату (шаг 5)
        updateUI();
        
      } catch (error) {
        console.error('Ошибка отправки формы:', error);
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
      } finally {
        // Возвращаем UI кнопки
        submitBtn.disabled = false;
        btnText.textContent = 'Получить рекомендацию';
        btnLoader.classList.add('hidden');
      }
    });
  }

  // Инициализация первого шага
  updateUI();
}

// ============================================================
// Data structure for the updated prices (Price Store)
// ============================================================
const PRICES_DATA = {
  services: [
    { id: 'haircut_w', name: 'Женская стрижка', type: 'master', prices: { master: 3600, stylist: 4000, expert: 4500, top: 5000, art: 10000 } },
    { id: 'haircut_m', name: 'Мужская стрижка', type: 'master', prices: { master: 3100, stylist: 3500, expert: 4000, top: 4500 } },
    { id: 'haircut_bangs', name: 'Стрижка челки', type: 'master', prices: { master: 1300, stylist: 1500, expert: 2000, top: 2500, art: 3000 } },
    { id: 'styling_light', name: 'Укладка Легкая', type: 'master', prices: { master: 2600, stylist: 2800, expert: 3200, top: 3800 } },
    { id: 'styling_medium', name: 'Укладка Медиум', type: 'master', prices: { master: 3100, stylist: 3400, expert: 3800, top: 4300 } },
    { id: 'coloring_basic', name: 'Окрашивание (1 тон)', type: 'from', price: 5500 },
    { id: 'coloring_complex_25', name: 'Сложное окрашивание (до 25%)', type: 'from', price: 7000 },
    { id: 'coloring_complex_50', name: 'Сложное окрашивание (до 50%)', type: 'from', price: 9000 },
    { id: 'coloring_total', name: 'Тотал блонд', type: 'from', price: 9000 },
    { id: 'care_peeling', name: 'Пилинг кожи головы', type: 'fixed', price: 5000 },
    { id: 'lamination', name: 'Ламинирование SEBASTIAN', type: 'length', prices: { medium: 15000, long: 20000 } },
    { id: 'makeup_express', name: 'Экспресс-макияж', type: 'fixed', price: 3000 },
    { id: 'makeup_day', name: 'Дневной макияж', type: 'fixed', price: 4000 }
  ],
  masters: {
    master: 'Мастер',
    stylist: 'Стилист',
    expert: 'Эксперт',
    top: 'Топ-стилист',
    art: 'Арт-директор'
  },
  lengths: {
    medium: 'Средняя',
    long: 'Длинная'
  }
};

// Инициализация калькулятора услуг
function initCalculator() {
  const serviceSelect = document.getElementById('calc-service');
  const masterSelect = document.getElementById('calc-master');
  const lengthContainer = document.getElementById('calc-length-container');

  if (!serviceSelect || !masterSelect || !lengthContainer) return;

  // Наполняем селект услуг
  serviceSelect.innerHTML = PRICES_DATA.services.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  
  // Наполняем селект мастеров
  masterSelect.innerHTML = Object.entries(PRICES_DATA.masters).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
  
  // Наполняем радио-кнопки длин
  lengthContainer.innerHTML = Object.entries(PRICES_DATA.lengths).map(([k, v], i) => `
    <label class="flex-1 text-center py-4 border border-white/5 cursor-pointer hover:bg-white/[0.02] rounded-custom has-[:checked]:border-brand/40 has-[:checked]:text-brand text-xs transition-all uppercase tracking-widest opacity-60 has-[:checked]:opacity-100">
      <input class="hidden" name="calc-length" onchange="calculatePrice()" type="radio" value="${k}" ${i === 0 ? 'checked' : ''} />
      ${v}
    </label>
  `).join('');

  updateCalcUI();
}

// Обновление видимости полей в зависимости от типа услуги
function updateCalcUI() {
  const serviceId = document.getElementById('calc-service').value;
  const service = PRICES_DATA.services.find(s => s.id === serviceId);
  if (!service) return;
  
  const masterWrapper = document.getElementById('calc-master-wrapper');
  const lengthWrapper = document.getElementById('calc-length-wrapper');

  if (service.type === 'master') {
    masterWrapper.classList.remove('hidden');
    lengthWrapper.classList.add('hidden');
    
    // Скрываем мастеров, для которых нет цен
    const masterSelect = document.getElementById('calc-master');
    Array.from(masterSelect.options).forEach(opt => {
      opt.style.display = service.prices[opt.value] ? 'block' : 'none';
    });
    
    // Если выбранный мастер недоступен, выбираем первого доступного
    if (service.prices && !service.prices[masterSelect.value]) {
      const firstAvailable = Array.from(masterSelect.options).find(opt => service.prices[opt.value]);
      if (firstAvailable) masterSelect.value = firstAvailable.value;
    }
  } else if (service.type === 'length') {
    masterWrapper.classList.add('hidden');
    lengthWrapper.classList.remove('hidden');
  } else {
    // fixed or from - прячем лишние поля
    masterWrapper.classList.add('hidden');
    lengthWrapper.classList.add('hidden');
  }

  calculatePrice();
}

// Главный расчет калькулятора услуг (Service Calculator)
function calculatePrice() {
  const serviceId = document.getElementById('calc-service').value;
  const service = PRICES_DATA.services.find(s => s.id === serviceId);
  const resultEl = document.getElementById('calc-result');
  if (!service || !resultEl) return;
  
  let priceStr = '';

  if (service.type === 'fixed') {
    priceStr = service.price.toLocaleString('ru-RU') + ' ₽';
  } else if (service.type === 'from') {
    priceStr = 'от ' + service.price.toLocaleString('ru-RU') + ' ₽';
  } else if (service.type === 'master') {
    const masterVal = document.getElementById('calc-master').value;
    const price = service.prices[masterVal] || Object.values(service.prices)[0] || 0; 
    priceStr = price.toLocaleString('ru-RU') + ' ₽';
  } else if (service.type === 'length') {
    const checked = document.querySelector('input[name="calc-length"]:checked');
    const lengthVal = checked ? checked.value : Object.keys(PRICES_DATA.lengths)[0];
    const price = service.prices[lengthVal] || 0;
    priceStr = price.toLocaleString('ru-RU') + ' ₽';
  }

  // Плавное обновление текста без скачков
  resultEl.style.transition = 'opacity 0.15s ease';
  resultEl.style.opacity = '0';
  
  setTimeout(() => {
    resultEl.innerText = priceStr;
    resultEl.style.opacity = '1';
  }, 150);
}

// Переключение категорий прайс-листа (Price List Tabs)
function initPriceListTabs() {
  const tabs = document.querySelectorAll('.price-list__tab');
  const panels = document.querySelectorAll('.price-list__panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanel = tab.dataset.tab;

      // Деактивируем все табы и панели
      tabs.forEach(t => {
        t.classList.remove('price-list__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('price-list__panel--active'));

      // Активируем выбранный таб и соответствующую панель
      tab.classList.add('price-list__tab--active');
      tab.setAttribute('aria-selected', 'true');

      const panel = document.querySelector(`[data-panel="${targetPanel}"]`);
      if (panel) {
        panel.classList.add('price-list__panel--active');
      }

      // Авто-скролл таба в видимую зону (для мобильных устройств)
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
}

// Логика формы записи (Booking Form)
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name').value;
    const phone = document.getElementById('booking-phone').value;
    const service = document.getElementById('booking-service').value;

    const btnSubmit = document.getElementById('booking-submit-btn');
    const btnText = document.getElementById('booking-btn-text');
    const btnLoader = document.getElementById('booking-btn-loader');

    // UI Лоадер
    btnSubmit.disabled = true;
    btnText.textContent = 'ОТПРАВКА...';
    btnLoader.classList.remove('hidden');

    try {
      const WEBHOOK_URL = 'https://maks1111.app.n8n.cloud/webhook-test/764e3ba2-d92d-4b23-a7de-aa8f9ed1b696';
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'booking',
          name,
          phone,
          service
        })
      });

      // Успешная отправка
      btnText.textContent = 'ЗАЯВКА ОТПРАВЛЕНА';
      form.reset();
      
      setTimeout(() => {
        btnText.textContent = 'ОТПРАВИТЬ ЗАПРОС';
      }, 3000);

    } catch (error) {
      console.error('Ошибка отправки формы записи:', error);
      btnText.textContent = 'ОШИБКА';
    } finally {
      btnSubmit.disabled = false;
      btnLoader.classList.add('hidden');
    }
  });
}


// Логика управления видео при наведении с эффектом плавного растворения
function initVideoInteraction() {
  const video = document.getElementById('philosophy-video');
  if (!video) return;

  let pauseTimeout = null;

  video.addEventListener('mouseenter', () => {
    if (pauseTimeout) clearTimeout(pauseTimeout);
    
    // Сбрасываем скорость до нормальной (на случай, если остались ошметки старой логики)
    video.playbackRate = 1.0;
    
    // Запускаем воспроизведение. 
    // Визуальный переход (цветокор и прозрачность) уже описан в CSS классах.
    video.play().catch(err => console.warn("Play blocked:", err));
  });

  video.addEventListener('mouseleave', () => {
    // Не останавливаем видео мгновенно.
    // Даем CSS-переходу (transition-all duration-1000) время, чтобы 
    // видео плавно ушло в ч/б и легкую прозрачность.
    pauseTimeout = setTimeout(() => {
      video.pause();
    }, 800); // чуть меньше длительности transition (1000ms), чтобы выглядело естественно
  });
}

// Логика FAQ-аккордеона
function initFAQ() {
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  
  if (!faqTriggers.length) return;
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.closest('.faq-item');
      const content = faqItem.querySelector('.faq-content');
      const icon = trigger.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');
      
      // Закрываем все остальные FAQ-элементы
      document.querySelectorAll('.faq-item').forEach(item => {
        const otherContent = item.querySelector('.faq-content');
        const otherIcon = item.querySelector('.faq-icon');
        
        if (item !== faqItem) {
          otherContent.classList.add('hidden');
          otherIcon.style.transform = 'rotate(0deg)';
        }
      });
      
      // Переключаем текущий элемент
      if (isOpen) {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// Логика формы для новых гостей
function initNewGuestForm() {
  const form = document.getElementById('newguest-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('newguest-name').value;
    const phone = document.getElementById('newguest-phone').value;
    const service = document.getElementById('newguest-service').value;

    const btnSubmit = form.querySelector('button[type="submit"]');
    const originalText = btnSubmit.querySelector('span').textContent;

    btnSubmit.disabled = true;
    btnSubmit.querySelector('span').textContent = 'ОТПРАВКА...';

    try {
      const WEBHOOK_URL = 'https://maks1111.app.n8n.cloud/webhook-test/764e3ba2-d92d-4b23-a7de-aa8f9ed1b696';
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'newguest',
          name,
          phone,
          service
        })
      });

      btnSubmit.querySelector('span').textContent = 'ЗАЯВКА ОТПРАВЛЕНА';
      form.reset();
      
      setTimeout(() => {
        btnSubmit.querySelector('span').textContent = originalText;
      }, 3000);

    } catch (error) {
      console.error('Ошибка отправки формы нового гостя:', error);
      btnSubmit.querySelector('span').textContent = 'ОШИБКА';
    } finally {
      btnSubmit.disabled = false;
    }
  });
}

// Логика галереи работ мастеров
function initMasterGallery() {
  const masterCards = document.querySelectorAll('[data-master]');
  const gallery = document.getElementById('master-gallery');
  const galleryTrack = document.getElementById('gallery-track');
  const closeGalleryBtn = document.getElementById('close-gallery');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const galleryMasterName = document.getElementById('gallery-master-name');

  if (!masterCards.length || !gallery || !galleryTrack) return;

  // Данные о работах мастеров (примерные данные)
  const mastersData = {
    alexander: {
      name: 'Александр В.',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDUMjsDwQ9tFXQIBpR0QK-HRY6jd2hGh6p8h6tAC0WTMfs_IFbwnBwH96vKTZb8TtVwpbmNUYAw_HqgcGGmDdxVDwGyAFOxEkxMtIaMidvl5jsZirtvWOPER8XbkdNbCA6dNCu64qUXwAhzM8l7Ya0SMgbOoxn5m5RGozi1u0-3lpXoIoKtoKE0GrjkhQyt_56fl9GwPduK9bp9tf_I8ZX0kznakjYi2tLd6p5e-G81ECiePYXLpLeouV3kVrSO9u3curz4vYkWut8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAmzGdO-A6gXB8M4Q45kC2WErEgyOWjacVjkLiBsfyQlB5HijvmB3iRRznuZyWqGoy0K3fabgFxoWZ2Gv2_6WPPM_ctwT60lo3MBulMIwjObFdYEZgaWF2Wu5u1Q5MVqWQCzXCER-o5xArJvMH8GMqjlC-SwTcovQb4ps6jxKxiXq6GEt6Yv3kTNGfB3cFSq0v9jFGMjXYWeGmLI06uD1G0w6NeqXCrcRXUUa3FSE4hB-tQd7gBrL8jxL8h8WXyFQHvMWVE-bizYwk',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBnM2AWvm4qNt2k5096dNgP_674MAnQoTAZ3kH2cECMXc54MY3ryDW3OfMLrafb23-1Q7QnQMFRmKoyE2MkWbeUbUsPuUChKSfhSPbGfGCqxL9zVIDqB6YcnP5b3i1-6zZwp3jzWZoF2vERx8du_IiZRoj-BUB0yxphmi-l4b9Qdvb-XAIZnwMbA90xQWoCPoYOjKTfuE4Yu8JrtLfJgIOuTbiKw_7LvDAysLqZ3YsqPEWSJc8V7gzVwYCdgUI0c8kdxltT8qwT3WM'
      ]
    },
    elena: {
      name: 'Елена М.',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDUMjsDwQ9tFXQIBpR0QK-HRY6jd2hGh6p8h6tAC0WTMfs_IFbwnBwH96vKTZb8TtVwpbmNUYAw_HqgcGGmDdxVDwGyAFOxEkxMtIaMidvl5jsZirtvWOPER8XbkdNbCA6dNCu64qUXwAhzM8l7Ya0SMgbOoxn5m5RGozi1u0-3lpXoIoKtoKE0GrjkhQyt_56fl9GwPduK9bp9tf_I8ZX0kznakjYi2tLd6p5e-G81ECiePYXLpLeouV3kVrSO9u3curz4vYkWut8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAmzGdO-A6gXB8M4Q45kC2WErEgyOWjacVjkLiBsfyQlB5HijvmB3iRRznuZyWqGoy0K3fabgFxoWZ2Gv2_6WPPM_ctwT60lo3MBulMIwjObFdYEZgaWF2Wu5u1Q5MVqWQCzXCER-o5xArJvMH8GMqjlC-SwTcovQb4ps6jxKxiXq6GEt6Yv3kTNGfB3cFSq0v9jFGMjXYWeGmLI06uD1G0w6NeqXCrcRXUUa3FSE4hB-tQd7gBrL8jxL8h8WXyFQHvMWVE-bizYwk',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBnM2AWvm4qNt2k5096dNgP_674MAnQoTAZ3kH2cECMXc54MY3ryDW3OfMLrafb23-1Q7QnQMFRmKoyE2MkWbeUbUsPuUChKSfhSPbGfGCqxL9zVIDqB6YcnP5b3i1-6zZwp3jzWZoF2vERx8du_IiZRoj-BUB0yxphmi-l4b9Qdvb-XAIZnwMbA90xQWoCPoYOjKTfuE4Yu8JrtLfJgIOuTbiKw_7LvDAysLqZ3YsqPEWSJc8V7gzVwYCdgUI0c8kdxltT8qwT3WM'
      ]
    },
    mark: {
      name: 'Марк С.',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDUMjsDwQ9tFXQIBpR0QK-HRY6jd2hGh6p8h6tAC0WTMfs_IFbwnBwH96vKTZb8TtVwpbmNUYAw_HqgcGGmDdxVDwGyAFOxEkxMtIaMidvl5jsZirtvWOPER8XbkdNbCA6dNCu64qUXwAhzM8l7Ya0SMgbOoxn5m5RGozi1u0-3lpXoIoKtoKE0GrjkhQyt_56fl9GwPduK9bp9tf_I8ZX0kznakjYi2tLd6p5e-G81ECiePYXLpLeouV3kVrSO9u3curz4vYkWut8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAmzGdO-A6gXB8M4Q45kC2WErEgyOWjacVjkLiBsfyQlB5HijvmB3iRRznuZyWqGoy0K3fabgFxoWZ2Gv2_6WPPM_ctwT60lo3MBulMIwjObFdYEZgaWF2Wu5u1Q5MVqWQCzXCER-o5xArJvMH8GMqjlC-SwTcovQb4ps6jxKxiXq6GEt6Yv3kTNGfB3cFSq0v9jFGMjXYWeGmLI06uD1G0w6NeqXCrcRXUUa3FSE4hB-tQd7gBrL8jxL8h8WXyFQHvMWVE-bizYwk',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBnM2AWvm4qNt2k5096dNgP_674MAnQoTAZ3kH2cECMXc54MY3ryDW3OfMLrafb23-1Q7QnQMFRmKoyE2MkWbeUbUsPuUChKSfhSPbGfGCqxL9zVIDqB6YcnP5b3i1-6zZwp3jzWZoF2vERx8du_IiZRoj-BUB0yxphmi-l4b9Qdvb-XAIZnwMbA90xQWoCPoYOjKTfuE4Yu8JrtLfJgIOuTbiKw_7LvDAysLqZ3YsqPEWSJc8V7gzVwYCdgUI0c8kdxltT8qwT3WM'
      ]
    }
  };

  let currentSlide = 0;
  let currentMaster = null;

  const openGallery = (masterId) => {
    const master = mastersData[masterId];
    if (!master) return;

    currentMaster = masterId;
    currentSlide = 0;
    galleryMasterName.textContent = master.name;

    galleryTrack.innerHTML = master.images.map(img => `
      <div class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
        <img src="${img}" alt="Работа ${master.name}" class="w-full h-[400px] object-cover rounded-custom" />
      </div>
    `).join('');

    gallery.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    gallery.classList.add('hidden');
    document.body.style.overflow = '';
  };

  const nextSlide = () => {
    const master = mastersData[currentMaster];
    if (!master) return;
    currentSlide = (currentSlide + 1) % master.images.length;
    updateGalleryPosition();
  };

  const prevSlide = () => {
    const master = mastersData[currentMaster];
    if (!master) return;
    currentSlide = (currentSlide - 1 + master.images.length) % master.images.length;
    updateGalleryPosition();
  };

  const updateGalleryPosition = () => {
    const slideWidth = galleryTrack.firstElementChild.offsetWidth;
    galleryTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  };

  masterCards.forEach(card => {
    card.addEventListener('click', () => {
      const masterId = card.dataset.master;
      openGallery(masterId);
    });
  });

  closeGalleryBtn.addEventListener('click', closeGallery);
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    if (gallery.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
}


document.addEventListener('DOMContentLoaded', () => {
  // Инициализация бургер-меню
  initBurgerMenu();

  // Инициализация квиза
  initQuiz();

  // Инициализация табов прайс-листа
  initPriceListTabs();

  // Инициализация формы записи
  initBookingForm();

  // Инициализация калькулятора с новыми данными
  initCalculator();

  // Инициализация взаимодействия с видео
  initVideoInteraction();

  // Инициализация FAQ-аккордеона
  initFAQ();

  // Инициализация формы для новых гостей
  initNewGuestForm();

  // Инициализация галереи работ мастеров
  initMasterGallery();

  // --- 1. LENIS SMOOTH SCROLLING ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Анимация появления элементов (Reveal on Scroll)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll('.reveal-header, .reveal-item');
  elementsToReveal.forEach(el => observer.observe(el));

  // Подсветка активного пункта меню (Active Nav Tracking)
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length && sections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    sections.forEach((s) => navObserver.observe(s));
  }

  // Плавный скролл к якорям (Smooth Scroll)
  // Covers: desktop .nav-link, mobile .mobile-menu__link, .mobile-menu__cta, and any #booking CTA
  document.addEventListener("click", (event) => {
    const link = event.target.closest('.nav-link, .mobile-menu__link, .mobile-menu__cta, a[href^="#booking"]');
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || !href.startsWith('#')) return;
    const targetId = href.slice(1);
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    event.preventDefault();
    lenis.scrollTo(targetEl, { offset: 0 });
  });
});
