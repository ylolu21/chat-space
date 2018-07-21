class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: ture, unless: :image?
  mount_uploader :image, ImageUploader
end
