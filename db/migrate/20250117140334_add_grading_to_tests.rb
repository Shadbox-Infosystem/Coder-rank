class AddGradingToTests < ActiveRecord::Migration[7.1]
  def change
    add_column :tests, :max_score, :integer
    add_column :tests, :pass_mark, :integer
    add_column :tests, :pass_message, :text
    add_column :tests, :fail_message, :text
  end
end
