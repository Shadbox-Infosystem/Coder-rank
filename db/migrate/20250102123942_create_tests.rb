class CreateTests < ActiveRecord::Migration[7.1]
  def change
    create_table :tests do |t|
      t.string :test_type
      t.references :user, null: false, foreign_key: true
      t.text :instruction
      t.text :description
      t.integer :duration
      t.string :test_language
      t.string :access_type
      t.string :leaving_page
      t.integer :leaving_page_count
      t.boolean :consent
      t.boolean :consent_accepted
      t.boolean :mandatory, default: false, null: false

      t.timestamps
    end
  end
end
