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
    steps: [
      "Click on 'Apply Now' or select Pre-Degree/IJMB Application form.",
      "Enter a valid Email Address and active Phone Number to create your portal account.",
      "Generate a Remita Retrieval Reference (RRR) for the application fee payment (₦10,000).",
      "Upload your passport photograph and O'Level results (WAEC/NECO/NABTEB).",
      "Submit and print your acknowledgment slip for screening.",
    ],
  },
  undergraduate: {
    title: "Undergraduate (Post-UTME / DE) Registration",
    steps: [
      "Ensure you scored 150 and above in the 2026 UTME examination and chose FUT-MINNA as 1st Choice.",
      "Log in using your JAMB Registration Number as Username.",
      "Verify your O'Level grades (minimum 5 credits including English & Mathematics).",
      "Complete payment for online screening fee (₦2,000).",
      "Print your screening schedule slip.",
    ],
  },
  postgraduate: {
    title: "Postgraduate School Application Instructions",
    steps: [
      "Applicants must hold a minimum of B.Sc / B.Tech or HND for PGD entry.",
      "Request official academic transcripts to be sent directly to the Secretary, Postgraduate School.",
      "Complete the online application form and upload research proposal (for M.Sc & Ph.D).",
      "Pay non-refundable application fee (₦15,000).",
    ],
  },
};
