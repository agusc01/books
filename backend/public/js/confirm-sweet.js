const confirmSweet = async ({ type, title, text, newHref, oldHref }) => {
	const result = await Swal.fire({
		title,
		icon: type,
		text,
		type,
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: 'Si',
		denyButtonText: 'No',
		customClass: {
			actions: 'sweet-actions',
			cancelButton: 'order-1 right-gap',
			confirmButton: 'order-2',
			denyButton: 'order-3',
		},
	});

	if (result.isConfirmed) {
		// ! no es correcto esta lógica
		// ! window.location.assign(newHref);
		const form = document.createElement('form');
		form.setAttribute('method', 'POST');
		form.setAttribute('action', newHref);
		document.body.appendChild(form);
		form.submit();
		return;
	}

	if (result.isDenied) {
		Swal.fire({
			title: 'Información',
			text: 'No se aceptaron los cambios',
			type: 'info',
		});
	}

	history.pushState(null, '', oldHref);
};
