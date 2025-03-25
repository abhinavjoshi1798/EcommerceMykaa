const mongoose = require('mongoose');

// Define schema for media subdocument
const MediaSchema = new mongoose.Schema({
    type: String,
    url: String
});

// Define schema for offers subdocument
const OfferSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    priority: Number,
    platformList: [String],
    offerLabel: String,
    bxgyMrpFlag: Boolean,
    catalog_tag: String,
    offer_start_date: Date,
    offer_end_date: Date,
    customer_group: String,
    countries: [String]
});

// Define schema for primary_categories subdocument
const PrimaryCategorySchema = new mongoose.Schema({
    l1: {
        id: String,
        name: String
    },
    l2: {
        id: String,
        name: String
    },
    l3: {
        id: String,
        name: String
    }
});

// Define main product schema
const ProductSchema = new mongoose.Schema({
    id: String,
    isDeleted:{type:Boolean,require:true},
    dateCreated:{type:String,required:true},
    new:{type:Boolean,required:true},
    return_period: String,
    plp_offer: Boolean,
    offer_message: String,
    offer_id: Number,
    dynamic_tags: [String],
    pdt_tags: [String],
    catalog_tag: [String],
    name: String,
    sku: String,
    psku: String,
    pro_flag: Number,
    price: Number,
    final_price: Number,
    discount: Number,
    quantity: Number,
    expdt: Date,
    meta_title: String,
    meta_keywords: String,
    seller_rating: Number,
    highlights: String,
    can_try_type: String,
    meta_description: String,
    qna_count: Number,
    tags: String,
    seller_name: String,
    category_levels: String,
    is_service: Boolean,
    vendor_sku: String,
    can_subscribe: String,
    add_to_cart_url: String,
    star_rating_percentage: Number,
    vendor_id: String,
    parent_id: String,
    media: [MediaSchema],
    bucket_discount_percent: Number,
    is_free_sample: Boolean,
    product_url: String,
    redirect_to_parent: Boolean,
    category_values: String,
    offer_count: Number,
    brand_name: String,
    explore_more: String,
    primary_categories: PrimaryCategorySchema,
    is_kit_combo: Boolean,
    mrp_freeze: Boolean,
    is_saleable: Boolean,
    gludo_stock: Boolean,
    offers: [OfferSchema],
    rating: Number,
    is_backorder: Number,
    image_url: String,
    new_image_url: String,
    type: String,
    fbn: Number,
    slug: String,
    from_gludo: Number,
    rating_count: Number,
    category_ids: String,
    brand_ids: String,
    show_wishlist_button: Number,
    button_text: String,
    button_text_new: String,
    is_lux: Boolean,
    configurable_type: String,
    configuration_count: Number,
    option_count: Number,
    object_type: String,
    return_available: Boolean,
    tracking_metadata: {
        es_score: Number,
        popularity: Number
    },
    'content-lang': {
        name: String,
        dynamic_tags: String,
        pdt_tags: String,
        button_text: String
    }
},
    {
        versionKey: false,
      
});

// Create and export Product model
const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = { ProductModel }
