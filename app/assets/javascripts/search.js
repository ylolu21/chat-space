$(document).on('turbolinks:load', function() {

var search_field = $("#user-search-field");
var search_list = $("#user-search-result");
var add_list = $("#chat-group-users");
var group_users_ids = document.getElementsByName("group[user_ids][]");
var search_users_ids = [];

group_users_ids.forEach(function(id) {
  search_users_ids.push(id.value);
});


function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.user_name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.user_id } data-user-name=${ user.user_name }>追加</a>
              </div>
  `
  search_list.append(html);
}

function appendNoUser(user) {
  var html =`<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${ user }</p>
             </div>
  `
  search_list.append(html);
}

function appendAddUser(user_id, user_name) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
                <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                <p class='chat-group-user__name'>${ user_name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>
  `

  add_list.append(html);
}

  search_field.on("keyup", function() {
    var input = search_field.val();

    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input ,group_users: search_users_ids},
      dataType: 'json'
    })
    .done(function(users) {
      search_list.empty();
      if (input != "") {
        if (users.length !== 0 ) {
          users.forEach(function(user) {
            appendUser(user);
          });
        } else {
          appendNoUser("一致するユーザーはいません");
        }
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $('#user-search-result').on("click", '.chat-group-user__btn--add', function() {
    var add_user_id = Number($(this).attr("data-user-id"));
    var add_user_name = $(this).attr("data-user-name");
    appendAddUser(add_user_id, add_user_name);
    $(this).parent().remove();
    search_users_ids.push(add_user_id)
  })

  $('#chat-group-users').on("click", '.chat-group-user__btn--remove', function() {
    var remove_user = $(this).parent().attr('id');
    var remove_user_id = $(this).parent().children('input').attr('value');
    search_users_ids.some(function(id, i){
    if (id == remove_user_id) search_users_ids.splice(i ,1);
    });
    $("#" + remove_user).remove();
  })
});
