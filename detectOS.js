function loadCSS(filename) {
  document.getElementById('theme-stylesheet').setAttribute('href', filename);
}

function loadScriptModule(url, callback) {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  const userAgent = navigator.userAgent || navigator.platform;

  if (/Macintosh|MacIntel|Mac OS X/.test(userAgent)) {
    loadCSS('macos.css');
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    loadCSS('ios.css');
  } else if (/Windows/.test(userAgent)) {
    loadCSS('fluent.css');

    loadScriptModule('fluent-init.js', () => {
      document.getElementById('default-user-prompt').style.display = 'none';
      document.getElementById('default-generate').style.display = 'none';
      document.getElementById('fluent-user-prompt').style.display = 'block';
      document.getElementById('fluent-generate').style.display = 'inline-block';
    });
  } else if (/Android/.test(userAgent)) {
    loadCSS('material.css');
  } else {
    loadCSS('default.css');
  }
});
