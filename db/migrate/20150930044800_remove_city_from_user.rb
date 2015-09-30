class RemoveCityFromUser < ActiveRecord::Migration
  def change
    remove_reference :users, :city, index: true, foreign_key: true
  end
end
