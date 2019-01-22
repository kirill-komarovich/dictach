# frozen_string_literal: true

class Dictionary < ApplicationRecord
  belongs_to :namespace
  has_many :words, dependent: :destroy

  delegate :user, to: :namespace

  validates :title,
            uniqueness: {
              scope: :namespace_id,
              case_sensitive: false
            },
            length: {
              minimum: 3,
              maximum: 255
            },
            presence: true
end
