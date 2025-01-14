class CreateRespondents < ActiveRecord::Migration[7.1]
  def change
    create_table :respondents do |t|
      t.references :test, null: false, foreign_key: true # Adds test_id column
      t.boolean :mandatory, default: false

      # Field-specific attributes
      t.string :field_name  # Will store the field name, e.g., "last_name"
      t.string :field_type  # Will store the field type, e.g., "string"

      t.timestamps
    end

    # You could also add default records for the fields you mentioned:
    fields = [
      { field_name: "age", field_type: "integer" },
      { field_name: "city", field_type: "string" },
      { field_name: "first_name", field_type: "string" },
      { field_name: "last_name", field_type: "string" },
      { field_name: "id_number", field_type: "string" },
      { field_name: "organization_name", field_type: "string" },
      { field_name: "postal_code", field_type: "string" }
    ]

    fields.each do |field|
      puts "fields name #{field}"
      Respondent.create(field_name: field[:field_name], field_type: field[:field_type])
    end
  end
end
