const toast = ({ type, title, text }) => {
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
		showIcon: true,
		showCloseButton: true,
		autoclose: false,
		autotimeout: 3000,
		notificationsGap: null,
		notificationsPadding: null,
		type: 'outline',
		position: 'right bottom',
		customWrapper: '',
	});
};
