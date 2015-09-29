class CreateArtistTranslation < ActiveRecord::Migration
  def self.up
    Artist.create_translation_table!({
      name: :string
    }, {
      :migrate_data => true
    })
  end

  def self.down
    Artist.drop_translation_table! :migrate_data => true
  end
end
