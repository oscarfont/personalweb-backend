/**
 * @author Óscar Font
 * ====================
 * BlogPost model class
 * ====================
 * @description
 * This class is represents an entity of the database.
 * In this case the BlogPost entity of our db.
 * In the architectural pattern applied in the system
 * this consists in the model of the blogpost.
 */

class BlogPost {

    id;
    title;
    summary;
    content;
    category;
    createdAt;
    media;

    constructor(category, title, summary, content = undefined, id = undefined) {
        this.category = category;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.id = id;
    }

    setCreatedAt(time) {
        this.createdAt = time;
    }

    setMedia(media) {
        this.media = media;
    }
}

export default BlogPost;