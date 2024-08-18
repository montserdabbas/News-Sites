// عند التمرير، تغيير الشريط العلوي والبدء في العد التنازلي
window.onscroll = function() {
    changeNavbar();
    startCounter();
};

// تغيير لون الشريط العلوي عند التمرير
function changeNavbar() {
    var navbar = document.querySelector("header");
    if (window.pageYOffset > 50) {  // عند التمرير 50 بكسل
        navbar.style.backgroundColor = "#333";
        navbar.style.padding = "5px 20px";
    } else {
        navbar.style.backgroundColor = "transparent";
        navbar.style.padding = "10px 20px";
    }
}

// الانتقال السلس لجميع الروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// تغيير اللون الرئيسي
document.getElementById("color-toggle").addEventListener("click", function() {
    document.body.style.setProperty('--main-color', getRandomColor());
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// التبديل بين الوضع الليلي والنهاري
document.getElementById("mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    document.querySelector("header").classList.toggle("dark-mode");
    document.querySelector("footer").classList.toggle("dark-mode");
});

// تشغيل العد التنازلي
function startCounter() {
    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
        if (isInViewport(counter) && counter.innerText === '0') {
            counter.innerText = '0';
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;

                const increment = target / 200;

                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        }
    });
}

// التحقق من أن العنصر في منطقة العرض
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// عرض الشرائح (Image Carousel)
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); // تغيير الصورة كل 3 ثواني
}

// التحكم في نافذة المنبثقة (Modal)
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-btn");
const closeBtn = document.getElementsByClassName("close")[0];

modalBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
