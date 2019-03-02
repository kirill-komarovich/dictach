# frozen_string_literal: true

class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :title
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :tags, :title
  end
end
