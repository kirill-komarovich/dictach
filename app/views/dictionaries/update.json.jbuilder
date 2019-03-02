# frozen_string_literal: true

json.partial!('dictionary', dictionary: @dictionary)
json.updated_at I18n.l(@dictionary.updated_at)
