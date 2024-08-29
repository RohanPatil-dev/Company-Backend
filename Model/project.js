const { mongoose } = require("mongoose");

const projectSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    projectTheme: {
        type: String,
        required: true
    },
    Reason: {
        type: String,
        enum: ["For Business", "For Personal", "For Dealership", "For Transport"],
        default: "For Business",
        required: false
    },
    Type: {
        type: String,
        enum: ["Internal", "External", "Vendor"],
        default: "Internal",
        required: false
    },
    Division: {
        type: String,
        enum: ["Filters", "Compressor", "Pumps", "Glass", "Water Heater"],
        default: "Filters",
        required: false
    },
    Category: {
        type: String,
        enum: ["Quality A", "Quality B", "Quality C", "Quality D",],
        default: "Quality A",
        required: false
    },
    Priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "High",
        required: false
    },
    Department: {
        type: String,
        enum: ["Strategy", "Finance", "Quality", "Maintainance", "Stores","HR"],
        default: "Strategy",
        required: false
    },
    start_Date: {
        type: Date,
        required: true
    },
    End_Date: {
        type: Date,
        required: true
    },
    Location: {
        type: String,
        enum: ["Pune", "Delhi", "Mumbai"],
        default: "Pune",
        required: false
    },
    Status : {
        type : String,
        enum: ["Registered","Running", "Cancelled", "Closed"],
        default : "Registered",
        required: false
    }
});



var project = mongoose.model('project', projectSchema);

module.exports = project