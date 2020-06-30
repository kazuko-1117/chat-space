$(function() {
  function buildHTML(message) {
    if( message.image ) {
      let html = 
        `<div class="MainMessages">
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
        `<div class="MainMessages">
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
  $('.new_message').on('submit',function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MainChat__messages').append(html);
      $('.MainChat__messages').animate({ scrollTop: $('.MainChat__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.MainForm__Btn').prop('disabled',false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});