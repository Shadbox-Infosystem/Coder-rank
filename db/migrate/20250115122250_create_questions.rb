class CreateQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :questions do |t|
      t.references :test, null: false, foreign_key: true
      t.string :question_type
      t.text :content
      t.integer :points

      t.timestamps
    end
  end
end
