# frozen_string_literal: true

class CreateWords < ActiveRecord::Migration[5.2]
  def change
    create_table :words do |t|
      t.references :dictionary, foreign_key: true
      t.string :title

      t.timestamps
    end
    add_index :words, :title
  end
end
