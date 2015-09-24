class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.string :image
      t.references :user, index: true, foreign_key: true
      t.references :album, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
