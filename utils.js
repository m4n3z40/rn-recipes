export const safeUrl = url => url.replace('http:', 'https:');

export const getImageSrc = recipe => ({ uri: safeUrl(recipe.image_url) });
