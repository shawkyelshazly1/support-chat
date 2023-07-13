const mongoose = require("mongoose");

module.exports = () => {
	try {
		mongoose.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`💾 Database Connected.`);
	} catch (error) {
		console.error(error);
	}
};
