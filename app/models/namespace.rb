# frozen_string_literal: true

class Namespace < ApplicationRecord
  belongs_to :user
  has_many :dictionaries, dependent: :destroy

  # TODO: messages
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
