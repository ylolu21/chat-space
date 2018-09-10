require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      # contentがあればメッセージが保存できる
      it "is valid with content" do
        expect(build(:message, image: nil)).to be_valid
      end
      # imageがあれば保存できる
      it "is valid with image" do
        expect(build(:message, content: nil)).to be_valid
      end
      # contentとimage両方あっても保存ができる
      it "is valid with content and image" do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      # contentもimageもないと保存できない
      it "is invalid without content and image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      # gurop_idがないと保存できない
      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      # user_idがないと保存できない
      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
