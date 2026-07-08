import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
        return res.status(404).send('Category not found');
    }

    const projects = await getProjectsByCategoryId(categoryId);

    res.render('category', {
        title: category.name,
        category,
        projects
    });
};

export {
    showCategoriesPage,
    showCategoryDetailsPage
};