# frozen_string_literal: true

class Dictionary < ApplicationRecord
  extend Enumerize

  SUPPORTED_LANGUAGES = %i[en ru].freeze

  belongs_to :user
  has_many :words, dependent: :destroy
  has_many :tags_dictionaries, dependent: :destroy
  has_many :tags, through: :tags_dictionaries

  validates :title,
            uniqueness: {
              scope: :user_id,
              case_sensitive: false
            },
            length: {
              maximum: 255
            },
            presence: true

  enumerize :language,
            in: SUPPORTED_LANGUAGES,
            default: I18n.locale,
            i18n_scope: 'models.dictionary.languages',
            predicates: true,
            scope: true

  def alphabeth
    words.pluck(unique_words_first_letters_sql)
  end

  private

  def unique_words_first_letters_sql
    Arel.sql('DISTINCT LEFT(title, 1)')
  end
end
