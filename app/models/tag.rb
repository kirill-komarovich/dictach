# frozen_string_literal: true

class Tag < ApplicationRecord
  belongs_to :user

  has_many :tags_dictionaries, dependent: :destroy
  has_many :dictionaries, through: :tags_dictionaries

  validates :title,
            uniqueness: {
              scope: :user_id,
              case_sensitive: false
            },
            length: {
              minimum: 3,
              maximum: 255
            },
            presence: true
end
