onmessage = function (e) {
  console.log('webChatWorker onmessage: e.data = ', e.data);
  console.log(typeof e.data);
  console.log(e.data.command);

  if (typeof e.data === 'object' && e.data.command === 'postWebChatUnload') {
    try {
      let activity = {
        type: 'event',
        name: 'webChatUnload',
        from: e.data.user,
        value: {},
      };

      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open(
        'POST',
        e.data.domain +
          '/conversations/' +
          e.data.conversationId +
          '/activities',
        false
      );
      xmlhttp.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8'
      );
      xmlhttp.setRequestHeader('Authorization', 'Bearer ' + e.data.token);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          console.log('webChatUnload: xmlhttp.status = ', xmlhttp.status);
        }
      };
      xmlhttp.send(JSON.stringify(activity));
      close();
    } catch (err) {
      console.log('webChatWorker error', err);
    }
  }
};
