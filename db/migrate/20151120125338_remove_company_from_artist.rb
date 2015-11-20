class RemoveCompanyFromArtist < ActiveRecord::Migration
  def change
    remove_reference :artists, :company, index: true, foreign_key: true
  end
end
