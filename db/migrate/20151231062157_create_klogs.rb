class CreateKlogs < ActiveRecord::Migration
  def change
    create_table :klogs do |t|
      t.string :kmodel
      t.string :kaction
      t.text :content
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
