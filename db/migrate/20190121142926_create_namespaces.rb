# frozen_string_literal: true

class CreateNamespaces < ActiveRecord::Migration[5.2]
  def change
    create_table :namespaces do |t|
      t.string :title
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :namespaces, :title
  end
end
