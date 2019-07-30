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
    "revision": "d820c925e47cbd4d961f7b2f91223234"
  },
  {
    "url": "1-GettingStarted.html",
    "revision": "cfb9e269b89001b23d15bc927b91ff7c"
  },
  {
    "url": "2-Configuration.html",
    "revision": "ef4d21b6be7d250d8320591b13c20fbd"
  },
  {
    "url": "404.html",
    "revision": "56d0f12b869c51168e92528281beaaba"
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
    "url": "assets/js/app.8e3894c6.js",
    "revision": "5dfeba2404ed0c0a5120a27ff06ddf7c"
  },
  {
    "url": "cloud-transparent.png",
    "revision": "40902320ad2efcde13fe1250a9886f19"
  },
  {
    "url": "Components/Inputs.html",
    "revision": "c499f41314d01221af01a529ee88367c"
  },
  {
    "url": "Components/Layouts.html",
    "revision": "b5229db0a62f39ee3850c2fecaa82192"
  },
  {
    "url": "Customize/0-Customize.html",
    "revision": "9e353eef2f85d6c75a438ffc5106a35b"
  },
  {
    "url": "Customize/1-Select.html",
    "revision": "6d67f3dc479c9ad041d13450da72c8ff"
  },
  {
    "url": "Customize/2-Chips.html",
    "revision": "b63088d9538b57a134c7b35af9964e02"
  },
  {
    "url": "Customize/3-Modal.html",
    "revision": "f6e1d6c24b56c5c996a6dd03d6436874"
  },
  {
    "url": "Customize/4-Layout.html",
    "revision": "8e7af9288fc19827f6d6ed0d7a15a4a8"
  },
  {
    "url": "Customize/5-Input.html",
    "revision": "93b45dffe78002e29ab0e33d39cb0a19"
  },
  {
    "url": "Customize/6-Parser.html",
    "revision": "47a67431c596119793022bd49acef3d4"
  },
  {
    "url": "Customize/index.html",
    "revision": "70d583e59b8ea6e6f94e0f1d533c1688"
  },
  {
    "url": "index.html",
    "revision": "dc8679509b7b3beefb01b7c6a1689727"
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
