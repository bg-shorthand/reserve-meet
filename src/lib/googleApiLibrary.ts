declare let onGoogleScriptLoad: () => {};

const loadGoogleScript = () => {
  // Loads the Google JavaScript Library
  (function () {
    const id = 'newScript';
    const src = 'https://apis.google.com/js/api.js'; // (Ref. 1)

    // We have at least one script (React)
    const $firstScript = document.querySelector('script'); // (Ref. 2)

    // Prevent script from loading twice
    if (document.getElementById(id)) {
      return;
    } // (Ref. 3)
    const $script = document.createElement('script'); // (Ref. 4)
    $script.id = id;
    $script.src = src;
    $script.onload = onGoogleScriptLoad; // (Ref. 5)
    $firstScript && $firstScript.before($script);
  })();
};

export { loadGoogleScript, onGoogleScriptLoad };
