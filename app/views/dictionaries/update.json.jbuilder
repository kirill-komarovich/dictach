# frozen_string_literal: true

json.partial!('dictionary', dictionary: @dictionary)
json.updated_at @dictionary.updated_at.to_i
