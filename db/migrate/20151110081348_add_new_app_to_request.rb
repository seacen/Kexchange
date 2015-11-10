class AddNewAppToRequest < ActiveRecord::Migration
  def change
    add_column :requests, :new_app, :integer
  end
end
