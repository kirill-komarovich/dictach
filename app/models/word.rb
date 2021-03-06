# frozen_string_literal: true

class Word < ApplicationRecord
  belongs_to :dictionary
  has_many :descriptions, dependent: :destroy

  accepts_nested_attributes_for :descriptions, reject_if: :all_blank, allow_destroy: true

  scope :starts_with, ->(letter) { where(words[:title].matches("#{letter}%")) }

  delegate :language, to: :dictionary

  validates :title,
            uniqueness: {
              scope: :dictionary_id,
              case_sensitive: true
            },
            length: {
              maximum: 255
            },
            presence: true,
            format: { without: /\s/ }

  def self.words
    Word.arel_table
  end
end
