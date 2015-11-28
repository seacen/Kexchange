class AddArtistToMember < ActiveRecord::Migration
  def change
    add_reference :members, :artist, index: true, foreign_key: true
  end
end
