class CreateAttempts < ActiveRecord::Migration[5.1]
  def change
    create_table :attempts do |t|
      t.boolean :success, default: false
      t.integer :try_count, default: 0
      t.integer :user_id
      t.integer :word_id

      t.timestamps
    end
  end
end
