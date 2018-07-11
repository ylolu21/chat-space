class Group < ApplicationRecord
	has_many :users, through: :groups_users
	has_many :group_users
	has_many :messages
	accepts_nested_attributes_for :group_users
end
