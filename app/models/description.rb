# frozen_string_literal: true

class Description < ApplicationRecord
  extend Enumerize

  belongs_to :word

  validates :body, presence: true
end
