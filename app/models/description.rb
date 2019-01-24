# frozen_string_literal: true

class Description < ApplicationRecord
  PARTS_OF_SPEECH = {
    en: %i[
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
    ru: %i[
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
  }.freeze

  belongs_to :word

  validates :body, presence: true

  delegate :language, to: :word

  validate :part_of_speech_belongs_to_language

  def part_of_speech_belongs_to_language
    return if PARTS_OF_SPEECH[language].include?(part_of_speech)

    errors.add(
      :part_of_speech,
      I18n.t(
        'users.validations.invalid_part_of_speech',
        language: language,
        part_of_speech: part_of_speech
      )
    )
  end
end
