# frozen_string_literal: true

class CreateTagsDictionaries < ActiveRecord::Migration[5.2]
  def change
    create_table :tags_dictionaries do |t|
      t.belongs_to :tag, foreign_key: true
      t.belongs_to :dictionary, foreign_key: true

      t.timestamps
    end
  end
end
