class RemoveNameFromCard < ActiveRecord::Migration
  def change
    remove_column :cards, :name, :string
  end
end
