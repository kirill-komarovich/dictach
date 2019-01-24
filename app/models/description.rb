# frozen_string_literal: true

class Description < ApplicationRecord
  PARTS_OF_SPEECH = {
    en: %w[
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
    ru: %w[
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
  }.with_indifferent_access.freeze

  belongs_to :word

  validates :body, presence: true

  delegate :language, to: :word

  validate :part_of_speech_belongs_to_language

  def part_of_speech_belongs_to_language
    return if word.blank?
    return if PARTS_OF_SPEECH[language].include?(part_of_speech)

    errors.add(
      :part_of_speech,
      I18n.t(
        'models.description.validations.invalid_part_of_speech',
        language: I18n.t("models.dictionary.languages.#{language}").capitalize,
        part_of_speech: part_of_speech
      )
    )
  end
end
