class AddObjectToProblem < ActiveRecord::Migration
  def change
    add_column :problems, :object, :text
  end
end
