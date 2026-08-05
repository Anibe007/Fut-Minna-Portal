export const portalInfo = {
  universityName: "Federal University of Technology, Minna",
  portalTitle: "Admissions & Registration Portal",
  motto: "Technology for Service",
  session: "2026/2027 Session",
  supportEmail: "support@futminna.edu.ng",
  supportPhone: "+234 (0) 803 123 4567",
};

export const topNavButtons = [
  { id: "admin-login", label: "Admin Login", icon: "UserCheck", type: "primary-dark" },
  { id: "central-payments", label: "Central Payments System", icon: "CreditCard", type: "purple" },
  { id: "post-utme", label: "Post UTME", icon: "GraduationCap", type: "purple" },
];

export const sidebarItems = [
  { id: "home",         label: "Home",         icon: "Home",          active: true  },
  { id: "applications", label: "Applications",  icon: "FileText",      active: false },
  { id: "payments",     label: "Payment",       icon: "CreditCard",    active: false },
  { id: "admissions",   label: "POST UTME",     icon: "GraduationCap", active: false },
  { id: "support",      label: "Staff Login",   icon: "UserCheck",     active: false },
];

export const applicationCards = [
  {
    id: "pre-degree-ijmb",
    title: "PRE-DEGREE & IJMB",
    session: "2026/2027 Session",
    status: "OPEN",
    icon: "FileText",
    instructionsKey: "pre-degree",
    details: "Application for 1-Year Intensive Pre-Degree and IJMB Direct Entry programmes.",
  },
  {
    id: "undergraduate",
    title: "UNDERGRADUATE (UTME/DE)",
    session: "2026/2027 Session",
    status: "OPEN",
    icon: "BookOpen",
    instructionsKey: "undergraduate",
    details: "Registration for 100L and 200L Direct Entry admitted candidates.",
  },
  {
    id: "postgraduate",
    title: "POSTGRADUATE SCHOOL",
    session: "2026/2027 Session",
    status: "OPEN",
    icon: "Award",
    instructionsKey: "postgraduate",
    details: "PGD, M.Tech, M.Sc, and Ph.D admission application forms.",
  },
];

export const admissionStatusCards = [
  {
    id: "predegree-status",
    title: "Pre-Degree/IJMB Status",
    session: "2026/2027 Session",
    actionText: "CHECK NOW",
    icon: "GraduationCap",
    type: "predegree",
  },
  {
    id: "pg-status",
    title: "PG Admission Status",
    session: "2025/2026 Session",
    actionText: "CHECK NOW",
    icon: "GraduationCap",
    type: "pg",
  },
  {
    id: "ug-status",
    title: "UG Admission Status",
    session: "2025/2026 Session",
    actionText: "CHECK NOW",
    icon: "GraduationCap",
    type: "ug",
  },
];

export const announcements = [
  "📢 2026/2027 Pre-Degree & IJMB Application Forms are now officially OPEN! Deadline for submission: August 30, 2026.",
  "⚡ IMPORTANT: Candidates checking admission status should ensure their JAMB Registration Number is correctly entered.",
  "💳 Central Payment System now supports Remita, Paystack, and Direct Bank Transfer options.",
];

export const instructionsData = {
  "pre-degree": {
    title: "Pre-Degree & IJMB Application Guidelines",
    category: "Pre-Degree / IJMB Programme (2026/2027)",
    fee: "₦10,000 Application Fee",
    deadline: "August 30, 2026",
    eligibility: "Minimum 5 O'Level Credits in WAEC / NECO / NABTEB including English & Mathematics in not more than two sittings.",
    steps: [
      "Click on 'Apply Now' or select Pre-Degree/IJMB Application form from the portal home.",
      "Enter a valid Email Address and active Phone Number to generate your portal applicant profile.",
      "Generate a Remita Retrieval Reference (RRR) for the application fee payment of ₦10,000.",
      "Pay securely online via card or print RRR invoice for bank payment.",
      "Log back in to upload your passport photograph (JPEG, max 50KB) and verified O'Level results.",
      "Preview all submitted information carefully before final submission.",
      "Submit and print your Acknowledgment Slip & Examination Schedule for screening.",
    ],
  },
  undergraduate: {
    title: "Undergraduate (Post-UTME / DE) Registration Guidelines",
    category: "Undergraduate Admissions (2026/2027)",
    fee: "₦2,000 Online Screening Fee",
    deadline: "September 15, 2026",
    eligibility: "Scored 150+ in 2026 JAMB UTME, chose FUT-MINNA as 1st Choice, & 5 O'Level Credits in relevant subjects.",
    steps: [
      "Ensure you scored 150 and above in the 2026 UTME examination and selected FUT-MINNA as your 1st Choice institution.",
      "Log in to the portal using your JAMB Registration Number as Username and Surname as Password.",
      "Verify your O'Level grades against JAMB CAPS records (minimum 5 credits including English & Mathematics).",
      "Generate RRR and complete payment for the online screening fee (₦2,000).",
      "Upload verified WAEC/NECO/NABTEB statement of results or certificates.",
      "Select your chosen degree course combination and confirm department subject requirements.",
      "Print your Post-UTME Screening Schedule & Registration Summary Slip.",
    ],
  },
  postgraduate: {
    title: "Postgraduate School Application Instructions",
    category: "PGD, M.Tech, M.Sc & Ph.D Programmes",
    fee: "₦15,000 Application Fee",
    deadline: "October 15, 2026",
    eligibility: "Minimum B.Sc/B.Tech (2nd Class Lower) or HND (Upper Credit) for Master's; M.Sc/M.Tech for Doctorate.",
    steps: [
      "Applicants must hold a minimum of B.Sc / B.Tech or HND for PGD entry, or a Master's degree for Ph.D.",
      "Create applicant account using your official email address and personal details.",
      "Pay non-refundable postgraduate application fee of ₦15,000 via Remita Gateway.",
      "Request official academic transcripts to be sent directly to the Secretary, Postgraduate School, FUT-MINNA.",
      "Complete the detailed online application form and upload referee details (3 referees required).",
      "Upload your Concept Note / Research Proposal (mandatory for M.Sc, M.Tech, and Ph.D applicants).",
      "Submit application and print application acknowledgement summary slip.",
    ],
  },
};
