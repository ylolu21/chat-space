$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var add_image = message.image_url !== null ? `<img class="chat-contents__message__image" src="${message.image_url}" alt="${message.image_url}">` : ""
    var html = `
          <div class="chat-contents__message"  data-message_id="${message.id}">
            <div class="chat-contents__message-info">
              <div class="chat-contents__message-info__sender-name">
                ${message.user_name}
              </div>
              <div class="chat-contents__message-info__send-time">
                ${message.date}
              </div>
            </div>
            <div class="chat-contents__message__text">
              <p class="chat-contents__message__text-content">${message.body}</p>
              ${add_image}
            </div>
          </div>`
    return html;
  }

  function scroll() {
    $('#chat-body').animate({scrollTop: $('#chat-body')[0].scrollHeight}, 'fast');
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
      $('.chat-contents__body').append(html)
      $('#new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
      scroll();
    })
    .fail(function(){
      alert('error');
    })
  })

  var interval = setInterval(updateMessage, 5000);
  function updateMessage() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var group_last_message_id = $('.chat-contents__message:last').data("message_id")
      var message_last_id = (group_last_message_id? group_last_message_id : 0)
      $.ajax({
        url: location.href,
        type: 'GET',
        dataType: 'json',
        data: {
          message: { id: message_last_id }
          }
      })
      .done(function(data) {
        var addHTML = '';
        if (data.length){
          data.forEach(function(message) {
            addHTML += buildHTML(message);
          })
        }
        $('.chat-contents__body').append(addHTML);
      })
      .fail(function() {
        alert('--error--');
        clearInterval(interval);
      })
    } else {
      clearInterval(interval);
    }
  }

});
