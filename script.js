// ================= DOCTOR DATA =================

const doctors = [

    {
        id: 1,
        name: "Dr. Ananya Sharma",
        specialty: "Cardiology",
        experience: "10 Years",
        rating: "4.9",
        patients: "2.4K",
        fee: "₹700",
        image: "👩🏻‍⚕️",
        about:
            "Specialist in preventive cardiology, hypertension and heart health."
    },

    {
        id: 2,
        name: "Dr. Rahul Menon",
        specialty: "Dermatology",
        experience: "8 Years",
        rating: "4.8",
        patients: "1.8K",
        fee: "₹600",
        image: "👨🏻‍⚕️",
        about:
            "Dermatologist specializing in skin, hair and cosmetic dermatology."
    },

    {
        id: 3,
        name: "Dr. Priya Iyer",
        specialty: "Pediatrics",
        experience: "12 Years",
        rating: "4.9",
        patients: "3.1K",
        fee: "₹650",
        image: "👩🏽‍⚕️",
        about:
            "Pediatrician providing compassionate healthcare for children."
    },

    {
        id: 4,
        name: "Dr. Arjun Kumar",
        specialty: "Neurology",
        experience: "11 Years",
        rating: "4.7",
        patients: "1.5K",
        fee: "₹800",
        image: "👨🏽‍⚕️",
        about:
            "Neurologist specializing in migraine, epilepsy and nerve disorders."
    },

    {
        id: 5,
        name: "Dr. Meera Nair",
        specialty: "Orthopedics",
        experience: "9 Years",
        rating: "4.8",
        patients: "2.0K",
        fee: "₹700",
        image: "👩🏻‍⚕️",
        about:
            "Orthopedic specialist for bones, joints and sports injuries."
    },

    {
        id: 6,
        name: "Dr. Karthik Rao",
        specialty: "Dentistry",
        experience: "7 Years",
        rating: "4.9",
        patients: "1.2K",
        fee: "₹500",
        image: "👨🏻‍⚕️",
        about:
            "Dentist focused on preventive and restorative dental care."
    }

];


// ================= DISPLAY DOCTORS =================

