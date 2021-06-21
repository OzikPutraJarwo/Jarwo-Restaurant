const CACHE_NAME = 'SW-001';
const toCache = [
    '/',
    'https://cdn.statically.io/gh/OzikPutraJarwo/Jarwo-Restaurant/main/pwa.manifest',
    'https://cdn.statically.io/gh/OzikPutraJarwo/Jarwo-Restaurant/main/reg.js',
    'https://1.bp.blogspot.com/-xSgdQIseTdU/Xvk_D0hgZ-I/AAAAAAAAFqY/Am5bHetkGjsgXau_FmvYNZALK4Bm5rcrQCLcBGAsYHQ/s192/KJ%2BLogo%2BOctagon.png',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match(event.request)
            })
        })
    )
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] Hapus cache lama', key)
                return caches.delete(key)
            }
            }))
        })
        .then(() => self.clients.claim())
    )
})
