const toast = ({ type, title, text, timer = 7000 }) => {
	const spanishTitles = {
		error: 'Error',
		success: 'Éxito',
		warning: 'Advertencia',
		info: 'Información',
		question: 'Pregunta',
	};

	if (!title) {
		title = spanishTitles[type];
	}

	new Notify({
		status: type,
		title,
		text,
		effect: 'fade',
		speed: timer,
		customClass: '',
		customIcon: '',
		showIcon: true,
		showCloseButton: true,
		autoclose: true,
		autotimeout: 3000,
		notificationsGap: null,
		notificationsPadding: null,
		type: 'outline',
		position: 'right top',
		customWrapper: '',
	});
};
