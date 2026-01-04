const slides = [
    { image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop", title: "Wexplore Himachal", subtitle: "Serenity amidst the snow-capped peaks." },
    { image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2000&auto=format&fit=crop", title: "Kerala Backwaters", subtitle: "Lush emerald valleys and calm waters." },
    { image: "https://i.pinimg.com/1200x/31/26/05/3126050a050e7f2cb656bb9f3bfd2030.jpg", title: "Royal Rajasthan", subtitle: "A legacy of history etched in gold and stone." },
    { image: "https://i.pinimg.com/1200x/e9/1a/b6/e91ab6d60ffd80c74e6364c96f293a84.jpg", title: "The Taj Mahal", subtitle: "An eternal monument to marble love." },
    { image: "https://i.pinimg.com/1200x/82/18/7d/82187d39f4dc4ec89ad717a05788ff58.jpg", title: "Varanasi Ghats", subtitle: "The spiritual soul and ancient heartbeat of India." },
    { image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2000&auto=format&fit=crop", title: "Ladakh Deserts", subtitle: "High-altitude journeys beyond the clouds." },
    
    { image: "https://images.unsplash.com/photo-1500614922032-b6dd337b1313?q=80&w=2000&auto=format&fit=crop", title: "Misty Meghalaya", subtitle: "Nature in its rawest, most emerald form." },
    { image: "https://cdn.abhibus.com/2024/02/Things-to-Do-in-Jaisalmer.jpg", title: "Jaisalmer Dunes", subtitle: "Golden sunsets in the heart of the Great Indian Desert." }
];

// Database for the Intelligent Planner
const cityData = {
    "delhi": {
        visit: "Lotus Temple, Qutub Minar, Humayun's Tomb, and a walk through Old Delhi's bustling markets.",
        eat: "Paranthe Wali Gali for heritage flavors, Bademiya for kebabs, and Indian Accent for a modern gourmet touch."
    },
    "jaipur": {
        visit: "Amer Fort (Amber Palace), Hawa Mahal (Palace of Winds), City Palace, and Jantar Mantar observatory.",
        eat: "Rawat Mishtan Bhandar for Pyaz Kachori, Laxmi Mishtan Bhandar (LMB) for Thali, and Chokhi Dhani for cultural dining."
    },
    "goa": {
        visit: "Baga Beach, Basilica of Bom Jesus, Dudhsagar Falls, and the vibrant Anjuna Flea Market.",
        eat: "Britto’s at Baga, Fisherman’s Wharf for seafood, and Thalassa for Greek vibes with a stunning sunset."
    },
    "mumbai": {
        visit: "Gateway of India, Marine Drive at dusk, Elephanta Caves, and the historic Colaba Causeway.",
        eat: "Leopold Cafe for history, Britannia & Co for Parsi Berry Pulao, and Kyani & Co. for Irani chai and bun-maska."
    },
    "udaipur": {
        visit: "City Palace complex, Lake Pichola boat ride, Jag Mandir, and Saheliyon-ki-Bari gardens.",
        eat: "Ambrai for lakeside fine dining, Natraj for authentic Rajasthani Thali, and Upre by 1559 AD for roof-top views."
    },
    "darjeeling": {
        visit: "Tiger Hill for sunrise, Batasia Loop, Peace Pagoda, and a ride on the Himalayan Toy Train.",
        eat: "Glenary’s for bakery items and history, Keventer's for a traditional English breakfast, and Shangri-La."
    },
    "varanasi": {
        visit: "Dashashwamedh Ghat for Ganga Aarti, Kashi Vishwanath Temple, and a sunrise boat ride on the Ganges.",
        eat: "Deena Chat Bhandar for Tamatar Chaat, Blue Lassi Shop for 80+ lassi varieties, and Shree Shivay for Thali."
    },
    "munnar": {
        visit: "Eravikulam National Park, Mattupetty Dam, Tea Museum, and Top Station for panoramic views.",
        eat: "Saravana Bhavan for South Indian staples, Rapsy Restaurant for Spanish-style omlettes, and local tea-stall snacks."
    },
    "kolkata": {
        visit: "Victoria Memorial, Howrah Bridge, Mother House, and the Indian Museum.",
        eat: "Arsalan for Kolkata Biryani, Peter Cat for Chelo Kebab, and Flurys on Park Street for high tea and cakes."
    },
    "bangalore": {
        visit: "Lalbagh Botanical Garden, Bangalore Palace, Cubbon Park, and Bannerghatta National Park.",
        eat: "MTR (Mavalli Tiffin Rooms) for Rava Idli, Vidyarthi Bhavan for Dosa, and Toit Brewpub for craft beer."
    },
    "hyderabad": {
        visit: "Charminar, Golconda Fort, Salar Jung Museum, and Ramoji Film City.",
        eat: "Paradise Biryani for the iconic Hyderabadi flavor, Bawarchi for kebabs, and Nimrah Cafe for Irani Chai near Charminar."
    },
    "chennai": {
        visit: "Marina Beach, Kapaleeshwarar Temple, Fort St. George, and the Government Museum.",
        eat: "Saravana Bhavan for authentic breakfast, Murugan Idli Shop, and Dakshin for fine South Indian dining."
    },
    "kochi": {
        visit: "Chinese Fishing Nets, Mattancherry Palace, Jew Town, and St. Francis Church.",
        eat: "Kashi Art Cafe for bohemian vibes, Fort Kochi Seafood, and Paragon for legendary Malabar cuisine."
    },
    "amritsar": {
        visit: "The Golden Temple (Harmandir Sahib), Jallianwala Bagh, and the Wagah Border Ceremony.",
        eat: "Kesar Da Dhaba for iconic Dal Makhani, Beera Chicken House, and Giani Tea Stall for early morning chai."
    },
    "pondicherry": {
        visit: "Promenade Beach, Auroville (Matrimandir), French Quarter streets, and Paradise Beach.",
        eat: "Cafe Des Arts for French breakfast, Coromandel Cafe, and Villa Shanti for refined Indo-French dining."
    },
    "hampi": {
        visit: "Virupaksha Temple, Vitthala Temple (Stone Chariot), Hemakuta Hill, and the Royal Enclosure.",
        eat: "Mango Tree for local South Indian meals, Laughing Buddha for riverside chill, and Gopi Guest House."
    }
};

let currentSlide = 0;
const slidesContainer = document.getElementById('slidesContainer');
const indicatorsContainer = document.getElementById('heroIndicators');
const heroTitle = document.getElementById('heroTitle');
const heroSub = document.getElementById('heroSub');

function initSlideshow() {
    if (slidesContainer) {
        slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = `slide ${index === 0 ? 'active' : ''}`;
            slideEl.style.backgroundImage = `url(${slide.image})`;
            slidesContainer.appendChild(slideEl);
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.onclick = () => goToSlide(index);
            indicatorsContainer.appendChild(indicator);
        });
        setInterval(() => goToSlide((currentSlide + 1) % slides.length), 7000);
    }
}

function goToSlide(index) {
    if (index === currentSlide) return;
    const allSlides = document.querySelectorAll('.slide');
    const allIndicators = document.querySelectorAll('.indicator');
    allSlides[currentSlide].classList.remove('active');
    allIndicators[currentSlide].classList.remove('active');
    currentSlide = index;
    allSlides[currentSlide].classList.add('active');
    allIndicators[currentSlide].classList.add('active');
    heroTitle.style.opacity = '0';
    heroSub.style.opacity = '0';
    setTimeout(() => {
        heroTitle.innerText = slides[currentSlide].title;
        heroSub.innerText = slides[currentSlide].subtitle;
        heroTitle.style.opacity = '1';
        heroSub.style.opacity = '1';
    }, 600);
}

function toggleMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const links = document.getElementById('navLinks');
    const isActive = links.classList.toggle('active');
    toggle.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
}

