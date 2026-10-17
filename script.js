const ANCHOR_DATE = new Date('2026-10-17'); 

function toKurdishNumber(num) {
    const kurdishDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, d => kurdishDigits[d]);
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ku-Arab', options);
}

function updateApp() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDiff = today.getTime() - ANCHOR_DATE.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    let dayInCycle = daysDiff % 5;
    if (dayInCycle < 0) dayInCycle += 5;
    const currentDay = dayInCycle + 1;
    const cycleStartDate = new Date(ANCHOR_DATE);
    cycleStartDate.setDate(ANCHOR_DATE.getDate() + (daysDiff - dayInCycle));
    const cycleEndDate = new Date(cycleStartDate);
    cycleEndDate.setDate(cycleStartDate.getDate() + 4);
    const remainingDays = 5 - currentDay;
    const progressPercent = (currentDay / 5) * 100;
    document.getElementById('current-day-number').textContent = toKurdishNumber(currentDay);
    const dayNames = ['یەکەم', 'دووەم', 'سێیەم', 'چوارەم', 'پێنجەم'];
    document.getElementById('current-day-label').textContent = `ڕۆژی ${dayNames[dayInCycle]}`;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    if (remainingDays === 0) {
        document.getElementById('remaining-text').textContent = 'ئەمڕۆ ڕۆژی کۆتایی کارتەکەیە';
    } else {
        document.getElementById('remaining-text').textContent = `${toKurdishNumber(remainingDays)} ڕۆژ ماوە`;
    }
    document.getElementById('start-date').textContent = formatDate(cycleStartDate);
    document.getElementById('end-date').textContent = formatDate(cycleEndDate);
}
updateApp();
setInterval(updateApp, 60000);
