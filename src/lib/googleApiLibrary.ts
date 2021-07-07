const loadGoogleApiLibrary = () => {
  (function () {
    const id = 'newScript';
    const src = 'https://apis.google.com/js/api.js';

    const $firstScript = document.querySelector('script');

    if (document.getElementById(id)) {
      return;
    }

    const $script = document.createElement('script');
    $script.id = id;
    $script.src = src;
    $script.onload = window.onGoogleApiLibraryLoad;
    $firstScript && $firstScript.before($script);
  })();
};

export { loadGoogleApiLibrary };
