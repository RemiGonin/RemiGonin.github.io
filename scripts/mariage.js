const MARIAGE_DATE = "2026-05-09T15:30:00";
const MARIAGE_END_DATE = "2026-05-10T15:00:00";
const MARIAGE_TITLE = "Mariage de Julie & Rémi";
const MARIAGE_LOCATION = "Château de Montolivet, Rte du Château, 38510 Arandon-Passins, France";
const MARIAGE_DESCRIPTION = "Nous sommes heureux de vous inviter à célébrer notre mariage.";

function showCalendarOptions() {
    const options = document.getElementById("calendar-options");
    options.style.display = options.style.display === "none" ? "block" : "none";
}

function downloadICS() {
    const event = {
        title: MARIAGE_TITLE,
        location: MARIAGE_LOCATION,
        startDate: MARIAGE_DATE,
        endDate: MARIAGE_END_DATE,
        description: MARIAGE_DESCRIPTION,
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mariage Julie & Rémi//FR
BEGIN:VEVENT
UID:${Date.now()}@mariagejulieetremi.fr
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${MARIAGE_DATE}
DTEND:${MARIAGE_END_DATE}
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mariage-julie-remi.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    showCalendarOptions();
}

function addToGoogleCalendar() {
    const event = {
        text: MARIAGE_TITLE,
        dates: "20260509T153000/20260510T150000",
        location: MARIAGE_LOCATION,
        details: MARIAGE_DESCRIPTION,
    };

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${
        event.dates
    }&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.details)}`;

    window.open(googleUrl, "_blank");
    showCalendarOptions();
}

// Close calendar options when clicking outside
document.addEventListener("click", function (event) {
    const container = document.querySelector(".mariage-save-date-container");
    const options = document.getElementById("calendar-options");
    if (!container.contains(event.target)) {
        options.style.display = "none";
    }
});

// FAQ Toggle Function
function toggleFAQ(button) {
    const faqItem = button.closest('.mariage-faq-item');
    const allFaqItems = document.querySelectorAll('.mariage-faq-item');
    
    // Close other FAQ items
    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
}

// Menu Item Toggle Function
function toggleMenuItem(menuItem) {
    const allMenuItems = document.querySelectorAll('.mariage-menu-item');
    
    // Close other menu items
    allMenuItems.forEach(item => {
        if (item !== menuItem && item.classList.contains('expanded')) {
            item.classList.remove('expanded');
        }
    });
    
    // Toggle current menu item
    menuItem.classList.toggle('expanded');
}
