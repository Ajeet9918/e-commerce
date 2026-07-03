const multer = require("multer")
const fs = require("fs")
const path = require("path")

const ALLOWED_CATEGORIES = ["men", "women", "kids"]; // whitelist your real categories

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const category = req.body.category;

        if (!ALLOWED_CATEGORIES.includes(category)) {
            return cb(new Error("Invalid category"));
        }

        const dest = path.join(__dirname, "..", "public", category);

        // create the folder if it doesn't exist
        fs.mkdirSync(dest, { recursive: true });

        cb(null, dest);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})

const upload = multer({ storage: storage })

module.exports = upload