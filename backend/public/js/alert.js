const alertText = async ({ type, title, text, timer = 7000 }) => {
	return await Swal.fire({
		title,
		text,
		icon: type,
		timer,
	});
};