function displayDoctors() {

    const grid =
        document.getElementById("doctorGrid");

    const search =
        document
            .getElementById("doctorSearch")
            .value
            .toLowerCase();

    const specialty =
        document.getElementById("specialtyFilter").value;


    const filteredDoctors =
        doctors.filter(function (doctor) {

            const matchesSearch =
                doctor.name
                    .toLowerCase()
                    .includes(search)

                ||

                doctor.specialty
                    .toLowerCase()
                    .includes(search);


            const matchesSpecialty =
                specialty === "all" ||
                doctor.specialty === specialty;


            return matchesSearch && matchesSpecialty;

        });


    if (filteredDoctors.length === 0) {

        grid.innerHTML = `
            <p style="color:#71818d">
                No doctors found.
            </p>
        `;

        return;
    }


    grid.innerHTML =
        filteredDoctors.map(function (doctor) {

            return `

                <div class="doctor-card">

                    <div class="doctor-photo">
                        ${doctor.image}
                    </div>

                    <div class="doctor-info">

                        <h3>
                            ${doctor.name}
                        </h3>

                        <div class="specialty">
                            ${doctor.specialty}
                        </div>


                        <div class="doctor-meta">

                            <span>
                                ${doctor.experience}
                            </span>

                            <span class="rating">
                                ★ ${doctor.rating}
                            </span>

                        </div>


                        <div class="doctor-meta">

                            <span>
                                ${doctor.patients} Patients
                            </span>

                            <span>
                                ${doctor.fee}
                            </span>

                        </div>


                        <div class="doctor-buttons">

                            <button
                                class="btn outline-btn"
                                onclick="viewDoctor(${doctor.id})">

                                View Profile

                            </button>


                            <button
                                class="btn primary-btn"
                                onclick="openBooking(${doctor.id})">

                                Book

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join("");

}


// ================= HOME SEARCH =================

function homeDoctorSearch() {

    const searchValue =
        document
            .getElementById("homeSearch")
            .value;


    document.getElementById("doctorSearch").value =
        searchValue;


    displayDoctors();

}


// ================= SCROLL =================

function scrollToDoctors() {

    document
        .getElementById("doctors")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= VIEW DOCTOR =================

function viewDoctor(id) {

    const doctor =
        doctors.find(function (d) {
            return d.id === id;
        });


    document.getElementById("modalContent").innerHTML = `

        <div class="doctor-profile">

            <div class="profile-image">
                ${doctor.image}
            </div>

            <div class="profile-info">

                <h2>
                    ${doctor.name}
                </h2>

                <p>
                    ${doctor.specialty}
                </p>

                <p>
                    ${doctor.experience}
                    • ★ ${doctor.rating}
                </p>

                <p>
                    Consultation: ${doctor.fee}
                </p>

            </div>

        </div>


        <hr
            style="
                margin:20px 0;
                border:0;
                border-top:1px solid #dce7ed;
            "
        >


        <h3>
            About the Doctor
        </h3>

        <p
            style="
                color:#71818d;
                margin:8px 0 20px;
            "
        >
            ${doctor.about}
        </p>


        <h3>
            Available Days
        </h3>

        <p
            style="
                color:#71818d;
                margin:5px 0 20px;
            "
        >
            Monday • Wednesday • Friday • Saturday
        </p>


        <button
            class="btn primary-btn"
            style="width:100%"
            onclick="openBooking(${doctor.id})">

            Book Appointment

        </button>

    `;


    openModal();

}


// ================= BOOKING =================

function openBooking(id) {

    const doctor =
        doctors.find(function (d) {
            return d.id === id;
        });


    document.getElementById("modalContent").innerHTML = `

        <h2>
            Book an Appointment
        </h2>

        <p class="modal-subtitle">
            Schedule your appointment with
            ${doctor.name}
        </p>


        <form
            class="modal-form"
            onsubmit="confirmAppointment(event, ${doctor.id})"
        >

            <label>
                Doctor
            </label>

            <input
                value="${doctor.name} — ${doctor.specialty}"
                disabled
            >


            <label>
                Patient Name
            </label>

            <input
                id="patientName"
                type="text"
                placeholder="Enter your name"
                required
            >


            <label>
                Email
            </label>

            <input
                id="patientEmail"
                type="email"
                placeholder="you@example.com"
                required
            >


            <label>
                Appointment Date
            </label>

            <input
                id="appointmentDate"
                type="date"
                required
            >


            <label>
                Select Time Slot
            </label>


            <div class="slots">

                <button
                    type="button"
                    class="slot"
                    onclick="selectSlot(this,'09:00 AM')">
                    09:00 AM
                </button>

                <button
                    type="button"
                    class="slot"
                    onclick="selectSlot(this,'10:00 AM')">
                    10:00 AM
                </button>

                <button
                    type="button"
                    class="slot"
                    onclick="selectSlot(this,'11:30 AM')">
                    11:30 AM
                </button>

                <button
                    type="button"
                    class="slot"
                    onclick="selectSlot(this,'02:00 PM')">
                    02:00 PM
                </button>

                <button
                    type="button"
                    class="slot"
                    onclick="selectSlot(this,'03:30 PM')">
                    03:30 PM
                </button>

                <button
                    type="button"
                    class="slot"
                    onclick="selectSlot(this,'05:00 PM')">
                    05:00 PM
                </button>

            </div>


            <input
                type="hidden"
                id="selectedSlot"
            >


            <label>
                Reason for Visit
            </label>

            <textarea
                id="reason"
                rows="3"
                placeholder="Describe your concern">
            </textarea>


            <button
                class="btn primary-btn"
                type="submit">

                Confirm Appointment

            </button>

        </form>

    `;


    openModal();


    // Prevent past dates

    const dateInput =
        document.getElementById("appointmentDate");

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    dateInput.min = today;

}


// ================= SELECT TIME =================

function selectSlot(button, time) {

    const slots =
        document.querySelectorAll(".slot");


    slots.forEach(function (slot) {

        slot.classList.remove("selected");

    });


    button.classList.add("selected");


    document.getElementById("selectedSlot").value =
        time;

}


// ================= CONFIRM APPOINTMENT =================

function confirmAppointment(event, doctorId) {

    event.preventDefault();


    const selectedSlot =
        document.getElementById("selectedSlot").value;


    if (selectedSlot === "") {

        showToast(
            "Please select a time slot."
        );

        return;
    }


    const doctor =
        doctors.find(function (d) {
            return d.id === doctorId;
        });


    const appointment = {

        doctor: doctor.name,

        specialty: doctor.specialty,

        patient:
            document.getElementById(
                "patientName"
            ).value,

        email:
            document.getElementById(
                "patientEmail"
            ).value,

        date:
            document.getElementById(
                "appointmentDate"
            ).value,

        time: selectedSlot

    };


    localStorage.setItem(
        "medicareAppointment",
        JSON.stringify(appointment)
    );


    document.getElementById("modalContent").innerHTML = `

        <div style="text-align:center">

            <div style="font-size:65px">
                ✅
            </div>

            <h2>
                Appointment Confirmed!
            </h2>

            <p
                style="
                    color:#71818d;
                    margin:8px 0 20px;
                "
            >
                Your appointment has been successfully booked.
            </p>


            <div
                style="
                    background:#f5fafc;
                    padding:20px;
                    border-radius:12px;
                    text-align:left;
                    margin-bottom:20px;
                "
            >

                <strong>
                    ${doctor.name}
                </strong>

                <br>

                <span style="color:#71818d">
                    ${doctor.specialty}
                </span>

                <br><br>

                📅 ${appointment.date}

                <br>

                🕐 ${appointment.time}

                <br>

                👤 ${appointment.patient}

            </div>


            <button
                class="btn primary-btn"
                onclick="closeModal()">

                Done

            </button>

        </div>

    `;

}


// ================= LOGIN =================

function openLogin() {

    document.getElementById("modalContent").innerHTML = `

        <h2>
            Welcome Back
        </h2>

        <p class="modal-subtitle">
            Login to manage your appointments.
        </p>


        <form
            class="modal-form"
            onsubmit="login(event)"
        >

            <label>
                Email
            </label>

            <input
                id="loginEmail"
                type="email"
                placeholder="you@example.com"
                required
            >


            <label>
                Password
            </label>

            <input
                id="loginPassword"
                type="password"
                placeholder="Enter password"
                required
            >


            <button
                class="btn primary-btn"
                type="submit">

                Login

            </button>


            <p
                style="
                    text-align:center;
                    color:#71818d;
                    font-size:13px;
                "
            >

                New patient?

                <a
                    href="#"
                    onclick="openRegister(); return false;"
                    style="
                        color:#2f80ed;
                        font-weight:bold;
                    "
                >
                    Create an account
                </a>

            </p>

        </form>

    `;


    openModal();

}


// ================= REGISTER =================

function openRegister() {

    document.getElementById("modalContent").innerHTML = `

        <h2>
            Create Your Account
        </h2>

        <p class="modal-subtitle">
            Join MediCare and manage your appointments.
        </p>


        <form
            class="modal-form"
            onsubmit="register(event)"
        >

            <label>
                Full Name
            </label>

            <input
                id="registerName"
                type="text"
                placeholder="Enter your full name"
                required
            >


            <label>
                Email
            </label>

            <input
                id="registerEmail"
                type="email"
                placeholder="you@example.com"
                required
            >


            <label>
                Phone Number
            </label>

            <input
                id="registerPhone"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="10 digit mobile number"
                required
            >


            <label>
                Password
            </label>

            <input
                id="registerPassword"
                type="password"
                minlength="6"
                placeholder="Minimum 6 characters"
                required
            >


            <button
                class="btn primary-btn"
                type="submit">

                Create Account

            </button>

        </form>

    `;


    openModal();

}


// ================= REGISTER ACTION =================

function register(event) {

    event.preventDefault();


    const user = {

        name:
            document.getElementById(
                "registerName"
            ).value,

        email:
            document.getElementById(
                "registerEmail"
            ).value,

        phone:
            document.getElementById(
                "registerPhone"
            ).value

    };


    localStorage.setItem(
        "medicareUser",
        JSON.stringify(user)
    );


    closeModal();


    showToast(
        "Account created successfully!"
    );

}


// ================= LOGIN ACTION =================

function login(event) {

    event.preventDefault();


    const user =
        JSON.parse(
            localStorage.getItem(
                "medicareUser"
            )
        );


    closeModal();


    if (user) {

        showToast(
            "Welcome back, " + user.name + "!"
        );

    } else {

        showToast(
            "Login successful!"
        );

    }

}


// ================= CONTACT =================

function sendMessage(event) {

    event.preventDefault();


    event.target.reset();


    showToast(
        "Message sent successfully!"
    );

}


// ================= MODAL =================

function openModal() {

    document
        .getElementById("modal")
        .classList.remove("hidden");

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.add("hidden");

}


// Close modal when clicking outside

document
    .getElementById("modal")
    .addEventListener(
        "click",
        function (event) {

            if (
                event.target.id === "modal"
            ) {

                closeModal();

            }

        }
    );


// ================= TOAST =================

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);

}


// ================= MOBILE MENU =================

function toggleMenu() {

    const nav =
        document.getElementById("navLinks");


    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";

        nav.style.top = "76px";

        nav.style.left = "0";

        nav.style.right = "0";

        nav.style.background = "white";

        nav.style.padding = "20px";

        nav.style.flexDirection = "column";

        nav.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.08)";
    }

}


// ================= INITIAL LOAD =================

displayDoctors();