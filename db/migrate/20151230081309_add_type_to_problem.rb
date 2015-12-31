class AddTypeToProblem < ActiveRecord::Migration
  def change
    add_column :problems, :ptype, :string
  end
end
