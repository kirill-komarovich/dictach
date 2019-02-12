# frozen_string_literal: true

json.partial!('word', word: @word)
json.updated_at I18n.l(@word.updated_at)
