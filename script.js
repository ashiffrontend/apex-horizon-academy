/**
 * Apex Horizon Academy - Main Vanilla JavaScript
 * Modern Educational Institution | Premium Interactions & Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollProgress();
  initAnnouncementCountdown();
  initMobileDrawer();
  initAnimatedCounters();
  initWhyChooseInteractive();
  initCurriculumTabs();
  initAdmissionsTimeline();
  initAcademicProgramsFilter();
  initExamScheduleFilter();
  initNoticesFilterAndModal();
  initGalleryLightbox();
  initFacultyFilter();
  initTestimonialsCarousel();
  initEventCountdown();
  initFaqAccordion();
  initInquiryForm();
  initFloatingButtons();
  initGlobalModals();
  initQuickSearch();
  initCustomCursor();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('aha-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('aha-theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) {
    if (theme === 'dark') {
      // Moon -> Sun
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    } else {
      // Sun -> Moon
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }
}

/* ==========================================================================
   2. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   3. Announcement Bar Countdown & Dismiss
   ========================================================================== */
function initAnnouncementCountdown() {
  const countdownEl = document.getElementById('admission-countdown');
  const closeBtn = document.getElementById('banner-close');
  const banner = document.getElementById('announcement-banner');

  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  if (!countdownEl) return;

  // Deadline 28 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 28);

  function update() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      countdownEl.innerText = "Closing Today";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('drawer-close-btn');

  if (!menuBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   5. Animated Statistics Counters
   ========================================================================== */
function initAnimatedCounters() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        animateValue(el, 0, targetValue, 2000, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, suffix) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // easeOutQuad
    const current = Math.floor(progress * (end - start) + start);
    obj.innerHTML = `${current.toLocaleString()}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = `${end.toLocaleString()}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   6. Why Choose Apex Horizon - Interactive Cards
   ========================================================================== */
function initWhyChooseInteractive() {
  const cards = document.querySelectorAll('.why-interactive-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      cards.forEach(c => c.classList.remove('expanded'));
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });
}

/* ==========================================================================
   7. Interactive Curriculum Tabs
   ========================================================================== */
function initCurriculumTabs() {
  const tabButtons = document.querySelectorAll('.curriculum-tab-btn');
  const stageCards = document.querySelectorAll('.curriculum-card-stage');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = btn.getAttribute('data-stage');

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      stageCards.forEach(card => {
        if (card.getAttribute('data-stage') === stage) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   8. Admissions Pipeline (Timeline)
   ========================================================================== */
const timelineData = [
  {
    step: 1,
    title: "Online Registration",
    timeframe: "10-15 Minutes",
    description: "Begin by submitting the primary digital application form with student biographical details, previous school transcripts, and guardian contact profiles.",
    requirements: ["Birth Certificate copy", "Parent / Guardian ID proof", "Passport size photograph"]
  },
  {
    step: 2,
    title: "Document Upload & Verification",
    timeframe: "1-2 Business Days",
    description: "Upload academic credentials, report cards from the preceding two academic years, medical records, and immunisation certificates for review.",
    requirements: ["Previous 2-year transcripts", "Transfer certificate draft", "Immunisation checklist"]
  },
  {
    step: 3,
    title: "Application Review & Screening",
    timeframe: "3-5 Business Days",
    description: "Our academic board carefully evaluates past holistic performance, co-curricular inclinations, and teacher references.",
    requirements: ["Completed application dossier", "Teacher recommendation letter (optional for primary)"]
  },
  {
    step: 4,
    title: "Entrance Assessment",
    timeframe: "Scheduled On-Campus / Virtual",
    description: "Age-appropriate diagnostic test assessing cognitive aptitude, mathematical reasoning, reading comprehension, and problem-solving skills.",
    requirements: ["Admit badge from portal", "Government ID / Student card"]
  },
  {
    step: 5,
    title: "Interactive Interview",
    timeframe: "30-45 Minutes Session",
    description: "An engaging, friendly conversation with our Academy Principal and Admissions Panel to understand the student's aspirations and family values.",
    requirements: ["Student & at least one guardian present", "Portfolio of art, projects or sports achievements"]
  },
  {
    step: 6,
    title: "Admission Confirmation & Enrollment",
    timeframe: "Within 48 Hours of Interview",
    description: "Official Letter of Offer released via the Parent Portal. Secure the candidate's seat by completing fee formalities and welcome orientation briefing.",
    requirements: ["Acceptance signature", "Enrollment deposit voucher", "Uniform & transport booking"]
  }
];

function initAdmissionsTimeline() {
  const stepCards = document.querySelectorAll('.timeline-step-card');
  const progressFill = document.getElementById('timeline-progress-fill');
  const inspectorTitle = document.getElementById('step-inspector-title');
  const inspectorDesc = document.getElementById('step-inspector-desc');
  const inspectorList = document.getElementById('step-inspector-reqs');

  if (!stepCards.length) return;

  stepCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const stepNum = index + 1;
      const data = timelineData[index];

      // Update progress bar
      if (progressFill) {
        const percentage = ((stepNum - 1) / (stepCards.length - 1)) * 90 + 5;
        progressFill.style.width = `${percentage}%`;
      }

      // Update inspector
      if (inspectorTitle && data) {
        inspectorTitle.innerText = `Step ${data.step}: ${data.title} (${data.timeframe})`;
      }
      if (inspectorDesc && data) {
        inspectorDesc.innerText = data.description;
      }
      if (inspectorList && data) {
        inspectorList.innerHTML = data.requirements
          .map(r => `<li><span class="bullet-dot"></span><span>${r}</span></li>`)
          .join('');
      }
    });
  });
}

