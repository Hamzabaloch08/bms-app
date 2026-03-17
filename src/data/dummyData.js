export const CURRENT_USER = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@bootcamp.com',
    avatar: null,
    batch: 'Batch 2025-A',
    cohort: 'Full-Stack Web Development',
    domain: 'Web & App Development',
    joinedDate: '2025-01-15',
    assignmentsDone: 12,
    dayStreak: 18,
    overallScore: 92,
    daysActive: 45,
    totalDays: 90,
}

export const DASHBOARD_STATS = {
    daysActive: { current: 45, total: 90 },
    pendingAssignments: 3,
    overallScore: 92,
}

export const ANNOUNCEMENTS = [
    {
        id: '1',
        type: 'assignment',
        title: 'New Assignment: Build a REST API',
        description: 'A new assignment has been posted for Week 6. Build a complete REST API with authentication.',
        fullContent: 'You are required to build a complete REST API with the following features:\n\n- User authentication (JWT)\n- CRUD operations for resources\n- Input validation and error handling\n- MongoDB database integration\n- API documentation with Swagger\n\nPlease refer to the assignment details for starter code and submission guidelines.',
        time: '2 hours ago',
        isRead: false,
    },
    {
        id: '2',
        type: 'deadline',
        title: 'Deadline Reminder: React Dashboard',
        description: 'Your React Dashboard assignment is due in 24 hours. Make sure to submit before the deadline.',
        fullContent: 'This is a reminder that your React Dashboard assignment is due tomorrow at 11:59 PM EST. Late submissions will receive a 10% penalty per day.\n\nIf you are experiencing difficulties, please reach out to your mentor before the deadline.',
        time: '5 hours ago',
        isRead: false,
    },
    {
        id: '3',
        type: 'feedback',
        title: 'Feedback Received: JavaScript Fundamentals',
        description: 'Your mentor has reviewed your JavaScript Fundamentals assignment and left feedback.',
        fullContent: 'Great work on the JavaScript Fundamentals assignment! Your code demonstrates strong understanding of closures, prototypes, and async/await patterns.\n\nAreas for improvement:\n- Consider using more descriptive variable names\n- Add JSDoc comments to your utility functions\n- The error handling in the API calls could be more robust\n\nOverall Score: 95/100',
        time: '1 day ago',
        isRead: true,
    },
    {
        id: '4',
        type: 'system',
        title: 'System Maintenance: March 10th',
        description: 'Scheduled maintenance on March 10th from 2:00 AM to 4:00 AM EST.',
        fullContent: 'We will be performing scheduled maintenance on our servers on March 10th from 2:00 AM to 4:00 AM EST.\n\nDuring this time, the platform may be temporarily unavailable. Please save any in-progress work before the maintenance window.',
        time: '2 days ago',
        isRead: true,
    },
    {
        id: '5',
        type: 'assignment',
        title: 'New Assignment: Database Design',
        description: 'Design a normalized database schema for an e-commerce platform.',
        fullContent: 'Design a fully normalized database schema for an e-commerce platform that includes users, products, orders, reviews, and categories.\n\nRequirements:\n- At least 3NF normalization\n- ER diagram\n- SQL creation scripts\n- Sample seed data',
        time: '3 days ago',
        isRead: true,
    },
]

export const ASSIGNMENTS = [
    {
        id: '1',
        title: 'Build a REST API',
        description: 'Build a complete REST API with authentication using Node.js and Express.',
        status: 'pending',
        urgency: 'due_soon',
        deadline: '2025-03-09T23:59:00',
        deadlineLabel: 'Due in 2 days',
        details: [
            'Implement user authentication with JWT',
            'Create CRUD endpoints for at least 2 resources',
            'Add input validation using Joi or express-validator',
            'Connect to MongoDB with Mongoose',
            'Write API documentation',
        ],
        starterCode: 'https://github.com/bootcamp/rest-api-starter',
        submission: null,
        feedback: null,
    },
    {
        id: '2',
        title: 'React Dashboard UI',
        description: 'Create a responsive admin dashboard using React and Tailwind CSS.',
        status: 'pending',
        urgency: 'overdue',
        deadline: '2025-03-06T23:59:00',
        deadlineLabel: '1 day overdue',
        details: [
            'Build reusable chart components',
            'Implement responsive sidebar navigation',
            'Create data table with sorting and filtering',
            'Add dark mode toggle',
        ],
        starterCode: 'https://github.com/bootcamp/react-dashboard-starter',
        submission: null,
        feedback: null,
    },
    {
        id: '3',
        title: 'Database Design Project',
        description: 'Design a normalized database schema for an e-commerce platform.',
        status: 'pending',
        urgency: 'upcoming',
        deadline: '2025-03-15T23:59:00',
        deadlineLabel: 'Due in 8 days',
        details: [
            'Create an ER diagram with at least 8 entities',
            'Normalize to 3NF',
            'Write SQL creation scripts',
            'Include sample seed data',
        ],
        starterCode: null,
        submission: null,
        feedback: null,
    },
    {
        id: '4',
        title: 'JavaScript Fundamentals',
        description: 'Complete exercises covering closures, prototypes, and async patterns.',
        status: 'completed',
        urgency: null,
        deadline: '2025-02-28T23:59:00',
        deadlineLabel: 'Submitted on Feb 27',
        details: [
            'Implement custom Promise class',
            'Create closure-based module pattern',
            'Build event emitter from scratch',
        ],
        starterCode: null,
        submission: {
            link: 'https://github.com/alex/js-fundamentals',
            notes: 'Completed all exercises with bonus challenges.',
            submittedAt: '2025-02-27T15:30:00',
        },
        feedback: {
            score: 95,
            maxScore: 100,
            reviewer: 'Sarah Mitchell',
            comment: 'Excellent work! Strong understanding of closures and async patterns. Minor improvements needed in error handling.',
        },
    },
    {
        id: '5',
        title: 'HTML/CSS Portfolio',
        description: 'Build a personal portfolio website using semantic HTML and modern CSS.',
        status: 'resubmit',
        urgency: 'due_soon',
        deadline: '2025-03-10T23:59:00',
        deadlineLabel: 'Resubmit by Mar 10',
        details: [
            'Use semantic HTML5 elements',
            'Implement CSS Grid and Flexbox layouts',
            'Make fully responsive (mobile-first)',
            'Add CSS animations and transitions',
        ],
        starterCode: null,
        submission: {
            link: 'https://github.com/alex/portfolio-v1',
            notes: 'First submission attempt.',
            submittedAt: '2025-03-01T10:00:00',
        },
        feedback: {
            score: 62,
            maxScore: 100,
            reviewer: 'David Chen',
            comment: 'Good start, but the responsive design needs significant work. The mobile layout breaks below 480px. Please also add proper meta viewport tag and improve accessibility.',
        },
    },
]

