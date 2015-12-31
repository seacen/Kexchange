class AddIsArchivedToProblem < ActiveRecord::Migration
  def change
    add_column :problems, :is_archived, :boolean
  end
end
