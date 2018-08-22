if @new_message.present?
  json.array! @new_message do |message|
    json.user_name     message.user.name
    json.date          message.created_at.strftime("%Y/%m/%d %H:%M")
    json.body          message.content
    json.image_url     message.image.url
    json.id            message.id
  end
end
