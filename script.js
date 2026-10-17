// تاريخ بداية أول دورة (17 أكتوبر 2026)
// استخدمنا توقيت بغداد لضمان الدقة
const ANCHOR_DATE_STRING = '2026-10-17T00:00:00+03:00'; 
const ANCHOR_DATE = new Date(ANCHOR_DATE_STRING);

function toKurdishNumber(num) {
    const kurdishDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, d => kurdishDigits[d]);
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ku-Arab', options);
}

function updateApp() {
    // الحصول على تاريخ اليوم الحالي
    const today = new Date();
    
    // تحويل وقت الهاتف إلى توقيت بغداد (UTC+3)
    const todayBaghdad = new Date(today.toLocaleString("en-US", {timeZone: "Asia/Baghdad"}));
    
    // تصفير الوقت للمقارنة الدقيقة (منتصف الليل)
    todayBaghdad.setHours(0, 0, 0, 0);

    // حساب الفرق بالأيام
    const timeDiff = todayBaghdad.getTime() - ANCHOR_DATE.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    // حساب يوم الدورة (0 إلى 4)
    let dayInCycle = daysDiff % 5;
    
    // التعامل مع التواريخ السابقة
    if (dayInCycle < 0) dayInCycle += 5; 

    // اليوم الحالي (1 إلى 5)
    const currentDay = dayInCycle + 1;

    // حساب تاريخ بداية الدورة الحالية
    const cycleStartDate = new Date(ANCHOR_DATE);
    cycleStartDate.setDate(ANCHOR_DATE.getDate() + (daysDiff - dayInCycle));

    // حساب تاريخ نهاية الدورة
    const cycleEndDate = new Date(cycleStartDate);
    cycleEndDate.setDate(cycleStartDate.getDate() + 4);

    // حساب الأيام المتبقية
    const remainingDays = 5 - currentDay;
    const progressPercent = (currentDay / 5) * 100;

    // تحديث الواجهة
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
