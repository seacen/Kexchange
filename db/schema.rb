# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151231062157) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: :cascade do |t|
    t.string   "name"
    t.date     "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "artist_id"
    t.string   "image"
  end

  add_index "albums", ["artist_id"], name: "index_albums_on_artist_id", using: :btree

  create_table "applications", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "request_id"
    t.integer  "own_request_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "applications", ["request_id"], name: "index_applications_on_request_id", using: :btree
  add_index "applications", ["user_id"], name: "index_applications_on_user_id", using: :btree

  create_table "artist_translations", force: :cascade do |t|
    t.integer  "artist_id",  null: false
    t.string   "locale",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
  end

  add_index "artist_translations", ["artist_id"], name: "index_artist_translations_on_artist_id", using: :btree
  add_index "artist_translations", ["locale"], name: "index_artist_translations_on_locale", using: :btree

  create_table "artists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.string   "image"
    t.integer  "album_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "member_id"
  end

  add_index "cards", ["album_id"], name: "index_cards_on_album_id", using: :btree
  add_index "cards", ["member_id"], name: "index_cards_on_member_id", using: :btree

  create_table "klogs", force: :cascade do |t|
    t.string   "kmodel"
    t.string   "kaction"
    t.text   "content"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "klogs", ["user_id"], name: "index_klogs_on_user_id", using: :btree

  create_table "member_translations", force: :cascade do |t|
    t.integer  "member_id",  null: false
    t.string   "locale",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
  end

  add_index "member_translations", ["locale"], name: "index_member_translations_on_locale", using: :btree
  add_index "member_translations", ["member_id"], name: "index_member_translations_on_member_id", using: :btree

  create_table "members", force: :cascade do |t|
    t.string   "name"
    t.string   "image"
    t.text     "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "artist_id"
  end

  add_index "members", ["artist_id"], name: "index_members_on_artist_id", using: :btree

  create_table "problems", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.boolean  "is_archived"
    t.string   "ptype"
    t.text     "object"
    t.boolean  "resolved"
  end

  add_index "problems", ["user_id"], name: "index_problems_on_user_id", using: :btree

  create_table "requests", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "own_id"
    t.integer  "want_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "new_app"
  end

  add_index "requests", ["user_id"], name: "index_requests_on_user_id", using: :btree

  create_table "responses", force: :cascade do |t|
    t.text     "body"
    t.integer  "problem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "responses", ["problem_id"], name: "index_responses_on_problem_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "email"
    t.string   "city"
    t.string   "country"
    t.string   "state"
    t.string   "locale"
    t.string   "token"
    t.boolean  "confirmed"
    t.boolean  "is_admin"
  end

  add_foreign_key "albums", "artists"
  add_foreign_key "applications", "requests"
  add_foreign_key "applications", "users"
  add_foreign_key "cards", "albums"
  add_foreign_key "cards", "members"
  add_foreign_key "klogs", "users"
  add_foreign_key "members", "artists"
  add_foreign_key "problems", "users"
  add_foreign_key "requests", "users"
  add_foreign_key "responses", "problems"
end
