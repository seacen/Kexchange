class CreateAlbumTranslation < ActiveRecord::Migration
  def self.up
    Album.create_translation_table!({
      name: :string
    }, {
      :migrate_data => true
    })
  end

  def self.down
    Album.drop_translation_table! :migrate_data => true
  end
end
