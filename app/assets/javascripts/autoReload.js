$(function() {
  function buildHTML(message) {
    if( message.image ) {
      let html = 
        `<div class="MainMessages" data-message-id=${message.id}>
          <div class="MainMessages__Top">
            <div class="MainMessages__Name">
              ${message.user_name}
            </div>
            <div class="MainMessages__Time">
              ${message.created_at}
            </div>
          </div>
          <div class="MainMessages__Text">
            <p class="MainMessage__content">
              ${message.content}
            </p>
            <img class="MainMessage__image" width="424px" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MainMessages" data-message-id=${message.id}>
        <div class="MainMessages__Top">
          <div class="MainMessages__Name">
            ${message.user_name}
          </div>
          <div class="MainMessages__Time">
            ${message.created_at}
          </div>
        </div>
        <div class="MainMessages__Text">
          <p class="MainMessage__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.MainMessages:last').data("message-id"); 
    if (last_message_id == undefined) {  
      last_message_id = 0 ;
    }

    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.MainChat__messages').append(insertHTML);
        $('.MainChat__messages').animate({ scrollTop: $('.MainChat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});