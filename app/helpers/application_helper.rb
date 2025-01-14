module ApplicationHelper
	def display_column_with_type(column)
    type_mapping = {
      "character varying" => "Text Field",
      "integer" => "Numeric Field",
      "text" => "Large Text",
      "datetime" => "Date and Time",
      "boolean" => "single choice"
    }

    "#{column.name} - #{type_mapping[column.sql_type] || column.sql_type}"
  end
end
