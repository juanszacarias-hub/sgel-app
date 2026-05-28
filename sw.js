self.addEventListener('push', event => {
  if (!event.data) return;
  let data = {};
  try { data = event.data.json(); } catch(e) { data = { title: 'SGEL', body: event.data.text() }; }
  event.waitUntil(
    self.registration.showNotification(data.title || 'SGEL Guardián Procesal', {
      body: data.body || '',
      icon: data.icon || './icon-192.png',
      badge: './icon-72.png',
      tag: data.tag || 'sgel',
      renotify: true,
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => 'focus' in c);
      if (existing) return existing.focus();
      return clients.openWindow(event.notification.data.url || './');
    })
  );
});
