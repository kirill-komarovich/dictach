# frozen_string_literal: true

class CreateDescriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :descriptions do |t|
      t.references :word, foreign_key: true
      t.text :body
      t.string :part_of_speech

      t.timestamps
    end
  end
end
