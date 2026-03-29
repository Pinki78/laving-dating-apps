const preload = (urls) => {
  const promises = urls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load ${url}`));
      img.src = url;
    });
  });

  return Promise.all(promises);
};
    