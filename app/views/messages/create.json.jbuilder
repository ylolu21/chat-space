json.user_name     @message.user.name
json.date          @message.created_at.to_s
json.body          @message.content
json.image_url     @message.image.url
json.id            @message.id
