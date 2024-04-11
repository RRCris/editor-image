const VALID_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
/*
OUTPUT:
info.tupe
info.size
info.name
info.src
*/

export function processFile(fileObject) {
	return new Promise((resolve, reject) => {
		// conver fileObject in JavascriptObject
		const { name, type, size } = fileObject;

		const file = {
			id: crypto.randomUUID(),
			name,
			type,
			size,
			file: fileObject,
		};

		const reader = new FileReader();
		reader.onload = event => resolve({ ...file, url: event.target.result });
		reader.onerror = error => reject(error);
		reader.readAsDataURL(fileObject);
	});
}

export async function assingFiles(listFiles, maxFileSizeInMB) {
	// convert MB en B
	const maxFileSizeInB = 1024 * 1024 * maxFileSizeInMB;
	// salidas de la funcion
	const notifique = [];
	const result = [];
	// validacion de undefined(no selecciono archivo)
	if (!listFiles.length) {
		notifique.push({
			message: "no ha seleccionado archivos",
			success: false,
		});
		return { notifique, result };
	}

	for (const fl of listFiles) {
		// conver fileObject in JavascriptObject
		const newFile = await processFile(fl);
		// validacion de tipo de archivo(.pdf .docx .wav .mp4 etc...)
		if (!VALID_TYPES.includes(newFile.type)) {
			notifique.push({
				id: crypto.randomUUID(),
				message: `El archivo "${newFile.name}" no es una imagen. Por favor, inténtalo nuevamente con un archivo de imagen válido.`,
				success: false,
			});
		}
		// validacion de tamaño(imagenes 4K 8K etc...)
		if (newFile.size > maxFileSizeInB) {
			notifique.push({
				id: crypto.randomUUID(),
				message: `El archivo "${newFile.name}" no puede pesar más de ${maxFileSizeInMB} MB. Por favor, intenta con un archivo más liviano.`,
				success: false,
			});
		}
		// si no hay notificaciones con este archivo
		if (VALID_TYPES.includes(newFile.type) && newFile.size <= maxFileSizeInB) {
			result.push(newFile);
		}
	}
	if (notifique.length === 0) {
		notifique.push({
			id: crypto.randomUUID(),
			message: "El archivo se ha agregado correctamente.",
			success: true,
		});
	}
	return { notifique, result };
}