/* ==========================================================================
   9. Academic Programs Filter
   ========================================================================== */
function initAcademicProgramsFilter() {
  const filterBtns = document.querySelectorAll('.program-filter-btn');
  const programCards = document.querySelectorAll('.program-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   10. Exam Schedule Live Filter & Search
   ========================================================================== */
function initExamScheduleFilter() {
  const searchInput = document.getElementById('exam-search-input');
  const classFilter = document.getElementById('exam-class-filter');
  const statusFilter = document.getElementById('exam-status-filter');
  const tableRows = document.querySelectorAll('.exam-data-table tbody tr');
  const printBtn = document.getElementById('btn-print-exam-schedule');

  function filterRows() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const selClass = classFilter ? classFilter.value : 'all';
    const selStatus = statusFilter ? statusFilter.value : 'all';

    tableRows.forEach(row => {
      const text = row.innerText.toLowerCase();
      const rowClass = row.getAttribute('data-class');
      const rowStatus = row.getAttribute('data-status');

      const matchesQuery = !query || text.includes(query);
      const matchesClass = selClass === 'all' || rowClass === selClass;
      const matchesStatus = selStatus === 'all' || rowStatus === selStatus;

      if (matchesQuery && matchesClass && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterRows);
  if (classFilter) classFilter.addEventListener('change', filterRows);
  if (statusFilter) statusFilter.addEventListener('change', filterRows);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   11. Parent Notice Board Filter & Modal Reader
   ========================================================================== */
const noticeCirculars = {
  notice1: {
    title: "Mid-Term Autumn Break & Festival Observance",
    ref: "CIR/AHA/2026/089",
    date: "October 14, 2026",
    category: "Holiday Announcement",
    author: "Office of the Registrar",
    body: `Dear Parents and Guardians,<br><br>
This circular is to inform you that Apex Horizon Academy will remain closed for the Autumn Mid-Term Break from <strong>Monday, October 19, 2026</strong> through <strong>Friday, October 23, 2026</strong>. Regular classes for all Kindergarten through Grade 12 students will resume on <strong>Monday, October 26, 2026</strong> at 8:00 AM.<br><br>
The administrative desk and admissions center will continue to operate on modified timings (9:00 AM to 1:00 PM). Parents are encouraged to guide students to revise term portfolios and complete assigned reading during the break.<br><br>
Warm regards,<br>
Registrar, Apex Horizon Academy`
  },
  notice2: {
    title: "Term 1 Parent-Teacher Meeting & Progress Report",
    ref: "CIR/AHA/2026/092",
    date: "October 22, 2026",
    category: "PTM Schedule",
    author: "Academic Dean",
    body: `Dear Parents,<br><br>
The Term 1 Comprehensive Parent-Teacher Conferences are scheduled for <strong>Saturday, October 31, 2026</strong> from 8:30 AM to 3:30 PM. Individual appointment slots of 15 minutes each have been published on the Parent Portal.<br><br>
Please log in to your portal account to reserve your preferred consultation time slot with respective subject coordinators. Printed progress diagnostics will be handed over during the meeting.<br><br>
Attendance is mandatory for parents of students appearing for Board Examinations (Grades 10 and 12).`
  },
  notice3: {
    title: "Pre-Board Examination Circular & Guidelines",
    ref: "CIR/AHA/2026/095",
    date: "November 02, 2026",
    category: "Exam Circular",
    author: "Controller of Examinations",
    body: `Notice to Parents & Candidates of Grades 10 & 12:<br><br>
The detailed date sheet for Pre-Board Examination Series 1 is now active. Students must be present in the designated exam hall 15 minutes before the bell with standard approved examination stationery and Academy ID cards.<br><br>
Smartwatches, calculators (unless permitted), and unauthorized papers are strictly prohibited. Revision masterclasses will run during the zero period daily.`
  },
  notice4: {
    title: "Q2 Tuition & Transport Fee Schedule",
    ref: "CIR/AHA/2026/098",
    date: "November 08, 2026",
    category: "Fee Reminder",
    author: "Finance Directorate",
    body: `Dear Patrons,<br><br>
This is a gentle reminder that the installment for Quarter 2 Tuition and Transport services is due for settlement on or before <strong>November 25, 2026</strong>.<br><br>
Payments can be seamlessly processed through the Parent Portal payment gateway or via direct bank transfer using your Student Identification Reference Number. Early payments made before November 15 receive a 3% scholarship credit rebate.`
  },
  notice5: {
    title: "14th Annual Inter-House Athletics Championship",
    ref: "CIR/AHA/2026/102",
    date: "November 15, 2026",
    category: "Sports Day",
    author: "Director of Physical Education",
    body: `We are thrilled to invite all parents to cheer for our champions at the 14th Annual Inter-House Athletics Meet on <strong>Friday, November 27, 2026</strong> at the Horizon Olympic Stadium.<br><br>
Events include Track 100m/400m/800m, Long Jump, High Jump, 4x100m House Relays, and the prestigious March Past. Parents are requested to take their seats in the Grandstand by 8:45 AM.`
  },
  notice6: {
    title: "'Symphony of Horizons' Annual Function Auditions",
    ref: "CIR/AHA/2026/105",
    date: "November 20, 2026",
    category: "Annual Function",
    author: "Cultural Committee",
    body: `Auditions for our marquee cultural gala <em>'Symphony of Horizons'</em> will take place next week in the Academy Auditorium. Students enthusiastic about classical orchestra, contemporary theatre, choir, and stage production are encouraged to sign up with their respective house cultural mentors.<br><br>
The gala performance will be held on December 18, 2026 with international dignitaries in attendance.`
  }
};

function initNoticesFilterAndModal() {
  const filterBtns = document.querySelectorAll('.notice-filter-btn');
  const noticeCards = document.querySelectorAll('.notice-card');
  const noticeModal = document.getElementById('notice-detail-modal');
  const noticeModalTitle = document.getElementById('modal-notice-title');
  const noticeModalRef = document.getElementById('modal-notice-ref');
  const noticeModalDate = document.getElementById('modal-notice-date');
  const noticeModalBody = document.getElementById('modal-notice-body');
  const noticeModalCat = document.getElementById('modal-notice-category');

  // Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      noticeCards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal read more
  noticeCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-notice-id');
      const data = noticeCirculars[id];
      if (!data || !noticeModal) return;

      noticeModalTitle.innerHTML = data.title;
      noticeModalRef.innerText = data.ref;
      noticeModalDate.innerText = data.date;
      noticeModalCat.innerText = data.category;
      noticeModalBody.innerHTML = data.body;

      noticeModal.classList.add('active');
    });
  });
}

/* ==========================================================================
   12. Student Life Gallery & Lightbox
   ========================================================================== */
function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox) return;

  let currentIndex = 0;
  const visibleImages = [];

  function updateVisibleList() {
    visibleImages.length = 0;
    galleryItems.forEach((item) => {
      if (item.style.display !== 'none') {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay-title');
        if (img) {
          visibleImages.push({
            src: img.getAttribute('src'),
            title: caption ? caption.innerText : 'Campus Life'
          });
        }
      }
    });
  }

  updateVisibleList();

  // Category filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      updateVisibleList();
    });
  });

  // Open Lightbox
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const src = img.getAttribute('src');
      currentIndex = visibleImages.findIndex(i => i.src === src);
      if (currentIndex === -1) currentIndex = 0;
      openLightbox();
    });
  });

  function openLightbox() {
    if (!visibleImages.length) return;
    const item = visibleImages[currentIndex];
    lightboxImg.setAttribute('src', item.src);
    lightboxCaption.innerText = item.title;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  function showNext() {
    if (!visibleImages.length) return;
    currentIndex = (currentIndex + 1) % visibleImages.length;
    openLightbox();
  }

  function showPrev() {
    if (!visibleImages.length) return;
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    openLightbox();
  }

  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   13. Faculty Department Filter
   ========================================================================== */
function initFacultyFilter() {
  const filterBtns = document.querySelectorAll('.faculty-filter-btn');
  const cards = document.querySelectorAll('.faculty-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dept = btn.getAttribute('data-department');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const itemDept = card.getAttribute('data-department');
        if (dept === 'all' || itemDept === dept) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   14. Testimonials Auto-Sliding Carousel
   ========================================================================== */
function initTestimonialsCarousel() {
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const pauseBtn = document.getElementById('carousel-pause');
  const dotsContainer = document.getElementById('carousel-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  let isPlaying = true;
  let autoplayTimer = null;

  // Build dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      goToSlide(idx);
    });
    dotsContainer.appendChild(dot);
  });

  function update() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    update();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    update();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    update();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        startAutoplay();
        pauseBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      } else {
        stopAutoplay();
        pauseBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      }
    });
  }

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', () => {
    if (isPlaying) startAutoplay();
  });

  startAutoplay();
}

