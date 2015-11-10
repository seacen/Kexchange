class CreateApplications < ActiveRecord::Migration
  def change
    create_table :applications do |t|
      t.references :user, index: true, foreign_key: true
      t.references :request, index: true, foreign_key: true
      t.references :own_request

      t.timestamps null: false
    end
  end
end
