# frozen_string_literal: true

class Description < ApplicationRecord
  extend Enumerize

  PARTS_OF_SPEECH = [
    EN = %i[
      noun
      verb
      adjective
      numeral
      pronoun
      adverb
      article
      preposition
      conjunction
      interjection
    ].freeze,
    RU = %i[
      noun
      verb
      adjective
      numeral
      pronoun
      participle
      verbal_adverb
      adverb
      preposition
      conjunction
      particle
      interjection
    ].freeze
  ]

  belongs_to :word

  validates :body, presence: true

  delegate :language, to: :word

  # TODO: part of speech in enum
end
