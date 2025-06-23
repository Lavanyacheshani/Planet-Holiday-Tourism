import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation data
const translations = {
  EN: {
    // Navigation
    home: 'Home',
    about: 'About',
    destinations: 'Destinations',
    tours: 'Tours',
    activities: 'Activities',
    blog: 'Blog',
    contact: 'Contact',
    bookNow: 'Book Now',
    discoverSriLanka: 'DISCOVER SRI LANKA',

    // Hero Section
    heroTitle: 'Discover the Magic of Sri Lanka',
    heroSubtitle: 'Experience breathtaking landscapes, rich culture, and unforgettable adventures',
    exploreTours: 'Explore Tours',
    watchVideo: 'Watch Video',

    // Featured Destinations
    discoverAmazingPlaces: 'Discover Amazing Places',
    featuredDestinations: 'Featured Destinations',
    featuredDescription: 'Discover the most breathtaking locations Sri Lanka has to offer, each with its unique charm and unforgettable experiences that will create memories to last a lifetime.',
    exploreDestination: 'Explore Destination',
    exploreMoreDestinations: 'Explore More Destinations',
    perPerson: 'per person',
    duration: 'Duration',
    groupSize: 'Group Size',
    highlights: 'Highlights',
    bookThisDestination: 'Book This Destination',

    // Tour Packages
    tourPackages: 'Tour Packages',
    tourDescription: 'Carefully crafted experiences that showcase the best of Sri Lanka\'s culture, nature, and adventure',
    viewDetails: 'View Details',

    // Testimonials
    whatOurTravelersSay: 'What Our Travelers Say',
    testimonialsDescription: 'Real experiences from travelers who discovered Sri Lanka with us',

    // Footer
    aboutUs: 'About Us',
    aboutDescription: 'Planet Holiday is your trusted partner for discovering the beauty and culture of Sri Lanka.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Info',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',

    // Destinations Page
    exploreSriLanka: 'Explore Sri Lanka',
    destinationsHeroSubtitle: 'From ancient temples to pristine beaches, discover the diverse beauty of the Pearl of the Indian Ocean',
    allSriLankaDestinations: 'All Sri Lanka Destinations',
    destinations: 'Destinations',

    // Tours Page
    toursHeroSubtitle: 'Carefully crafted experiences that showcase the best of Sri Lanka\'s culture, nature, and adventure',

    // Contact Page
    getInTouch: 'Get in Touch',
    contactDescription: 'Ready to start your Sri Lankan adventure? We\'re here to help you plan the perfect trip.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone Number',
    tourInterest: 'Tour Interest',
    selectTourPackage: 'Select a tour package',
    travelDates: 'Preferred Travel Dates',
    groupSizeContact: 'Group Size',
    selectGroupSize: 'Select group size',
    soloTraveler: 'Solo Traveler',
    couple: 'Couple',
    smallGroup: 'Small Group (3-5)',
    mediumGroup: 'Medium Group (6-10)',
    largeGroup: 'Large Group (10+)',
    message: 'Message',
    messagePlaceholder: 'Tell us about your dream Sri Lankan adventure...',
    sendMessage: 'Send Message',
    submitting: 'Submitting...',
    messageSent: 'Message sent successfully!',
    contactInfo: 'Contact Information',
    address: 'Address',
    phoneContact: 'Phone',
    emailContact: 'Email',
    workingHours: 'Working Hours',
    faq: 'Frequently Asked Questions',
    faqDescription: 'Quick answers to common questions about traveling to Sri Lanka',
    visaQuestion: 'Do I need a visa to visit Sri Lanka?',
    visaAnswer: 'Most visitors need an Electronic Travel Authorization (ETA) or visa. We can help you with the application process and requirements based on your nationality.',
    bestTimeQuestion: 'What is the best time to visit Sri Lanka?',
    bestTimeAnswer: 'Sri Lanka can be visited year-round, but the best time depends on which regions you want to explore. December to March is ideal for the west and south coasts, while April to September is perfect for the east coast.',
    familyQuestion: 'Are your tours suitable for families with children?',
    familyAnswer: 'Absolutely! We offer family-friendly packages and can customize tours to accommodate children of all ages. Our guides are experienced in working with families.',
    packagesQuestion: 'What is included in your tour packages?',
    packagesAnswer: 'Our packages typically include accommodation, meals as specified, transportation, entrance fees, and professional guide services. Specific inclusions vary by package.',

    // About Page
    ourStory: 'Our Story',
    aboutDescription1: 'Founded in 2015, Planet Holiday emerged from a passion for sharing Sri Lanka\'s incredible beauty with the world. What started as a small family business has grown into the island\'s premier tour operator, but we\'ve never lost sight of our core values: authentic experiences, personal service, and sustainable tourism.',
    aboutDescription2: 'Every journey we craft tells a story – of ancient kingdoms and modern adventures, of pristine beaches and misty mountains, of warm smiles and unforgettable moments. We don\'t just show you Sri Lanka; we help you feel its heartbeat.',
    happyTravelers: 'Happy Travelers',
    yearsOfExcellence: 'Of Excellence',
    ourValues: 'Our Values',
    localExpertise: 'Local Expertise',
    localExpertiseDesc: 'Born and raised in Sri Lanka, we know every hidden gem and secret spot',
    awardWinning: 'Award Winning',
    awardWinningDesc: 'Recognized for excellence in sustainable tourism and customer service',
    sustainableTravel: 'Sustainable Travel',
    sustainableTravelDesc: 'Committed to preserving Sri Lanka\'s natural beauty for future generations',
    personalizedService: 'Personalized Service',
    personalizedServiceDesc: 'Every tour is customized to your preferences and travel style',

    // Admin
    adminLogin: 'Admin Login',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    adminDashboard: 'Admin Dashboard',
    manageTours: 'Manage Tours',
    manageBlogs: 'Manage Blogs',
    manageDestinations: 'Manage Destinations',
    add: 'Add',
    update: 'Update',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    title: 'Title',
    description: 'Description',
    price: 'Price',
    image: 'Image',
    content: 'Content',
    actions: 'Actions',
  },
  RU: {
    // Navigation
    home: 'Главная',
    about: 'О нас',
    destinations: 'Направления',
    tours: 'Туры',
    activities: 'Активности',
    blog: 'Блог',
    contact: 'Контакты',
    bookNow: 'Забронировать',
    discoverSriLanka: 'ОТКРЫТЬ ШРИ-ЛАНКУ',

    // Hero Section
    heroTitle: 'Откройте магию Шри-Ланки',
    heroSubtitle: 'Познайте захватывающие пейзажи, богатую культуру и незабываемые приключения',
    exploreTours: 'Исследовать туры',
    watchVideo: 'Смотреть видео',

    // Featured Destinations
    discoverAmazingPlaces: 'Откройте удивительные места',
    featuredDestinations: 'Популярные направления',
    featuredDescription: 'Откройте самые захватывающие места Шри-Ланки, каждое со своим уникальным очарованием и незабываемыми впечатлениями, которые создадут воспоминания на всю жизнь.',
    exploreDestination: 'Исследовать направление',
    exploreMoreDestinations: 'Больше направлений',
    perPerson: 'с человека',
    duration: 'Продолжительность',
    groupSize: 'Размер группы',
    highlights: 'Особенности',
    bookThisDestination: 'Забронировать это направление',

    // Tour Packages
    tourPackages: 'Туристические пакеты',
    tourDescription: 'Тщательно продуманные впечатления, демонстрирующие лучшее из культуры, природы и приключений Шри-Ланки',
    viewDetails: 'Подробнее',

    // Testimonials
    whatOurTravelersSay: 'Что говорят наши путешественники',
    testimonialsDescription: 'Реальные впечатления от путешественников, которые открыли Шри-Ланку с нами',

    // Footer
    aboutUs: 'О нас',
    aboutDescription: 'Planet Holiday - ваш надежный партнер для открытия красоты и культуры Шри-Ланки.',
    quickLinks: 'Быстрые ссылки',
    contactInfo: 'Контактная информация',
    followUs: 'Следите за нами',
    allRightsReserved: 'Все права защищены.',

    // Destinations Page
    exploreSriLanka: 'Исследуйте Шри-Ланку',
    destinationsHeroSubtitle: 'От древних храмов до нетронутых пляжей, откройте разнообразную красоту Жемчужины Индийского океана',
    allSriLankaDestinations: 'Все направления Шри-Ланки',
    destinations: 'Направления',

    // Tours Page
    toursHeroSubtitle: 'Тщательно продуманные впечатления, демонстрирующие лучшее из культуры, природы и приключений Шри-Ланки',

    // Contact Page
    getInTouch: 'Свяжитесь с нами',
    contactDescription: 'Готовы начать свое шри-ланкийское приключение? Мы здесь, чтобы помочь вам спланировать идеальную поездку.',
    name: 'Имя',
    email: 'Email',
    phone: 'Номер телефона',
    tourInterest: 'Интерес к туру',
    selectTourPackage: 'Выберите турпакет',
    travelDates: 'Предпочтительные даты поездки',
    groupSizeContact: 'Размер группы',
    selectGroupSize: 'Выберите размер группы',
    soloTraveler: 'Один путешественник',
    couple: 'Пара',
    smallGroup: 'Небольшая группа (3-5)',
    mediumGroup: 'Средняя группа (6-10)',
    largeGroup: 'Большая группа (10+)',
    message: 'Сообщение',
    messagePlaceholder: 'Расскажите нам о своей мечте о шри-ланкийском приключении...',
    sendMessage: 'Отправить сообщение',
    submitting: 'Отправка...',
    messageSent: 'Сообщение отправлено успешно!',
    contactInfo: 'Контактная информация',
    address: 'Адрес',
    phoneContact: 'Телефон',
    emailContact: 'Email',
    workingHours: 'Рабочие часы',
    faq: 'Часто задаваемые вопросы',
    faqDescription: 'Быстрые ответы на общие вопросы о путешествии в Шри-Ланку',
    visaQuestion: 'Нужна ли мне виза для посещения Шри-Ланки?',
    visaAnswer: 'Большинству посетителей нужна электронная туристическая авторизация (ETA) или виза. Мы можем помочь вам с процессом подачи заявки и требованиями в зависимости от вашей национальности.',
    bestTimeQuestion: 'Какое лучшее время для посещения Шри-Ланки?',
    bestTimeAnswer: 'Шри-Ланку можно посещать круглый год, но лучшее время зависит от того, какие регионы вы хотите исследовать. Декабрь-март идеален для западного и южного побережья, а апрель-сентябрь идеален для восточного побережья.',
    familyQuestion: 'Подходят ли ваши туры для семей с детьми?',
    familyAnswer: 'Абсолютно! Мы предлагаем семейные пакеты и можем адаптировать туры для детей всех возрастов. Наши гиды имеют опыт работы с семьями.',
    packagesQuestion: 'Что включено в ваши турпакеты?',
    packagesAnswer: 'Наши пакеты обычно включают проживание, питание по указанию, транспорт, входные билеты и услуги профессионального гида. Конкретные включения варьируются в зависимости от пакета.',

    // About Page
    ourStory: 'Наша история',
    aboutDescription1: 'Основанная в 2015 году, Planet Holiday возникла из страсти делиться невероятной красотой Шри-Ланки с миром. То, что начиналось как небольшой семейный бизнес, выросло в ведущего туроператора острова, но мы никогда не теряли из виду наши основные ценности: аутентичные впечатления, персональный сервис и устойчивый туризм.',
    aboutDescription2: 'Каждое путешествие, которое мы создаем, рассказывает историю - о древних королевствах и современных приключениях, о нетронутых пляжах и туманных горах, о теплых улыбках и незабываемых моментах. Мы не просто показываем вам Шри-Ланку; мы помогаем вам почувствовать ее сердцебиение.',
    happyTravelers: 'Счастливых путешественников',
    yearsOfExcellence: 'Превосходства',
    ourValues: 'Наши ценности',
    localExpertise: 'Местная экспертиза',
    localExpertiseDesc: 'Родившись и выросши в Шри-Ланке, мы знаем каждую скрытую жемчужину и секретное место',
    awardWinning: 'Отмеченный наградами',
    awardWinningDesc: 'Признан за превосходство в устойчивом туризме и обслуживании клиентов',
    sustainableTravel: 'Устойчивые путешествия',
    sustainableTravelDesc: 'Привержены сохранению природной красоты Шри-Ланки для будущих поколений',
    personalizedService: 'Персонализированный сервис',
    personalizedServiceDesc: 'Каждый тур адаптирован к вашим предпочтениям и стилю путешествия',

    // Admin
    adminLogin: 'Вход администратора',
    username: 'Имя пользователя',
    password: 'Пароль',
    login: 'Войти',
    adminDashboard: 'Панель администратора',
    manageTours: 'Управление турами',
    manageBlogs: 'Управление блогами',
    manageDestinations: 'Управление направлениями',
    add: 'Добавить',
    update: 'Обновить',
    edit: 'Редактировать',
    delete: 'Удалить',
    cancel: 'Отмена',
    save: 'Сохранить',
    title: 'Заголовок',
    description: 'Описание',
    price: 'Цена',
    image: 'Изображение',
    content: 'Содержание',
    actions: 'Действия',
  },
  JA: {
    // Navigation
    home: 'ホーム',
    about: '会社概要',
    destinations: '目的地',
    tours: 'ツアー',
    activities: 'アクティビティ',
    blog: 'ブログ',
    contact: 'お問い合わせ',
    bookNow: '予約する',
    discoverSriLanka: 'スリランカを発見',

    // Hero Section
    heroTitle: 'スリランカの魔法を発見',
    heroSubtitle: '息を呑むような風景、豊かな文化、忘れられない冒険を体験',
    exploreTours: 'ツアーを探す',
    watchVideo: '動画を見る',

    // Featured Destinations
    discoverAmazingPlaces: '素晴らしい場所を発見',
    featuredDestinations: 'おすすめ目的地',
    featuredDescription: 'スリランカが提供する最も息を呑むような場所を発見し、それぞれが独自の魅力と一生の思い出を作る忘れられない体験を提供します。',
    exploreDestination: '目的地を探す',
    exploreMoreDestinations: 'もっと多くの目的地',
    perPerson: '一人あたり',
    duration: '期間',
    groupSize: 'グループサイズ',
    highlights: 'ハイライト',
    bookThisDestination: 'この目的地を予約',

    // Tour Packages
    tourPackages: 'ツアーパッケージ',
    tourDescription: 'スリランカの文化、自然、冒険の最高のものを紹介する慎重に作られた体験',
    viewDetails: '詳細を見る',

    // Testimonials
    whatOurTravelersSay: '旅行者の声',
    testimonialsDescription: '私たちと一緒にスリランカを発見した旅行者からの実際の体験',

    // Footer
    aboutUs: '会社概要',
    aboutDescription: 'Planet Holidayは、スリランカの美しさと文化を発見するための信頼できるパートナーです。',
    quickLinks: 'クイックリンク',
    contactInfo: 'お問い合わせ情報',
    followUs: 'フォローする',
    allRightsReserved: '全著作権所有。',

    // Destinations Page
    exploreSriLanka: 'スリランカを探検',
    destinationsHeroSubtitle: '古代寺院から手つかずのビーチまで、インド洋の真珠の多様な美しさを発見',
    allSriLankaDestinations: 'スリランカの全目的地',
    destinations: '目的地',

    // Tours Page
    toursHeroSubtitle: 'スリランカの文化、自然、冒険の最高のものを紹介する慎重に作られた体験',

    // Contact Page
    getInTouch: 'お問い合わせ',
    contactDescription: 'スリランカの冒険を始める準備はできましたか？完璧な旅行を計画するお手伝いをします。',
    name: '名前',
    email: 'メール',
    phone: '電話番号',
    tourInterest: 'ツアー興味',
    selectTourPackage: 'ツアーパッケージを選択',
    travelDates: '希望旅行日',
    groupSizeContact: 'グループサイズ',
    selectGroupSize: 'グループサイズを選択',
    soloTraveler: '一人旅',
    couple: 'カップル',
    smallGroup: '小グループ（3-5人）',
    mediumGroup: '中グループ（6-10人）',
    largeGroup: '大グループ（10人以上）',
    message: 'メッセージ',
    messagePlaceholder: 'あなたの夢のスリランカ冒険について教えてください...',
    sendMessage: 'メッセージを送信',
    submitting: '送信中...',
    messageSent: 'メッセージが正常に送信されました！',
    contactInfo: 'お問い合わせ情報',
    address: '住所',
    phoneContact: '電話',
    emailContact: 'メール',
    workingHours: '営業時間',
    faq: 'よくある質問',
    faqDescription: 'スリランカ旅行に関する一般的な質問への素早い回答',
    visaQuestion: 'スリランカを訪問するにはビザが必要ですか？',
    visaAnswer: 'ほとんどの訪問者は電子旅行許可証（ETA）またはビザが必要です。国籍に基づいて申請プロセスと要件についてお手伝いできます。',
    bestTimeQuestion: 'スリランカを訪問するのに最適な時期はいつですか？',
    bestTimeAnswer: 'スリランカは一年中訪問できますが、最適な時期は探索したい地域によって異なります。12月から3月は西海岸と南海岸に理想的で、4月から9月は東海岸に最適です。',
    familyQuestion: 'あなたのツアーは子供連れの家族に適していますか？',
    familyAnswer: 'もちろんです！家族向けパッケージを提供し、すべての年齢の子供に対応するようにツアーをカスタマイズできます。私たちのガイドは家族との仕事に経験があります。',
    packagesQuestion: 'あなたのツアーパッケージには何が含まれていますか？',
    packagesAnswer: '私たちのパッケージには通常、宿泊、指定された食事、交通、入場料、プロのガイドサービスが含まれます。具体的な内容はパッケージによって異なります。',

    // About Page
    ourStory: '私たちの物語',
    aboutDescription1: '2015年に設立されたPlanet Holidayは、スリランカの信じられないほどの美しさを世界と共有したいという情熱から生まれました。小さな家族経営として始まったものが、島の主要なツアーオペレーターに成長しましたが、私たちは本質的な価値観を見失ったことはありません：本物の体験、パーソナルサービス、持続可能な観光。',
    aboutDescription2: '私たちが作るすべての旅は物語を語ります - 古代王国と現代の冒険、手つかずのビーチと霧の山々、温かい笑顔と忘れられない瞬間の物語です。私たちは単にスリランカを見せるだけでなく、その鼓動を感じるお手伝いをします。',
    happyTravelers: '幸せな旅行者',
    yearsOfExcellence: '卓越性の年',
    ourValues: '私たちの価値観',
    localExpertise: '地元の専門知識',
    localExpertiseDesc: 'スリランカで生まれ育った私たちは、すべての隠れた宝石と秘密の場所を知っています',
    awardWinning: '受賞歴',
    awardWinningDesc: '持続可能な観光と顧客サービスにおける卓越性で認められています',
    sustainableTravel: '持続可能な旅行',
    sustainableTravelDesc: '将来の世代のためにスリランカの自然の美しさを保護することにコミットしています',
    personalizedService: 'パーソナライズされたサービス',
    personalizedServiceDesc: 'すべてのツアーはあなたの好みと旅行スタイルに合わせてカスタマイズされています',

    // Admin
    adminLogin: '管理者ログイン',
    username: 'ユーザー名',
    password: 'パスワード',
    login: 'ログイン',
    adminDashboard: '管理者ダッシュボード',
    manageTours: 'ツアー管理',
    manageBlogs: 'ブログ管理',
    manageDestinations: '目的地管理',
    add: '追加',
    update: '更新',
    edit: '編集',
    delete: '削除',
    cancel: 'キャンセル',
    save: '保存',
    title: 'タイトル',
    description: '説明',
    price: '価格',
    image: '画像',
    content: 'コンテンツ',
    actions: 'アクション',
  },
  HI: {
    // Navigation
    home: 'होम',
    about: 'हमारे बारे में',
    destinations: 'गंतव्य',
    tours: 'टूर',
    activities: 'गतिविधियां',
    blog: 'ब्लॉग',
    contact: 'संपर्क',
    bookNow: 'अभी बुक करें',
    discoverSriLanka: 'श्रीलंका की खोज करें',

    // Hero Section
    heroTitle: 'श्रीलंका का जादू खोजें',
    heroSubtitle: 'लुभावने परिदृश्य, समृद्ध संस्कृति और अविस्मरणीय साहसिक यात्राओं का अनुभव करें',
    exploreTours: 'टूर खोजें',
    watchVideo: 'वीडियो देखें',

    // Featured Destinations
    discoverAmazingPlaces: 'अद्भुत स्थानों की खोज करें',
    featuredDestinations: 'विशेष गंतव्य',
    featuredDescription: 'श्रीलंका के सबसे लुभावने स्थानों की खोज करें, जिनमें से प्रत्येक की अपनी अनूठी आकर्षण और अविस्मरणीय अनुभव हैं जो जीवन भर की यादें बनाएंगे।',
    exploreDestination: 'गंतव्य खोजें',
    exploreMoreDestinations: 'और गंतव्य खोजें',
    perPerson: 'प्रति व्यक्ति',
    duration: 'अवधि',
    groupSize: 'समूह का आकार',
    highlights: 'मुख्य आकर्षण',
    bookThisDestination: 'इस गंतव्य को बुक करें',

    // Tour Packages
    tourPackages: 'टूर पैकेज',
    tourDescription: 'सावधानीपूर्वक तैयार किए गए अनुभव जो श्रीलंका की संस्कृति, प्रकृति और साहसिक यात्रा का सर्वश्रेष्ठ प्रदर्शन करते हैं',
    viewDetails: 'विवरण देखें',

    // Testimonials
    whatOurTravelersSay: 'हमारे यात्री क्या कहते हैं',
    testimonialsDescription: 'हमारे साथ श्रीलंका की खोज करने वाले यात्रियों के वास्तविक अनुभव',

    // Footer
    aboutUs: 'हमारे बारे में',
    aboutDescription: 'Planet Holiday श्रीलंका की सुंदरता और संस्कृति की खोज के लिए आपका विश्वसनीय साझेदार है।',
    quickLinks: 'त्वरित लिंक',
    contactInfo: 'संपर्क जानकारी',
    followUs: 'हमें फॉलो करें',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',

    // Destinations Page
    exploreSriLanka: 'श्रीलंका की खोज करें',
    destinationsHeroSubtitle: 'प्राचीन मंदिरों से लेकर निर्मल समुद्र तटों तक, हिंद महासागर के मोती की विविध सुंदरता की खोज करें',
    allSriLankaDestinations: 'श्रीलंका के सभी गंतव्य',
    destinations: 'गंतव्य',

    // Tours Page
    toursHeroSubtitle: 'सावधानीपूर्वक तैयार किए गए अनुभव जो श्रीलंका की संस्कृति, प्रकृति और साहसिक यात्रा का सर्वश्रेष्ठ प्रदर्शन करते हैं',

    // Contact Page
    getInTouch: 'संपर्क में आएं',
    contactDescription: 'अपनी श्रीलंका की साहसिक यात्रा शुरू करने के लिए तैयार हैं? हम आपकी सही यात्रा की योजना बनाने में मदद करने के लिए यहां हैं।',
    name: 'नाम',
    email: 'ईमेल',
    phone: 'फोन नंबर',
    tourInterest: 'टूर में रुचि',
    selectTourPackage: 'टूर पैकेज चुनें',
    travelDates: 'पसंदीदा यात्रा तिथियां',
    groupSizeContact: 'समूह का आकार',
    selectGroupSize: 'समूह का आकार चुनें',
    soloTraveler: 'एकल यात्री',
    couple: 'जोड़ा',
    smallGroup: 'छोटा समूह (3-5)',
    mediumGroup: 'मध्यम समूह (6-10)',
    largeGroup: 'बड़ा समूह (10+)',
    message: 'संदेश',
    messagePlaceholder: 'हमें अपनी सपनों की श्रीलंका साहसिक यात्रा के बारे में बताएं...',
    sendMessage: 'संदेश भेजें',
    submitting: 'भेज रहा है...',
    messageSent: 'संदेश सफलतापूर्वक भेजा गया!',
    contactInfo: 'संपर्क जानकारी',
    address: 'पता',
    phoneContact: 'फोन',
    emailContact: 'ईमेल',
    workingHours: 'कार्य समय',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    faqDescription: 'श्रीलंका की यात्रा के बारे में सामान्य प्रश्नों के त्वरित उत्तर',
    visaQuestion: 'क्या मुझे श्रीलंका जाने के लिए वीजा की आवश्यकता है?',
    visaAnswer: 'अधिकांश आगंतुकों को इलेक्ट्रॉनिक ट्रैवल अथॉराइजेशन (ETA) या वीजा की आवश्यकता होती है। हम आपकी राष्ट्रीयता के आधार पर आवेदन प्रक्रिया और आवश्यकताओं में मदद कर सकते हैं।',
    bestTimeQuestion: 'श्रीलंका जाने का सबसे अच्छा समय क्या है?',
    bestTimeAnswer: 'श्रीलंका साल भर जाया जा सकता है, लेकिन सबसे अच्छा समय इस बात पर निर्भर करता है कि आप किन क्षेत्रों की खोज करना चाहते हैं। दिसंबर से मार्च पश्चिमी और दक्षिणी तटों के लिए आदर्श है, जबकि अप्रैल से सितंबर पूर्वी तट के लिए परफेक्ट है।',
    familyQuestion: 'क्या आपके टूर बच्चों के साथ परिवारों के लिए उपयुक्त हैं?',
    familyAnswer: 'बिल्कुल! हम परिवार-अनुकूल पैकेज प्रदान करते हैं और सभी उम्र के बच्चों को समायोजित करने के लिए टूर को अनुकूलित कर सकते हैं। हमारे गाइड परिवारों के साथ काम करने में अनुभवी हैं।',
    packagesQuestion: 'आपके टूर पैकेज में क्या शामिल है?',
    packagesAnswer: 'हमारे पैकेज में आमतौर पर आवास, निर्दिष्ट भोजन, परिवहन, प्रवेश शुल्क और पेशेवर गाइड सेवाएं शामिल होती हैं। विशिष्ट समावेशन पैकेज के अनुसार भिन्न होते हैं।',

    // About Page
    ourStory: 'हमारी कहानी',
    aboutDescription1: '2015 में स्थापित, Planet Holiday श्रीलंका की अविश्वसनीय सुंदरता को दुनिया के साथ साझा करने के जुनून से उभरा। जो एक छोटे परिवार के व्यवसाय के रूप में शुरू हुआ वह द्वीप के प्रमुख टूर ऑपरेटर में विकसित हो गया है, लेकिन हमने कभी अपने मूल मूल्यों को नहीं खोया: प्रामाणिक अनुभव, व्यक्तिगत सेवा और स्थायी पर्यटन।',
    aboutDescription2: 'हम जो हर यात्रा बनाते हैं वह एक कहानी बताती है - प्राचीन राज्यों और आधुनिक साहसिक यात्राओं की, निर्मल समुद्र तटों और धुंधली पहाड़ियों की। हम आपको सिर्फ श्रीलंका नहीं दिखाते; हम आपको इसकी धड़कन महसूस करने में मदद करते हैं।',
    happyTravelers: 'खुश यात्री',
    yearsOfExcellence: 'उत्कृष्टता के',
    ourValues: 'हमारे मूल्य',
    localExpertise: 'स्थानीय विशेषज्ञता',
    localExpertiseDesc: 'श्रीलंका में पैदा हुए और पले-बढ़े, हम हर छिपे हुए रत्न और गुप्त स्थान को जानते हैं',
    awardWinning: 'पुरस्कार विजेता',
    awardWinningDesc: 'स्थायी पर्यटन और ग्राहक सेवा में उत्कृष्टता के लिए मान्यता प्राप्त',
    sustainableTravel: 'स्थायी यात्रा',
    sustainableTravelDesc: 'भविष्य की पीढ़ियों के लिए श्रीलंका की प्राकृतिक सुंदरता को संरक्षित करने के लिए प्रतिबद्ध',
    personalizedService: 'व्यक्तिगत सेवा',
    personalizedServiceDesc: 'हर टूर आपकी प्राथमिकताओं और यात्रा शैली के अनुसार अनुकूलित किया जाता है',

    // Admin
    adminLogin: 'एडमिन लॉगिन',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    login: 'लॉगिन',
    adminDashboard: 'एडमिन डैशबोर्ड',
    manageTours: 'टूर प्रबंधित करें',
    manageBlogs: 'ब्लॉग प्रबंधित करें',
    manageDestinations: 'गंतव्य प्रबंधित करें',
    add: 'जोड़ें',
    update: 'अपडेट',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    title: 'शीर्षक',
    description: 'विवरण',
    price: 'मूल्य',
    image: 'छवि',
    content: 'सामग्री',
    actions: 'कार्रवाई',
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState('EN');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.EN;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 