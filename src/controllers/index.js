import { getAllOrganizations } from '../models/organizations.js';

const showHomePage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
};

export { showHomePage };
