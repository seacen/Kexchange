class AddResolvedToProblem < ActiveRecord::Migration
  def change
    add_column :problems, :resolved, :boolean
  end
end
