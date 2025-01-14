# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_01_06_094410) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "respondents", force: :cascade do |t|
    t.bigint "test_id", null: false
    t.boolean "mandatory", default: false
    t.string "field_name"
    t.string "field_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["test_id"], name: "index_respondents_on_test_id"
  end

  create_table "tests", force: :cascade do |t|
    t.string "test_type"
    t.bigint "user_id", null: false
    t.text "instruction"
    t.text "description"
    t.integer "duration"
    t.string "test_language"
    t.string "access_type"
    t.string "leaving_page"
    t.integer "leaving_page_count"
    t.boolean "consent"
    t.boolean "consent_accepted"
    t.boolean "mandatory", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "respondents", "tests"
  add_foreign_key "tests", "users"
end
