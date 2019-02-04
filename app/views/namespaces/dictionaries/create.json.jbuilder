# frozen_string_literal: true

json.partial!('dictionary', dictionary: @dictionary)
json.created_at I18n.l(@dictionary.created_at)
