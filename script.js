// تاريخ بداية الدورة (16 أكتوبر 2026)
// ملاحظة: وضعنا تاريخ 16 لأن يوم 17 يجب أن يظهر كـ "اليوم الأول"
const ANCHOR_DATE = new Date('2026-10-16T00:00:00');

// دالة لتحويل الأرقام إلى أرقام كردية
function toKurdishNumber(num) {
    const kurdishDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, d => kurdishDigits[d]);
}

// دالة لتنسيق التاريخ بالكردية
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ku-Arab', options);
}

function updateApp() {
    // الحصول على تاريخ اليوم الحالي
    const today = new Date();
    
    // تصفير الوقت لضمان الحساب بناءً على اليوم فقط (وليس الساعة)
    today.setHours(0, 0, 0, 0);

    // حساب الفرق بالأيام بين اليوم وتاريخ البداية
    const timeDiff = today.getTime() - ANCHOR_DATE.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    // حساب رقم اليوم في الدورة (0 إلى 4)
    let dayInCycle = daysDiff % 5;
    
    // إذا كان التاريخ قبل تاريخ البداية (لأي سبب)، نجعله يبدأ من اليوم الأول
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

    // تحديث العناصر في واجهة التطبيق
    document.getElementById('current-day-number').textContent = toKurdishNumber(currentDay);
    
    const dayNames = ['یەکەم', 'دووەم', 'سێیەم', 'چوارەم', 'پێنجەم'];
    document.getElementById('current-day-label').textContent = `ڕۆژی ${dayNames[dayInCycle]}`;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    
    if (remainingDays === 0) {
        document.getElementById('remaining-text').textContent = 'ئەمڕۆ ڕۆژی کۆتایی کارتەکەیە';
    } else {
        document.getElementById('remaining-text').textContent = `${toKurdishNumber(remainingDays)} ڕۆژ ماوە`;
    }

    // عرض التواريخ
    document.getElementById('start-date').textContent = formatDate(cycleStartDate);
    document.getElementById('end-date').textContent = formatDate(cycleEndDate);
}

// تشغيل التطبيق فور فتحه
updateApp();

// تحديث التطبيق تلقائياً كل دقيقة في حال تغير التاريخ
setInterval(updateApp, 60000);
