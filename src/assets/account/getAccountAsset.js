const dataStorage = (data) => {
    const dir = data.username

    return import(`./${dir}/photoProfile/image.png`)
    .then((module) => {
        // Lakukan sesuatu dengan module yang diimpor
        return module.default
        // Promise.all(module.default)
    })
    .catch(() => {
        // Tangani kesalahan jika tidak dapat mengimpor modul
        return import(`./${dir}/photoProfile/image.jpg`)
        .then((module) => {
            // Lakukan sesuatu dengan module yang diimpor
            return module.default
            // Promise.all(module.default)
        })
        .catch((error) => {
            // Tangani kesalahan jika tidak dapat mengimpor modul
            console.error(error);
        });
    });
}

export default dataStorage;