export const getAllBlogs = (logger, req, res) => {
    return res.json({ 'data': [{ id: 1, title: 'how to consume rest api' }, { id: 2, title: 'explain postgresql query' }] });
};