class CreateAttempts < ActiveRecord::Migration[5.1]
  def change
    create_table :attempts do |t|
      t.boolean :success
      t.integer :tries
      t.belongs_to :user, foreign_key: true
      t.belongs_to :word, foreign_key: true

      t.timestamps
    end
  end
end
