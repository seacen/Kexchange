class AddMemberToCard < ActiveRecord::Migration
  def change
    add_reference :cards, :member, index: true, foreign_key: true
  end
end
