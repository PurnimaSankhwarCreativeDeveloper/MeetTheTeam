import axios from 'axios'

export default {
    fetchIndividuals: async () => {
        try {
            const {
                data
            } = await axios.get(`https://randomuser.me/api/?results=50`);
            return data;
        } catch (e) {
            console.log("🚀 ~ file: meetTheTeam.api.js ~ fetchIndividuals: ~ e", e);
        }
    },
};