/* ==========================================================================
   15. Flagship Event Countdown
   ========================================================================== */
function initEventCountdown() {
  const daysEl = document.getElementById('event-days');
  const hoursEl = document.getElementById('event-hours');
  const minsEl = document.getElementById('event-mins');
  const secsEl = document.getElementById('event-secs');

  if (!daysEl) return;

  // Event in 14 days
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 14);

  function update() {
    const diff = eventDate.getTime() - new Date().getTime();
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minsEl.innerText = String(mins).padStart(2, '0');
    secsEl.innerText = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   16. FAQ Accordion & Category Filter
   ========================================================================== */
function initFaqAccordion() {
  const filterBtns = document.querySelectorAll('.faq-cat-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      faqItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   17. Inquiry Form Validation & Toast Feedback
   ========================================================================== */
function initInquiryForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="full_name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();

    if (!name || !email || !phone) {
      showToast("Please fill in all mandatory fields with valid details.");
      return;
    }

    // Success response
    showToast("Application inquiry submitted! An admissions officer will connect shortly.");
    form.reset();
  });

  // Footer Newsletter Form
  const nlForm = document.getElementById('footer-newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = nlForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast("Subscribed! You'll receive our monthly academic digest.");
        emailInput.value = '';
      }
    });
  }
}