export const LEADERBOARD = [
    { id: '1', rank: 1, name: 'Priya Sharma', points: 2850 },
    { id: '2', rank: 2, name: 'Marcus Lee', points: 2720 },
    { id: '3', rank: 3, name: 'Alex Johnson', points: 2680 },
    { id: '4', rank: 4, name: 'Emma Watson', points: 2540 },
    { id: '5', rank: 5, name: 'James Park', points: 2490 },
    { id: '6', rank: 6, name: 'Sofia Rodriguez', points: 2350 },
    { id: '7', rank: 7, name: "Ryan O'Brien", points: 2280 },
    { id: '8', rank: 8, name: 'Aisha Patel', points: 2150 },
    { id: '9', rank: 9, name: 'Tom Anderson', points: 2020 },
    { id: '10', rank: 10, name: 'Lin Wei', points: 1950 },
]

export const PROGRESS_HISTORY = [
    {
        id: '1',
        date: 'Today - March 7, 2025',
        title: 'REST API Development',
        description: 'Implemented JWT authentication and user CRUD endpoints.',
        hoursWorked: 6,
        tags: ['On Track'],
    },
    {
        id: '2',
        date: 'Yesterday - March 6, 2025',
        title: 'React Dashboard - Chart Components',
        description: 'Built reusable bar chart and line chart components.',
        hoursWorked: 5,
        tags: ['Blockers Resolved'],
    },
    {
        id: '3',
        date: 'March 5, 2025',
        title: 'React Dashboard - Sidebar',
        description: 'Implemented responsive sidebar with collapsible menu items.',
        hoursWorked: 4,
        tags: ['Help Requested'],
    },
    {
        id: '4',
        date: 'March 4, 2025',
        title: 'Database Design Research',
        description: 'Studied normalization forms and e-commerce schema patterns.',
        hoursWorked: 3,
        tags: ['On Track'],
    },
]

export const STREAK_GRID = [
    [0, 1, 2, 3, 2, 1, 0],
    [1, 2, 3, 3, 2, 2, 0],
    [0, 1, 2, 2, 3, 1, 0],
    [1, 3, 3, 2, 2, 3, 1],
    [2, 3, 2, 3, 3, 2, 0],
    [1, 2, 3, 3, 2, 3, 1],
    [0, 2, 3, 0, 0, 0, 0],
]

export const WEEKLY_HOURS = [
    { day: 'Mon', hours: 6 },
    { day: 'Tue', hours: 5 },
    { day: 'Wed', hours: 4 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 3 },
    { day: 'Sun', hours: 0 },
]

export const NOTIFICATIONS = [
    {
        id: '1',
        type: 'grade',
        title: 'Assignment Graded',
        message: 'Your JavaScript Fundamentals assignment scored 95/100.',
        time: '10 min ago',
        isRead: false,
    },
    {
        id: '2',
        type: 'reminder',
        title: 'Deadline Approaching',
        message: 'REST API assignment is due in 2 days.',
        time: '1 hour ago',
        isRead: false,
    },
    {
        id: '3',
        type: 'mentor',
        title: 'Mentor Message',
        message: 'Sarah Mitchell replied to your question about async/await.',
        time: '3 hours ago',
        isRead: false,
    },
    {
        id: '4',
        type: 'streak',
        title: 'Streak Milestone!',
        message: 'You have maintained a 18-day streak. Keep it up!',
        time: '1 day ago',
        isRead: true,
    },
    {
        id: '5',
        type: 'system',
        title: 'Weekly Report Ready',
        message: 'Your weekly progress report for Week 6 is available.',
        time: '2 days ago',
        isRead: true,
    },
    {
        id: '6',
        type: 'grade',
        title: 'Resubmission Required',
        message: 'HTML/CSS Portfolio needs improvements. Check feedback.',
        time: '3 days ago',
        isRead: true,
    },
]

export const getInitials = (name) => {
    const parts = name.split(' ')
    return parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0][0].toUpperCase()
}
