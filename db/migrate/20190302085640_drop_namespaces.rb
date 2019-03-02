# frozen_string_literal: true

class DropNamespaces < ActiveRecord::Migration[5.2]
  def change
    remove_index :namespaces, :title
    drop_table :namespaces do |t|
      t.string :title
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