/* Toast Message */
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   18. Floating Buttons (WhatsApp, Call, Back to Top)
   ========================================================================== */
function initFloatingButtons() {
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   19. Global Modals (Admissions, Campus Tour, Prospectus, etc.)
   ========================================================================== */
function initGlobalModals() {
  // Triggers for Apply Now Modal
  document.querySelectorAll('[data-open-modal="admission-modal"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('admission-modal');
    });
  });

  // Triggers for Campus Tour Modal
  document.querySelectorAll('[data-open-modal="tour-modal"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('tour-modal');
    });
  });

  // Triggers for Prospectus Modal
  document.querySelectorAll('[data-open-modal="prospectus-modal"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('prospectus-modal');
    });
  });

  // Triggers for Syllabus Modal
  document.querySelectorAll('[data-open-modal="syllabus-modal"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('syllabus-modal');
    });
  });

  // Close triggers
  document.querySelectorAll('.modal-close-trigger, .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });

  // Simulated download action in prospectus modal
  const downloadProspectusBtn = document.getElementById('trigger-prospectus-download');
  if (downloadProspectusBtn) {
    downloadProspectusBtn.addEventListener('click', () => {
      downloadProspectusBtn.innerText = "Generating Brochure...";
      setTimeout(() => {
        downloadProspectusBtn.innerText = "Downloaded Successfully!";
        showToast("Official Prospectus 2026-27 brochure downloaded!");
        setTimeout(() => {
          downloadProspectusBtn.innerText = "Download PDF Brochure";
          closeModal('prospectus-modal');
        }, 1200);
      }, 1000);
    });
  }

  // Admission application wizard form submission
  const admissionForm = document.getElementById('online-admission-form');
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Online Registration Complete! Application Reference: #AHA-2026-9041");
      admissionForm.reset();
      closeModal('admission-modal');
    });
  }

  // Campus tour form submission
  const tourForm = document.getElementById('campus-tour-form');
  if (tourForm) {
    tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Campus Tour Reserved! Confirmation SMS & email dispatched.");
      tourForm.reset();
      closeModal('tour-modal');
    });
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   20. Quick Search Modal (Ctrl + K)
   ========================================================================== */
