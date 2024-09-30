export function apiRequest(searchInput) {
  const optionsApi = new URLSearchParams({
    key: '46272240-cb3616e4f216aad50124ac1b5',
    q: searchInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`https://pixabay.com/api/?${optionsApi.toString()}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
