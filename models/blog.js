const mongoose = require('mongoose');
const marked= require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        min: 6
    },
    markdown: {
        type: String,
    },
    time : {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
})

blogSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if (this.markdown) {
        this.sanitizedHTML = dompurify.sanitize(marked.parse(this.markdown))
    }
    next();
})

module.exports = mongoose.model('BlogData', blogSchema);