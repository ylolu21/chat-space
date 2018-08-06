$(function() {
  function buildHTML(message) {
    console.log(message);
    var add_text_message = (message.body !== "") ? `<p class="chat-contents__message__text-content">${message.body}</p>` : ""
    var add_image = (message.image.url !== null) ? `<img class="chat-contents__message__image" src="${message.image.url}" alt="${message.image.url}">` : ""
    var html = `
          <div class="chat-contents__message">
            <div class="chat-contents__message-info">
              <div class="chat-contents__message-info__sender-name">
                ${message.user_name}
              </div>
              <div class="chat-contents__message-info__send-time">
                ${message.date}
              </div>
            </div>
            <div class="chat-contents__message__text">
              ${add_text_message}
              ${add_image}
            </div>
          </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      timeout: 10000
    })
    .done(function(data) {
      var html = buildHTML(data);
      var chat_body = ".chat-contents__body";
      console.log(html);
      $(chat_body).append(html)
      $('#chat-body').animate({scrollTop: $('#chat-body')[0].scrollHeight}, 'fast');
      $('.form__message').val('')
      $('.hidden').val('')
      $('.form__submit').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
});
