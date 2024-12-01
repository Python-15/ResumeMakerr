import axios from "axios";


const API_KEY='37e5f898d79d03f059a3da0fbb3823e0b179e56518deae932edffa9d0288790e5405f030915bcb65828f277982967d18700caa09350a68491bc52e9082036eba8a4c0a798d2cf98b7edbc60c55cc0fcec194b5531e9c11082243858ddc21ac5fe621e0f5201985ba88b7ba000a16c65198360c67910c0c1b2e08f6615a27e5f5'
const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const createResume = (data) => axiosClient.post('/user-resumes', data);
const getResumeDetails = (useremail) => axiosClient.get('/user-resumes', { params: { useremail } });
const updatePersonalDetails = (documentId, data) => axiosClient.put(`/user-resumes/${documentId}`, data);

export default {
    createResume,
    getResumeDetails,
    updatePersonalDetails
};