const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
if(themeBtn) {
    themeBtn.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', next);
        themeIcon.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
}


// --- Improved Intelligent Planner Logic ---
function generateSmartPlan(selectedCity = null) {
    const plannerSection = document.getElementById('planner');
    const cityInput = document.getElementById('plannerCity');
    
    // If triggered from a card, update input and scroll
    if (selectedCity) {
        cityInput.value = selectedCity;
        plannerSection.scrollIntoView({ behavior: 'smooth' });
    }

    const cityValue = cityInput.value.trim().toLowerCase();
    const vibe = document.getElementById('vibeInput').value;
    const res = document.getElementById('plannerResult');
    
    const title = document.getElementById('resultTitle');
    const vibeTxt = document.getElementById('vibeText');
    const visit = document.getElementById('visitList');
    const eat = document.getElementById('eatList');

    const vibeMessages = {
        luxury: "The Royal Passage: A journey defined by heritage palaces, fine silks, and private audiences.",
        local: "The Soul Connection: Immersive walks through markets, home-stays, and spiritual centers.",
        fast: "The Urban Pulse: High-energy skyscrapers, transit-hubs, and tech-forward social spaces."
    };

    // Reset and show loading state
    res.classList.remove('show');
    res.style.display = 'block';
    title.innerText = "Curating your journey...";
    
    setTimeout(() => {
        const data = cityData[cityValue] || cityData[Object.keys(cityData).find(k => cityValue.includes(k))];
        
        if (data) {
            title.innerText = "Discover " + (cityValue.charAt(0).toUpperCase() + cityValue.slice(1));
            vibeTxt.innerText = vibeMessages[vibe];
            visit.innerText = data.visit;
            eat.innerText = data.eat;
        } else {
            title.innerText = cityValue ? "Exploring " + cityValue : "Exploring India";
            vibeTxt.innerText = vibeMessages[vibe];
            visit.innerText = "Start by visiting the local historic square and the main city garden. Ask locals for hidden temples or galleries.";
            eat.innerText = "Look for 'Thali' houses for an authentic variety, or check the oldest bakery in the central district.";
        }
        
        // Slide in animation
        res.classList.add('show');
    }, 600);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.onload = initSlideshow;

const mobileToggle = document.getElementById('mobileToggle');
if(mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
}

const navLinks = document.getElementById('navLinks');
if(navLinks) {
    navLinks.addEventListener('click', toggleMobileMenu);
}

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        const city = card.getAttribute('data-city');
        generateSmartPlan(city);
    });
});