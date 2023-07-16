// generate random unique username
exports.generateUniqueUsername = async (model, names) => {
	let username = (
		names[0].substring(0, 1) +
		names[1] +
		"_" +
		String(Math.floor(Math.random() * 999))
	).toLowerCase();
	return await model
		.findOne({ username })
		.then((account) => {
			if (account) {
				return this.generateUniqueUsername(model, names);
			}
			return username;
		})
		.catch((error) => {
			console.error(error);
		});
};
