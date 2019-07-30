/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "0-Demo.html",
    "revision": "7464eddfd927506d64bc405aabc8b735"
  },
  {
    "url": "1-GettingStarted.html",
    "revision": "ef139d24bdf72e164e85e775b3d78a3b"
  },
  {
    "url": "2-Configuration.html",
    "revision": "f7dfe62b243c083582907a64a62f68cf"
  },
  {
    "url": "404.html",
    "revision": "13e3bea85f8482f86310f1e7b1352085"
  },
  {
    "url": "assets/css/0.styles.5ab877a6.css",
    "revision": "d943c52cc7bb82303a90c52bdf7f0410"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.826ff486.js",
    "revision": "095e3b88e8edcea009c5399bc3ce3a6d"
  },
  {
    "url": "assets/js/11.8900ac0e.js",
    "revision": "2c76cb34d56dd9584f1aae2045c10530"
  },
  {
    "url": "assets/js/12.10390279.js",
    "revision": "4790e6e695632880fe009dd3a06b0dfc"
  },
  {
    "url": "assets/js/13.4e1b8722.js",
    "revision": "d67fc4c3af3b0a48e86e0c19a97237dc"
  },
  {
    "url": "assets/js/14.05e44614.js",
    "revision": "3d532b2de12e8aa0a24fe5db8f8dada4"
  },
  {
    "url": "assets/js/15.252791a3.js",
    "revision": "da10fd64b47722f25c955ce48d371099"
  },
  {
    "url": "assets/js/16.ab5589ed.js",
    "revision": "99ed02bdf79d45f565be632b98091e72"
  },
  {
    "url": "assets/js/17.4903449b.js",
    "revision": "1adb19030889e3daf14ad598d9f5a8d9"
  },
  {
    "url": "assets/js/2.2bcd28ac.js",
    "revision": "8acb337be6efdcd6fcd22b48dff2a1d3"
  },
  {
    "url": "assets/js/3.41ab84ed.js",
    "revision": "58cf48c1ac6ef8e35e9dd294d06703c5"
  },
  {
    "url": "assets/js/4.cab7354d.js",
    "revision": "f92c9bcaad7848427be7aec253fb70b1"
  },
  {
    "url": "assets/js/5.638424b6.js",
    "revision": "ff8260e5ac2cacf885d75b3b0f17b5b2"
  },
  {
    "url": "assets/js/6.0cc5ee2c.js",
    "revision": "3a461de1e0b344dea95dc37b99f28864"
  },
  {
    "url": "assets/js/7.c2e9d938.js",
    "revision": "af664726228affd1ed08ff2f08e58722"
  },
  {
    "url": "assets/js/8.b5656fcc.js",
    "revision": "43f622916a81fc0c3ff281f4cf35d404"
  },
  {
    "url": "assets/js/9.023dc6d4.js",
    "revision": "a5042cb9e49036f17c9461e422f172d1"
  },
  {
    "url": "assets/js/app.c54767c2.js",
    "revision": "fcf8f24167d97ca36218d567f64676c2"
  },
  {
    "url": "cloud-transparent.png",
    "revision": "40902320ad2efcde13fe1250a9886f19"
  },
  {
    "url": "Components/Inputs.html",
    "revision": "28960a0555648c7de02af65b9087dbe2"
  },
  {
    "url": "Components/Layouts.html",
    "revision": "14ab47f8b1adb66cc1761dce2e91304f"
  },
  {
    "url": "Customize/0-Customize.html",
    "revision": "ddf424ff47ddcf1b77cb1777f4c3e70c"
  },
  {
    "url": "Customize/1-Select.html",
    "revision": "2f6df6eeaafb8b77aae3840fbc153341"
  },
  {
    "url": "Customize/2-Chips.html",
    "revision": "beb4f40e9331c86d90e653a3d9afcd6b"
  },
  {
    "url": "Customize/3-Modal.html",
    "revision": "4c73e1119950297ec6b520d11d0fc35d"
  },
  {
    "url": "Customize/4-Layout.html",
    "revision": "e88a5f644e9da8350904c5de1c36c9de"
  },
  {
    "url": "Customize/5-Input.html",
    "revision": "c4b3ee18f33be6dfd67dea9bdc1d1b37"
  },
  {
    "url": "Customize/6-Parser.html",
    "revision": "affc567ae864a18bddc09f6571dfcc19"
  },
  {
    "url": "Customize/index.html",
    "revision": "9db388bd7d733ee3e80bd2ea1e6aa77f"
  },
  {
    "url": "index.html",
    "revision": "ebbc14b630125fbba93235d4a50353af"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
