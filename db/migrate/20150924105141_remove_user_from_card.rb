class RemoveUserFromCard < ActiveRecord::Migration
  def change
    remove_reference :cards, :user, index: true, foreign_key: true
  end
end
