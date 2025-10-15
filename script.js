// === Course Data ===
const courses = [
  {
    id: 1,
    title: "HTML Basics",
    description: "Learn the structure of web pages with HTML.",
    lessons: ["Introduction", "Headings & Paragraphs", "Links & Images", "Lists & Tables"]
  },
  {
    id: 2,
    title: "CSS Essentials",
    description: "Style your web pages with CSS.",
    lessons: ["Selectors & Properties", "Colors & Fonts", "Box Model", "Flexbox Basics"]
  },
  {
    id: 3,
    title: "JavaScript for Beginners",
    description: "Add interactivity to your site using JavaScript.",
    lessons: ["Intro to JS", "Variables & Data Types", "Functions", "DOM Manipulation"]
  }
];

// === DOM Elements ===
const homeSection = document.getElementById('home-section');
const courseList = document.getElementById('course-list');
const detailSection = document.getElementById('course-detail-section');
const courseDetail = document.getElementById('course-detail');
const backButton = document.getElementById('back-button');

// === Render Home Page ===
function renderCourses() {
  courseList.innerHTML = "";
  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
    `;
    card.addEventListener('click', () => openCourseDetail(course.id));
    courseList.appendChild(card);
  });
}

// === Open Course Detail ===
function openCourseDetail(courseId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return;

  const progress = JSON.parse(localStorage.getItem(`progress-${courseId}`)) || 0;
  const totalLessons = course.lessons.length;
  const percentage = Math.round((progress / totalLessons) * 100);

  courseDetail.innerHTML = `
    <h2>${course.title}</h2>
    <p>${course.description}</p>
    <div class="progress">
      <div class="progress-bar" style="width: ${percentage}%;"></div>
    </div>
    <p>Progress: ${progress} / ${totalLessons} lessons completed</p>
    <div id="lessons"></div>
  `;

  const lessonContainer = courseDetail.querySelector('#lessons');
  course.lessons.forEach((lesson, index) => {
    const lessonDiv = document.createElement('div');
    lessonDiv.className = 'lesson';
    lessonDiv.textContent = `${index + 1}. ${lesson}`;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn';
    completeBtn.textContent = 'Mark as Completed';
    completeBtn.addEventListener('click', () => markLesson(courseId));

    lessonDiv.appendChild(completeBtn);
    lessonContainer.appendChild(lessonDiv);
  });

  homeSection.classList.add('hidden');
  detailSection.classList.remove('hidden');
}

// === Mark Lesson as Completed ===
function markLesson(courseId) {
  const course = courses.find(c => c.id === courseId);
  let progress = JSON.parse(localStorage.getItem(`progress-${courseId}`)) || 0;
  if (progress < course.lessons.length) {
    progress++;
    localStorage.setItem(`progress-${courseId}`, JSON.stringify(progress));
    openCourseDetail(courseId); // Refresh detail view
  }
}

// === Back Button ===
backButton.addEventListener('click', () => {
  detailSection.classList.add('hidden');
  homeSection.classList.remove('hidden');
});

// === Init ===
renderCourses();
