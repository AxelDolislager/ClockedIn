const config = {
 app: {
   PORT:    process.env.PORT || 3000,
   IP:      process.env.IP || "0.0.0.0",
   SESSION_SECRET: process.env.SESSION_SECRET || "S3CR3TSTR1NG4S3SS10NS"
 },
 db: {
   MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/project_manager"
 }
};

module.exports = config