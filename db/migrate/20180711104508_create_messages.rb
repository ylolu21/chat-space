class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
    	t.text :body
    	t.string :image
    	t.references :user, index: true, foreign_key: true
    	t.references :group, index: true, foreign_key: true
      	t.timestamps
    end
  end
end
