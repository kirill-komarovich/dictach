# frozen_string_literal: true

class RemoveNamespaceFromDictionaries < ActiveRecord::Migration[5.2]
  def change
    remove_reference :dictionaries, :namespace, foreign_key: true
  end
end