function initQuickSearch() {
  const searchBtn = document.getElementById('site-search-btn');
  const searchModal = document.getElementById('quick-search-modal');
  const searchInput = document.getElementById('quick-search-input');
  const resultsContainer = document.getElementById('quick-search-results');

  const searchableIndex = [
    { title: "Admissions Pipeline & Criteria", section: "#admissions", category: "Admissions" },
    { title: "Interactive Curriculum: Kindergarten to Senior Secondary", section: "#curriculum", category: "Academics" },
    { title: "Academic Programs (Science, Commerce, Humanities, STEM)", section: "#programs", category: "Academics" },
    { title: "Official Exam Schedule & Practical Vivas", section: "#exam-schedule", category: "Examinations" },
    { title: "Campus Facilities: Labs, Sports Complex, Library", section: "#facilities", category: "Campus" },
    { title: "Student Life Gallery & Performing Arts", section: "#student-life", category: "Campus Life" },
    { title: "Distinguished Faculty Directory", section: "#faculty", category: "Faculty" },
    { title: "Parent Notice Board Circulars & PTM", section: "#notices", category: "Notices" },
    { title: "Verified Testimonials & Parent Reviews", section: "#testimonials", category: "Community" },
    { title: "Upcoming Events & Annual Flagship Exhibition", section: "#events", category: "Events" },
    { title: "Frequently Asked Questions (FAQ)", section: "#faq", category: "Help & FAQ" },
    { title: "Campus Location, Visiting Hours & Contact", section: "#contact", category: "Contact" }
  ];

  if (!searchModal || !searchInput) return;

  function openSearch() {
    searchModal.classList.add('active');
    searchInput.focus();
    renderResults(searchableIndex);
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      renderResults(searchableIndex);
      return;
    }
    const filtered = searchableIndex.filter(item => 
      item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  function renderResults(items) {
    if (!items.length) {
      resultsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--color-text-muted);">No matching sections found.</div>`;
      return;
    }
    resultsContainer.innerHTML = items.map(item => `
      <div class="search-result-item" data-target="${item.section}">
        <div>
          <strong style="color: var(--color-text); font-size: 14px;">${item.title}</strong>
          <span style="display: block; font-size: 11px; color: var(--color-text-muted); text-transform: uppercase;">${item.category}</span>
        </div>
        <span style="color: var(--color-primary); font-size: 12px; font-weight: 600;">Go →</span>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const target = el.getAttribute('data-target');
        searchModal.classList.remove('active');
        const elem = document.querySelector(target);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}

/* ==========================================================================
   21. Subtle Custom Cursor Follower (Desktop only)
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');

  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  // Hover magnetic scale
  document.querySelectorAll('a, button, input, select, textarea, .why-interactive-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(37, 99, 235, 0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(37, 99, 235, 0.4)';
    });
  });
}
