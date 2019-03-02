# frozen_string_literal: true

class AddUserToDictionaries < ActiveRecord::Migration[5.2]
  def change
    add_reference :dictionaries, :user, foreign_key: true
  end
end
