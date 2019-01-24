# frozen_string_literal: true

class Word < ApplicationRecord
  belongs_to :dictionary
  has_many :descriptions, dependent: :destroy

  delegate :language, to: :dictionary

  validates :title,
            uniqueness: {
              scope: :dictionary_id,
              case_sensitive: true
            },
            length: {
              minimum: 3,
              maximum: 255
            },
            presence: true
end
