export default {
    firstName: 'Aaditya',
    lastName: 'Kumar',
    jobTitle: 'Full Stack Developer',
    address: 'Bengaluru',
    phone: '1234567890',
    email: 'example@gmail.com',
    themeColor: "#0000FF",
    summery: 'Experienced Full Stack Developer specializing in building scalable and responsive web applications using React.js, Node.js, and AWS. Skilled in designing robust backends, optimizing APIs for performance, and delivering seamless user experiences across devices.',
    experience: [
        {
            id: 1,
            title: 'Software Engineer',
            companyName: 'PowerSchool',
            city: 'Bengaluru',
            state: 'Karnataka',
            startDate: 'Apr 2022',
            endDate: 'Present',
            currentlyWorking: true,
            workSummery: '• Developed and optimized full-stack web applications using React.js, TypeScript, and Node.js.\n' +
                '• Designed scalable serverless solutions with AWS Lambda and DynamoDB, reducing API response time by 25%.\n' +
                '• Led the implementation of real-time messaging for over 10,000 users, ensuring high performance and scalability.'
        },
        {
            id: 2,
            title: 'Frontend Developer',
            companyName: 'XYZ Technologies',
            city: 'Hyderabad',
            state: 'Telangana',
            startDate: 'Jan 2020',
            endDate: 'Mar 2022',
            currentlyWorking: false,
            workSummery: '• Designed and implemented responsive UI components using React.js, improving the user experience.\n' +
                '• Collaborated with backend teams to integrate RESTful APIs seamlessly into frontend applications.\n' +
                '• Enhanced performance metrics by optimizing rendering and reducing bundle sizes by 20%.'
        }
    ],
    education: [
        {
            id: 1,
            universityName: 'ABCD Institute of Technology',
            startDate: 'Aug 2015',
            endDate: 'May 2019',
            degree: 'Bachelor',
            major: 'Computer Science',
            description: 'Graduated with honors, with a focus on software engineering and web development.'
        }
    ],
    skills: [
        {
            id: 1,
            name: 'JavaScript',
            rating: 95,
        },
        {
            id: 2,
            name: 'React',
            rating: 100,
        },
        {
            id: 3,
            name: 'TypeScript',
            rating: 85,
        },
        {
            id: 4,
            name: 'Node.js',
            rating: 90,
        },
        {
            id: 5,
            name: 'AWS',
            rating: 80,
        },
        {
            id: 6,
            name: 'MySQL',
            rating: 80,
        }
    ]
}
