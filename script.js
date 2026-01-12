function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// FAQ Logic
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const isActive = question.classList.contains('active');
        faqQuestions.forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.style.maxHeight = 0;
            q.querySelector('i').classList.replace('fa-minus', 'fa-plus');
        });
        if (!isActive) {
            question.classList.add('active');
            const answer = question.nextElementSibling;
            answer.style.maxHeight = answer.scrollHeight + "px";
            question.querySelector('i').classList.replace('fa-plus', 'fa-minus');
        }
    });
});

// --- FORM SUBMISSION LOGIC ---
document.getElementById('enquiryForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Stop page reload

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value,
        message: document.getElementById('message').value
    };

    try {
        // Send data to the running server
        const response = await fetch('http://localhost:5000/api/enquire', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Enquiry Sent Successfully!");
            this.reset();
        } else {
            alert("❌ Server Error: " + result.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("⚠️ Connection Failed. Is the server terminal open?");
    }
});