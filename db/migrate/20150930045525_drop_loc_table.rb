class DropLocTable < ActiveRecord::Migration
  def change
    drop_table :cities
    drop_table :states
    drop_table :countries
  end
end
