# frozen_string_literal: true

class CreateDictionaries < ActiveRecord::Migration[5.2]
  def change
    create_table :dictionaries do |t|
      t.references :namespace, foreign_key: true
      t.string :title
      t.string :language

      t.timestamps
    end
    add_index :dictionaries, :title
  end
end
