document.addEventListener('DOMContentLoaded', () => {
    
    // 1. СОЗДАНИЕ МОДАЛЬНОГО ОКНА ПРИ ЗАГРУЗКЕ
    if (!document.getElementById('contactModal')) {
        const modalHTML = `
            <div id="contactModal" class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h3 class="modal-title">Связаться с нами</h3>
                    <p class="modal-desc">Выберите удобный мессенджер для связи:</p>
                    <div class="modal-buttons">
                        <a href="https://wa.me/79000000000" target="_blank" class="modal-btn whatsapp">WhatsApp</a>
                        <a href="https://t.me/username" target="_blank" class="modal-btn telegram">Telegram</a>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modalStyles = `
            <style>
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s, visibility 0.3s;
                    z-index: 1000;
                    padding: 20px;
                }
                .modal-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
                .modal-content {
                    background: #f7f4ee;
                    padding: 40px 30px;
                    border-radius: 4px;
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    position: relative;
                    border: 1px solid #d6d0c4;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #1a1a1a;
                }
                .modal-content h3 {
                    font-family: 'Playfair Display', serif;
                    font-size: 28px;
                    margin-bottom: 15px;
                    color: #1a1a1a;
                }
                .modal-content p {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 25px;
                }
                .modal-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .modal-btn {
                    padding: 12px 24px;
                    text-decoration: none;
                    font-size: 12px;
                    letter-spacing: 0.1em;
                    color: #fff;
                    border-radius: 2px;
                    transition: opacity 0.2s;
                    flex: 1;
                    min-width: 120px;
                }
                .modal-btn.whatsapp {
                    background-color: #25d366;
                }
                .modal-btn.telegram {
                    background-color: #0088cc;
                }
                .modal-btn:hover {
                    opacity: 0.85;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }

    const modalWindow = document.getElementById('contactModal');
    const closeBtn = modalWindow ? modalWindow.querySelector('.modal-close') : null;

    // 2. ОБРАБОТКА КЛИКОВ ПО КНОПКАМ ПРОСМОТРА И О ДОМЕ
    const aboutBtns = document.querySelectorAll('.hero-footer .btn-dark:first-child');
    aboutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('.specs-section');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const viewBtns = document.querySelectorAll('.hero-footer .btn-dark:last-child, .final-section .btn-dark');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('.final-section');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            if (modalWindow) modalWindow.classList.add('active');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modalWindow.classList.remove('active');
        });
    }

    if (modalWindow) {
        modalWindow.addEventListener('click', (e) => {
            if (e.target === modalWindow) {
                modalWindow.classList.remove('active');
            }
        });
    }

    // 3. НАВИГАЦИЯ ПО СЕКЦИЯМ
    const headerLinks = document.querySelectorAll('.header .nav a:not(.lang)');
    const footerLinks = document.querySelectorAll('.footer-nav a');

    const sectionsToScroll = [
        document.querySelector('.about-section'),     // О доме
        document.querySelector('.hero-section'),      // Дом
        document.querySelector('.gallery-section'),   // Галерея
        document.querySelector('.location-section'),  // Локация
        document.querySelector('.final-section')      // Контакты
    ];

    [headerLinks, footerLinks].forEach(linkGroup => {
        linkGroup.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = sectionsToScroll[index];
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });

    // 4. ПЕРЕКЛЮЧЕНИЕ ЯЗЫКОВ (RU / EN) ВКЛЮЧАЯ МОДАЛКУ
    const langBtn = document.querySelector('.nav .lang');
    let isRussian = true;

    const translations = {
        ru: {
            nav: ["О доме", "Дом", "Галерея", "Локация", "Контакты"],
            subtitle: "КРЫМ · СТРОГОНОВКА · ЧАСТНЫЙ ДОМ",
            title: "Новый стандарт загородной жизни",
            desc: "Современный частный дом в окружении природы. Пространство для спокойной и комфортной жизни вашей семьи.",
            btnAbout: "О ДОМЕ",
            btnView: "ЗАПИСАТЬСЯ НА ПРОСМОТР",
            scroll: "ЛИСТАЙТЕ ДАЛЬШЕ",
            sec1Num: "01 / О ДОМЕ",
            sec1Title: "Место, которое можно назвать домом",
            sec1Text1: "Новый современный частный дом в тихом, экологически благоприятном районе Крыма. Современная архитектура, функциональная планировка и комфортные условия для жизни.",
            sec1Text2: "Для тех, кто ценит уединение, природу и удобный доступ к городу.",
            sec2Num: "02 / ХАРАКТЕРИСТИКИ",
            sec2Title: "Продумано для жизни",
            labels2: ["ПЛОЩАДЬ ДОМА", "ПЛОЩАДЬ УЧАСТКА", "КОМНАТЫ", "ГОД ПОСТРОЙКИ"],
            specsList: ["Этажность", "Санузел", "Терраса", "Отопление", "Водоснабжение", "Канализация", "Электричество", "Интернет", "Парковка", "Газ", "Подъезд", "Остановка"],
            specsDesc: ["1 этаж", "1, совмещённый", "Есть", "Электрическое", "Центральное", "Септик", "Трёхфазное", "Wi-Fi", "Есть", "Подключение на границе участка", "Асфальт", "5 минут пешком"],
            sec3Num: "03 / ГАЛЕРЕЯ",
            sec3Title: "Каждая деталь имеет значение",
            sec3Sub: "Архитектура, интерьер и окружение.",
            sec4Num: "04 / ВНУТРЕННЕЕ ПРОСТРАНСТВО",
            sec4Title: "Свобода в каждом метре",
            interiorLabels: ["Комнаты", "Высота потолков", "Совмещённый санузел", "Гардеробная", "Котельная / хозяйственная комната", "Прихожая и коридор"],
            sec5Num: "05 / РАСПОЛОЖЕНИЕ",
            sec5Title: "Идеальный баланс",
            locTitle: "Строгоновка",
            locTexts: [
                "Симферопольский район, Крым. Тихое место в окружении природы с удобным доступом к Симферополю.",
                "Около 20 минут на автомобиле до центра",
                "Лес и озеро поблизости",
                "Остановка в 5 минутах ходьбы",
                "Магазин рядом · асфальтированный подъезд"
            ],
            sec6Num: "06 / ВАШ НОВЫЙ ДОМ",
            sec6Text: "Возможна покупка в ипотеку. Прямая продажа от собственника / застройщика. Просмотр по предварительной записи.",
            rights: "© 2026 PRIVATE RESIDENCE. Все права защищены. · RU",
            modalTitle: "Связаться с нами",
            modalDesc: "Выберите удобный мессенджер для связи:"
        },
        en: {
            nav: ["About", "House", "Gallery", "Location", "Contacts"],
            subtitle: "CRIMEA · STROGONOVKA · PRIVATE HOUSE",
            title: "A new standard of country living",
            desc: "A modern private house surrounded by nature. A space for a calm and comfortable life for your family.",
            btnAbout: "ABOUT HOUSE",
            btnView: "BOOK A VIEWING",
            scroll: "SCROLL DOWN",
            sec1Num: "01 / ABOUT",
            sec1Title: "A place to call home",
            sec1Text1: "A new modern private house in a quiet, ecologically favorable area of Crimea. Modern architecture, functional layout, and comfortable living conditions.",
            sec1Text2: "For those who value privacy, nature, and convenient access to the city.",
            sec2Num: "02 / SPECIFICATIONS",
            sec2Title: "Thought out for life",
            labels2: ["HOUSE AREA", "PLOT AREA", "ROOMS", "YEAR BUILT"],
            specsList: ["Storeys", "Bathroom", "Terrace", "Heating", "Water supply", "Sewerage", "Electricity", "Internet", "Parking", "Gas", "Access", "Bus stop"],
            specsDesc: ["1 floor", "1, combined", "Yes", "Electric", "Central", "Septic", "Three-phase", "Wi-Fi", "Yes", "Connection at plot border", "Asphalt", "5 minutes walk"],
            sec3Num: "03 / GALLERY",
            sec3Title: "Every detail matters",
            sec3Sub: "Architecture, interior, and surroundings.",
            sec4Num: "04 / INTERIOR SPACE",
            sec4Title: "Freedom in every meter",
            interiorLabels: ["Rooms", "Ceiling height", "Combined bathroom", "Wardrobe", "Boiler / utility room", "Hallway and corridor"],
            sec5Num: "05 / LOCATION",
            sec5Title: "Perfect balance",
            locTitle: "Strogonovka",
            locTexts: [
                "Simferopol district, Crimea. A quiet place surrounded by nature with easy access to Simferopol.",
                "About 20 minutes by car to the center",
                "Forest and lake nearby",
                "Bus stop within 5 minutes walk",
                "Shop nearby · asphalt access road"
            ],
            sec6Num: "06 / YOUR NEW HOME",
            sec6Text: "Mortgage purchase possible. Direct sale from owner / developer. Viewing by appointment.",
            rights: "© 2026 PRIVATE RESIDENCE. All rights reserved. · EN",
            modalTitle: "Contact us",
            modalDesc: "Choose a convenient messenger to contact us:"
        }
    };

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isRussian = !isRussian;
            langBtn.textContent = isRussian ? "RU" : "EN";
            const t = isRussian ? translations.ru : translations.en;

            const navItems = document.querySelectorAll('.nav a:not(.lang), .footer-nav a');
            navItems.forEach((el, idx) => { if (t.nav[idx % 5]) el.textContent = t.nav[idx % 5]; });

            document.querySelector('.subtitle').textContent = t.subtitle;
            document.querySelector('.title').textContent = t.title;
            document.querySelector('.description').textContent = t.desc;
            
            const buttons = document.querySelectorAll('.btn-dark');
            if(buttons[0]) buttons[0].textContent = t.btnAbout;
            if(buttons[1]) buttons[1].textContent = t.btnView;
            if(buttons[2]) buttons[2].textContent = t.btnView;
            document.querySelector('.scroll-down').textContent = t.scroll;

            document.querySelector('.about-section .section-number').textContent = t.sec1Num;
            document.querySelector('.about-section .section-title').textContent = t.sec1Title;
            const aboutTexts = document.querySelectorAll('.about-text');
            aboutTexts[0].textContent = t.sec1Text1;
            aboutTexts[1].textContent = t.sec1Text2;

            document.querySelector('.specs-section .section-number').textContent = t.sec2Num;
            document.querySelector('.specs-section .section-title').textContent = t.sec2Title;
            const specLabels = document.querySelectorAll('.spec-label');
            specLabels.forEach((el, idx) => { el.textContent = t.labels2[idx]; });

            const specTitles = document.querySelectorAll('.specs-list-grid .item-title');
            const specDescs = document.querySelectorAll('.specs-list-grid .item-desc');
            specTitles.forEach((el, idx) => { el.textContent = t.specsList[idx]; });
            specDescs.forEach((el, idx) => { el.textContent = t.specsDesc[idx]; });

            document.querySelector('.gallery-section .section-number').textContent = t.sec3Num;
            document.querySelector('.gallery-section .section-title').textContent = t.sec3Title;
            document.querySelector('.gallery-subtitle').textContent = t.sec3Sub;

            document.querySelector('.section-number-light').textContent = t.sec4Num;
            document.querySelector('.section-title-light').textContent = t.sec4Title;
            const intLabels = document.querySelectorAll('.interior-label');
            intLabels.forEach((el, idx) => { el.textContent = t.interiorLabels[idx]; });

            document.querySelector('.location-section .section-number').textContent = t.sec5Num;
            document.querySelector('.location-section .section-title').textContent = t.sec5Title;
            document.querySelector('.location-subtitle').textContent = t.locTitle;
            const locTexts = document.querySelectorAll('.location-text');
            locTexts.forEach((el, idx) => { el.textContent = t.locTexts[idx]; });

            document.querySelector('.final-section .section-number').textContent = t.sec6Num;
            document.querySelector('.final-text').textContent = t.sec6Text;
            document.querySelector('.footer-copy').textContent = t.rights;

            // Перевод модального окна
            const mTitle = document.querySelector('.modal-title');
            const mDesc = document.querySelector('.modal-desc');
            if (mTitle) mTitle.textContent = t.modalTitle;
            if (mDesc) mDesc.textContent = t.modalDesc;
        });
    }

});