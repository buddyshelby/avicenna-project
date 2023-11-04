const importAll = (r) => {
    let files = {};
    r.keys().forEach((key) => {
        const filename = key.split('/').pop().replace('.png', '');
        (files[filename] = r(key))
    });
    return files;
  };
  
  const imageStorage = importAll(require.context('.', false, /\.(png)$/));
  
  export default imageStorage;