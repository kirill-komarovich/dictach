# frozen_string_literal: true

json.partial!('word', word: @word)
json.created_at I18n.l(@word.created_at)
